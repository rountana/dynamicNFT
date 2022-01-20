IDENTITY WALLET


An identity wallet that helps store the personal information - name, address, email ids, social profiles. This could be any other type of information about an organisation, entity or IoT device. 


Features implemented
The idea is to automate entry of commonly requested personal data when a user interacts with a website - like for shopping, booking, sign-up etc.  This is personal information that is voluntarily shared by the user - self attested as the owner of the data. 

The purpose of this MVP,  is to demonstrate the ability for the user to capture and retrieve their data on and off the blockchain. Verifiable credentials or ability to authenticate the user ID, social ID or record is not in scope.

A real life implementation of this idea would look like a auto-fill feature in the browser. Acknowledged that in practice, making it work seamlessly like a autofill would be much more complicated, requiring a browser or an API plug-in or similar. 

This implementation will be a small step towards a self sovereign identity.


Implementation

Storage being expensive on layer 0/1, the approach is to split the data in to 2 manageable parts :

Long form data : detailed data store of user information that can be scaled with time. May not be much for a single user, but cumulatively adds-up for a large group. This data will hence be stored in a decentralised off-chain - IPFS managed via the Ceramic protocol. 

Short form data: Onchain user data will be limited to to a URL for the actual data stored offchain. The URLs will be in the form of Decentralized Identifier (DID) - a W3C standard and Stream ID - a ceramic implementation that provides a deterministic way to reference documents, instead of hard to track IFPS CIDs. 

Workflow 

Create/ Update / Read Profile
* Connect to MetaMask
* click on “Check if profile attached” button to verify if account has an associated profile.
* If profile exists - create, update, read buttons would become active
* If no profile data associated with account “Only create profile”  button would be enabled.
User can only access profile that they have created. This is controlled by root user access. Contract owner * can add root users via the “Add Access” option.

Adding/Deleting rootuser

* Switch to contract owner address on MetaMask.
* Click on “Connect to MetaMask”
* Click on “Check if profile attached”
* Input account to be provided access, then click on “Add Access"

PLEASE VERIFY THAT RIGHT ACCOUNT ADDRESS IS CONNECTED VIA “ACCOUNT CONNECTED — 0x0.. “ message. 


Known Issues

(1) Connections to Ceramic may not be persistent across sessions. If the browser is refreshed in the middle of the testing process, update feature may not work. If this happens, the smart contract will need to be migrated from scratch - possibly with new contract address update required to index.js file. A way to work around this issue is to switch to a new account and start over from with a new account address.

(2) Create profile takes a few seconds to complete on the block. If trying to read profile immediately after create, null data will be displayed. During tests, block updates were done in a max of 10 secs.

(3) Trying to Create a duplicate profile - errors out in the smart contract. This is expected behavior, however this again breaks the ceramic link - causing problems with further updates. Same workaround as issue (1)

App Demo
https://youtu.be/DnPJ6aswdC0

Hosted Front end
https://shiny-salad-4009.on.fleek.co/github/blockchain-developer-bootcamp-final-project/dist/

Deployed public Testnet: Ropsten

REQUIREMENTS
Node.js v14, and npm v6 
Ceramic (JS HTTP Client, Key DID Method, Key DID Provider Ed25519¶)
webpack
truffle/ ganache

note: npm v7 and over is not supported by ceramic JS Http client. However, installing the node-pre-gyp package globally may make it work. Reference: https://developers.ceramic.network/build/javascript/http/

Downgrading npm 
npm install -g npm@6
brew unlink node 
brew link node@14 // to go back to latest version
Node —version	
Reference : https://github.com/flessner/smarch/blob/master/client/js/src/index.ts


How to setup locally:
git clone https://github.com/rountana/blockchain-developer-bootcamp-final-project.git
Change into the directory
npm start

Running the code locally:

Unit Testing
truffle develop
truffle migrate -> to ensure the right accounts are used for truffle test work right. To verify accounrs : let accounts = await web3.eth.getAccounts()).
Truffle test

Testing via UI (locally)

launch ganache in port 7545/ network id 5777. Settings -> Add projects -> point to truffle-config.js
truffle develop
truffle migrate --network development --reset
npx webpack


Public Ethereum Address
0x2013934dCA0aC6dF9b253cFA25E8966ea9794092
