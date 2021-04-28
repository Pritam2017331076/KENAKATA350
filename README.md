# KENAKATA350

Follow the instructions to run this application after cloning it to your editor.

Most importantly move this folder in fabric-samples folder

##############open terminator##############

cd ~

cd fabric-samples/

cd KENAKATA/

cd application-javascript/

npm install

cd kenakata/

npm install axios bcryptjs dotenv express jsonwebtoken mongoose react react-dom react-router-dom react-scripts web-vitals

npm start





##############open new tab in terminator##############

cd fabric-samples/KENAKATA/application-javascript/kenakata/backend

cd ~

cd fabric-samples/

cd KENAKATA/

cd application-javascript/

npm install

cd kenakata/

cd backend/

open a file in this backend folder named ".env" and paste "ATLAS_URI=mongodb+srv://pritam:5728940p@cluster0.yv3yc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" code(without quotation)

node server





##############open another new tab in terminator##############

cd $HOME/fabric-samples/KENAKATA/chaincode-javascript

npm install

cd $HOME/fabric-samples/test-network

./network.sh down

cd $HOME/fabric-samples/test-network

./network.sh createChannel -ca -c mychannel -s couchdb

cd $HOME/fabric-samples/test-network

./network.sh deployCC -ccn kenakata21 -ccp ../KENAKATA/chaincode-javascript/ -ccl javascript

cd $HOME/fabric-samples/KENAKATA/application-javascript

rm -rf wallet

node app.js

