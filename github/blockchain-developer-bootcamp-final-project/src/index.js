import { CeramicClient } from '@ceramicnetwork/http-client'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { TileDocument } from '@ceramicnetwork/stream-tile'

// import DID resolvers

import { DID } from 'dids'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
// const { stripHexPrefix } = require('ethereumjs-util')
// const { idAddress2 } = require('src/abis')
import { randomBytes } from '@stablelib/random'

// var encrypt = window.ethereum.;
// contract address on Ropsten:
const idAddress = '0x3CA2Bb903D50C43D50054398282eE0Aba31F123f'

// add contract ABI from Remix:
const idABI =
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "msg",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "sid",
				"type": "string"
			}
		],
		"name": "DataLog",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ethAcc",
				"type": "address"
			}
		],
		"name": "retrieveDID",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ethAcc",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_did",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_streamID",
				"type": "string"
			}
		],
		"name": "saveDID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "x",
				"type": "address"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "urlRef",
		"outputs": [
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "streamID",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userRefID",
		"outputs": [
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "streamID",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Using the 'load' event listener for Javascript to
//
// metamask checks, ensure metamask is available
//
window.addEventListener('load', function() {

	if (typeof window.ethereum !== 'undefined') {
		console.log('window.ethereum is enabled')
		if (window.ethereum.isMetaMask === true) {
		console.log('MetaMask is active')
		let mmDetected = document.getElementById('mm-detected')
		mmDetected.innerHTML += 'MetaMask Is Available!'
	
		// add in web3 here
		var web3 = new Web3(window.ethereum)
	
		} else {
		console.log('MetaMask is not available')
		let mmDetected = document.getElementById('mm-detected')
		mmDetected.innerHTML += 'MetaMask Not Available!'
		// let node = document.createTextNode('<p>MetaMask Not Available!<p>')
		// mmDetected.appendChild(node)
		}
	} else {
		console.log('window.ethereum is not found')
		let mmDetected = document.getElementById('mm-detected')
		mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
	}
})	  

// check if called from valid ethereum account 
function validateEthAcc() {
// to be coded
}

// Make connections to Ethereuem and instantiate smart contract

//global variable to carry accouth number across functions
let ethAcc = '';

// connect to smart contract

var web3 = new Web3(window.ethereum)
const idWallet = new web3.eth.Contract(idABI, idAddress)
idWallet.setProvider(window.ethereum)

/////////////////////////////////////////////////////////
// USER ACTION HANDLING STARTS HERE
////////////////////////////////////////////////////////

// Grab the "connect to metamask" button object 
const mmEnable = document.getElementById('mm-connect');

// since MetaMask has been detected, we know
// `ethereum` is an object, so we'll do the canonical
// MM request to connect the account. 
// 
mmEnable.onclick = async () => {
//   await ethereum.request({ method: 'eth_requestAccounts'})
  const accounts = await web3.eth.getAccounts();
  ethAcc = accounts[0]
  // grab html element and populate it with the current address
  var mmCurrentAccount = document.getElementById('mm-current-account');
  mmCurrentAccount.innerHTML = 'Current Account: ' + accounts
  mmEnable.disabled = true;
}

// point to ceramic test net url - avbl options :

	// read only access :
	// const API_URL = 'https://gateway-clay.ceramic.network'
	// write access:
	const API_URL = 'https://ceramic-clay.3boxlabs.com'
	// local node
	// const API_URL = 'https://localhost:7007'

	// Create Ceramic instance of http-client
	const ceramic = new CeramicClient(API_URL);
	

//Validate if valid ETH account
validateEthAcc()

//////////////////////////////////////////
// CREATE USER PROFILE 
//////////////////////////////////////////

let did = ''
//Get user profile data in form
const idCreate = document.getElementById('id-create-button');

idCreate.onclick = async () => {
  // grab value from input box
//   const isString = value => typeof value === 'string' || value instanceof String;
  const name = document.getElementById('id-name-box').value;
  const age = document.getElementById('id-age-box').value;
  const phone = document.getElementById('id-phone-box').value;

//   var web3 = new Web3(window.ethereum)
//   // instantiate smart contract instance
//   const idWallet = new web3.eth.Contract(idABI, idAddress)
//   idWallet.setProvider(window.ethereum)
  

  // set up ceramic : Prep to generate did and stream ID 
  // did -> URL in the identity world. unique to a asset, person, org
  // stream ID -> reference to Tile document that holds the data. Deterministic replacement for IPFS CID

  setupCeramic().then(console.log("Ceramic setup complete.. "))

  //using '*' concatenate to work around issue where variable is being passed of reference here and ends up 
  // undefined inside solidity
  // 

  //did has to be authenticated prior to use 
  authCeramic().then(value => {
	// add space to force store by value. (workaround for a store by reference error)
	const didSpace = ceramic.did.id + " "
	did = didSpace.trim()
	console.log("DID authenticated..")

	// if did authenticated successfully, create tile. (Tile document holds the user profile data. 
	// this function returns stream ID reference for future document retreival and update)
	createTile(did).then(value => {
		const streamID = value.id + " "
		console.log(" stream from tile create :" + streamID)
	// Store DID/ URL references only on block to save space..
	// Bulkier user data can be stored on IPFS via ceramic APIs 

	// save onchain data
		saveProfileRef(ethAcc, did, streamID)
	// save offchain data
		updateProfile(name, age, phone, did)
		})
	})
	idCreate.disabled = true;

}

//////////////////////////////////////////
// UPDATE USER PROFILE 
//////////////////////////////////////////

const idUpdate = document.getElementById('id-update-button');

idUpdate.onclick = async () => {
	// grab value from input box
	//   const isString = value => typeof value === 'string' || value instanceof String;
	const name = document.getElementById('id-name-box').value;
	const age = document.getElementById('id-age-box').value;
	const phone = document.getElementById('id-phone-box').value;
	// pull did reference from chain
	retrieveUserRef(ethAcc).then(value => {
		const didTemp = value[0]
		// then update profile data
		updateProfile(name, age, phone, didTemp)
		})
	}		

////////////////////////////////////////// 
// READ USER PROFILE
//////////////////////////////////////////

const idGetValue = document.getElementById('id-retrieve-button')

	idGetValue.onclick = async () => {

		const idDisplayValue1 = document.getElementById('read-output-did')
		const idDisplayValue2 = document.getElementById('read-output-stream')
		
		const value = await retrieveUserRef(ethAcc);
		idDisplayValue1.innerHTML = "Retrieved DID: " + value[0];
		idDisplayValue2.innerHTML =  "Retrieved Stream: " + value[1];

		// const didString = value[0] + " "
		const didTemp = value[0].trim()
		const streamIDTemp = value[0].trim()

		//read Tile contents
		console.log("DID returned by smart contract: " + didTemp)
		console.log("StreamID returned by smart contract: " + streamIDTemp)
		readTile(didTemp)
	}

////////////////////////////////////////// 
// SET UP CERAMIC - steps:
// 1. identify ceramic testnet server
// 2. instaniate ceramic, get dids, resolvers
// 3. authenticate did
////////////////////////////////////////// 

async function setupCeramic() {
	
	//get the resolver - we need to use KeyDIDResolver, not 3ID
	const resolver =  {
	...KeyDidResolver.getResolver(),
	...ThreeIdResolver.getResolver(ceramic),
	}

	//create instance of resolver
	const did = new DID({ resolver })

	// set DID instance on HTTP client
	ceramic.did = did
	// random seed bytes generator
	const seed = randomBytes(32)

	const provider = new Ed25519Provider(seed)
	ceramic.did.setProvider(provider)
	}

async function authCeramic() {
	// authenticate did
	return await ceramic.did.authenticate()
}

/////////////////////////////////////////////////////
///  Create Tile Document
////////////////////////////////////////////////////
const createTile = async function (_did) {
await ceramic.did.authenticate()

const doc = await TileDocument.create(
  ceramic,
  null,
    {
	controllers: [_did],
    family: 'pid'
    // tags: ['tag1'],
    // deterministic: true
    }
    // { publish: false, anchor: false }
)
return doc
}

/////////////////////////////////////////////////////
///  Update Tile Document
////////////////////////////////////////////////////

async function updateProfile(_name, _age, _phone, _did) {
	const doc = await TileDocument.deterministic(
		ceramic,
		{
			controllers: [_did],
			family: 'pid' 
			//  tags: ['tag1']
		},
	  )  
	//   await doc.update({
	// 	  foo: " some random update"
	//   })
	  await doc.update({
		  name: _name,
		  age: _age,
		  phone: _phone
	})
	//   console.log("_name, _age, _phone" + _name, _age, _phone)
	}
	
/////////////////////////////////////////////////////
///  Read Tile Document
////////////////////////////////////////////////////

async function readTile(_did) {
	const retrievedDoc = await TileDocument.deterministic(
	  ceramic,
	  {controllers: [_did],
	   family: 'pid'})
	//    anchor: false, publish: false})
	
	console.log("Reading tile data... " + retrievedDoc.content.name)
	console.log("Reading tile data... " + retrievedDoc.content.age)
	console.log("Reading tile data... " + retrievedDoc.content.phone)
	}
	
////////////////////////////////////////////////////
///  Save DID
////////////////////////////////////////////////////

//store DID & streamID in mini userprofile maintained on chain
async function saveProfileRef(_ethAcc, _did, _stream) {
	await idWallet.methods.saveDID(_ethAcc, _did, _stream).send({from: ethereum.selectedAddress})
}

////////////////////////////////////////// 
// RETRIEVE DID/STREAM IDS FROM FROM SMART CONTRACT
//////////////////////////////////////////
async function retrieveUserRef(_ethAcc) {
	return await idWallet.methods.retrieveDID(_ethAcc).call({from: ethereum.selectedAddress})
}

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///// TESTING ONLY - SIMPLE STORAGE
///// TESTING ONLY - SIMPLE STORAGE
///// TESTING ONLY - SIMPLE STORAGE
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

const ssSetValue = document.getElementById('ss-set-value')

ssSetValue.onclick = async () => {

  var web3 = new Web3(window.ethereum)

  const ssInputValue = document.getElementById('ss-input-box').value;

  const idWallet = new web3.eth.Contract(idABI, idAddress)
  idWallet.setProvider(window.ethereum)

//   await idWallet.methods.set(ssInputValue).send({from: ethereum.selectedAddress})
  await idWallet.methods.set(ethAcc).send({from: ethereum.selectedAddress})

  console.log("Updating simple storage...")
  console.log(ssInputValue)

//   const idDisplayValue = document.getElementById('ss-output-field')

//   idDisplayValue.innerHTML = 'Values from storage ' + idDisplayValue

}

const ssGetValue = document.getElementById('ss-get-value')

ssGetValue.onclick = async () => {

  var web3 = new Web3(window.ethereum)

  const idWallet = new web3.eth.Contract(idABI, idAddress)
  idWallet.setProvider(window.ethereum)

  var value = await idWallet.methods.get().call({from: ethereum.selectedAddress})

  console.log(value)

  const ssDisplayValue = document.getElementById('ss-output-field')

  ssDisplayValue.innerHTML = 'Reading from Simple Storage... : ' + value

}

////////////////////////////////////////////////////////////
//// VALIDATE IF USER ETH ADDRESS LINNKED TO A VALID PROFILE 
////////////////////////////////////////////////////////////

// const chkProfile = document.getElementById('validate-user-button');

// // chkProfile.disabled = true;
// chkProfile.onclick = async () => {
// 	// const chkAccountValid= document.getElementById('chk-profile-account').value;
// 	var web3 = new Web3(window.ethereum)

//     const accounts = await web3.eth.getAccounts();

// 	await idWallet.methods.validateAccount().send({from: ethereum.selectedAddress}).then(
// 		(result) => {
// 		console.log(result);
// 	})
// 	// validFlag = await idWallet.methods.validateAccount().call({from: ethereum.selectedAddress})

// 	var chkProfileMsg = document.getElementById('validate-user-msg');
// 	chkProfileMsg.innerHTML = ethereum.selectedAddress;
//   }
  
////////////////////////////////////////////////////////////////
//// ADMIN ACTION BY CONTRACT OWNER ONLY - ADD ROOT USER
//// FIRST NON-ZERO ADDRESS WILL BE A ROOT USER
//// ALL OTHER ACCOUNT ADDRESSES WILL BE LINKED TO THE ROOT USER 
////////////////////////////////////////////////////////////////

// const addProfile = document.getElementById('add-rootuser-button');

// addProfile.onclick = async () => {
// 	var returnMsg = " ";

// 	const rootUserAddr = document.getElementById('root-user-addr').value;
// 	// if valid ethereum address proceed to add
// 	if (web3.utils.isAddress(rootUserAddr))
// 		{
// 				/// calling contracts and handling returns
// 		/////////////////////////////////////////
// 		/// method 1 - using promises
// 		// await idWallet.methods.validateAccount().send({from: ethereum.selectedAddress}).then(
// 		// 	x = "ok valid")
// 		// method 2 - using events
// 		// 
// 		// 	myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
// 		// .on('transactionHash', function(hash){
// 		// 	...
// 		// })
// 		// .on('receipt', function(receipt){
// 		// 	...
// 		// })
// 		// .on('confirmation', function(confirmationNumber, receipt){
// 		// 	...
// 		// })
// 		// .on('error', function(error, receipt) {
// 		// 	...
// 		// });
// 		// method 3 - calling a method - call cannot modify storage
// 		await idWallet.methods.setupRootUser(rootUserAddr).call({from: ethereum.selectedAddress}, function (error, result) {
			
// 			if (error != null) {
// 				returnMsg = error;
// 				console.log("error : " + error);
// 			}
// 			else {
// 				returnMsg = result;
// 				console.log("error : " + result);
// 			}
// 			console.log("result : " + returnMsg);
// 			})
// 			returnMsg = "Attempted to add root user"
// 		}

// 	else
// 	{
// 		returnMsg = "Invalid ethereum address"
// 	}
	
// 		// // await idWallet.methods.setupRootUser().send({from: ethereum.selectedAddress}).then((result) => {
// 		// console.log(result);
// 	// })
// 	var addProfileMsg = document.getElementById('add-rootuser-msg');
// 	addProfileMsg.innerHTML = "Root address " + returnMsg;
//   }
