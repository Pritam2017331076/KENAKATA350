# KENAKATA350

Follow the instructions to run this application after cloning it to your editor.

Most importantly move this folder in fabric-samples folder

##open terminator:

cd /fabric-samples/KENAKATA/application-javascript/kenakata

npm start

##open new tab in terminator

cd /fabric-samples/KENAKATA/application-javascript/kenakata/backend

node server

##open another new tab in terminator

cd $HOME/fabric-samples/test-network
./network.sh down

cd $HOME/fabric-samples/test-network
./network.sh createChannel -ca -c mychannel -s couchdb

cd $HOME/fabric-samples/test-network
./network.sh deployCC -ccn kenakata20 -ccp ../KENAKATA/chaincode-javascript/ -ccl javascript

cd $HOME/fabric-samples/KENAKATA/application-javascript
rm -rf wallet
node app.js

