'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'kenakata20';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

const express = require('express')
const app = express();
app.use(express.json())
const port = 5001;
var cors = require('cors')

app.use(cors())

function prettyJSONString(inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
}


async function main() {
    try {
        const ccp = buildCCPOrg1();

        const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

        const wallet = await buildWallet(Wallets, walletPath);

        await enrollAdmin(caClient, wallet, mspOrg1);

        await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        const gateway = new Gateway();

        try {
            app.listen(port, () => {
                console.log(`Server is running on port : ${port}`);
            })

            await gateway.connect(ccp, {
                wallet,
                identity: org1UserId,
                discovery: { enabled: true, asLocalhost: true }
            });

            const network = await gateway.getNetwork(channelName);

            const contract = network.getContract(chaincodeName);


            // Let's try a query type operation (function).
            // This will be sent to just one peer and the results will be shown.
            /* let result = await contract.evaluateTransaction('GetAllAssets');
            console.log(`*** Result: ${prettyJSONString(result.toString())}`); */

            app.post('/add', async(req, res) => {
                const prod = req.body;
                console.log(prod)
                const productNumber = prod.productNumber
                const desc = prod.desc
                const price = prod.price
                const owner = prod.owner
                const productType = prod.productType
                console.log(productNumber.toString())
                console.log(desc.toString())
                console.log(price.toString())
                console.log(owner.toString())
                console.log(productType.toString())
                try {
                    let result = await contract.evaluateTransaction('CreateProduct', productNumber.toString(), desc.toString(), price.toString(), owner.toString(), productType.toString());
                    await contract.submitTransaction('CreateProduct', productNumber.toString(), desc.toString(), price.toString(), owner.toString(), productType.toString());
                    console.log(`******** CreateProduct successful ${result}`);
                    res.status(201).send(prod)
                } catch (error) {
                    console.log(`*** Successfully caught the error: \n    ${error}`);
                    res.status(400).send(error.message)
                }
            })

            app.post('/changeowner', async(req, res) => {

                const prod = req.body;
                const id = prod.Id;
                const newOwner = prod.newOwner
                try {
                    let result = await contract.evaluateTransaction('ChangeProductOwner', id.toString(), newOwner.toString());
                    await contract.submitTransaction('ChangeProductOwner', id.toString(), newOwner.toString());
                    console.log(`******** Owner changed ${result}`);
                } catch (error) {
                    console.log(`*** Successfully caught the error: \n    ${error}`);
                }
            })


        } finally {

            /* gateway.disconnect(); */
        }
    } catch (error) {
        console.error(`******** FAILED to run the application: ${error}`);
    }
}

main();
