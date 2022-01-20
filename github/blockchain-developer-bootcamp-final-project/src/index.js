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
const idAddress = '0x9a1Ac570b57372e068DCbbe3EaE5d8059b371F8d'

// add contract ABI from Remix:
const idABI =
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
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
		"name": "UrlLog",
		"type": "event"
	},
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
				"internalType": "address",
				"name": "ethAcc",
				"type": "address"
			}
		],
		"name": "accountAddrLog",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "msg",
				"type": "string"
			}
		],
		"name": "messg",
		"type": "event"
	},
	{
		"stateMutability": "nonpayable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "checkUserAccess",
		"outputs": [
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
			}
		],
		"name": "createRootUser",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "deleteRootUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStr",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "profileData",
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
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "retrieveUrl",
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
		"name": "saveUrl",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_text",
				"type": "string"
			}
		],
		"name": "setStr",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "validAccounts",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

/////////////////////////////////////////////////////////
// PRE-CHECKS 
/////////////////////////////////////////////////////////

// Ensure ethereum APIs and Metamask available 
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

//global variables to carry across functions
let ethAcc = '';
let did = ''


// Make connections to Ethereuem and instantiate smart contract
// connect to smart contract

var web3 = new Web3(window.ethereum)
const idWallet = new web3.eth.Contract(idABI, idAddress)
idWallet.setProvider(window.ethereum)


// grab the elements early on, to prep screen for account rotation
const chkUserAccess = document.getElementById('chk-useraccess-button');
const idAddRootUser = document.getElementById('add-rootuser-button');
const idDelRootUser = document.getElementById('delete-rootuser-button');
const idCreate = document.getElementById('id-create-button');
const idUpdate = document.getElementById('id-update-button');
const idGetValue = document.getElementById('id-retrieve-button')
const idOutput = document.getElementById('id-msg-output')
const profileValue1 = document.getElementById('read-profile-name')
const profileValue2 = document.getElementById('read-profile-age')
const profileValue3 = document.getElementById('read-profile-phone')

chkUserAccess.disabled = true;
idAddRootUser.disabled = true;
idDelRootUser.disabled = true;
idCreate.disabled = true;
idUpdate.disabled = true;
idGetValue.disabled = true;


/////////////////////////////////////////////////////////
// USER ACTION HANDLING - Check account
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
  mmCurrentAccount.innerHTML = 'Account connected -- ' + accounts

  //disable check account button after validation
//   mmEnable.disabled = true;
  //enable account to profile link check feature
  chkUserAccess.disabled = false;  
  //make sure other buttons disabled, in case of account switch
  idAddRootUser.disabled = true;
  idDelRootUser.disabled = true;
  idCreate.disabled = true;
  idUpdate.disabled = true;
  idGetValue.disabled = true;

  idOutput.innerHTML = ""
  profileValue1.innerHTML = ""
  profileValue2.innerHTML = ""
  profileValue3.innerHTML = ""

}

//////////////////////////////////////////
// CHECK IF USER HAS ACCESS TO ANY PROFILES
//////////////////////////////////////////

chkUserAccess.onclick = async () => {

	const didValue = await idWallet.methods.checkUserAccess().call({from: ethereum.selectedAddress})
	
	console.log("DID linked to this user address: " + didValue)
	// if profile data exists
		if (didValue != 0 && didValue != " ")
		{
			alert("Profile found for user.. continue")

			//reset caller address, in case account changed
			ethAcc = ethereum.selectedAddress;

			//enable create, update and read functions
			idCreate.disabled = false;
			idUpdate.disabled = false;
			idGetValue.disabled = false;
		  
		}
		else
		{
			// user address does not own any profiles 
			alert("No linked profile..")
			//enable option to add address as root user
			idCreate.disabled = false;
			idAddRootUser.disabled = false;
		}	
}

/////////////////////////////////////////////////////////
// ADMIN ACTIONS - SET UP ROOT USER
////////////////////////////////////////////////////////

idAddRootUser.onclick = async () => {
  // grab value from input box
  const rootUserAddr = document.getElementById('rootuser-addr').value;
  idCreate.disabled = false;
  idUpdate.disabled = false;
  idGetValue.disabled = false;
  await idWallet.methods.createRootUser(rootUserAddr).send({from: ethereum.selectedAddress})
  console.log("root user added : " + rootUserAddr)

  // check if account number entered is a valid ethereum account 
  // future code - to be done
  validateEthAcc()

  //store current account address as default
  ethAcc = ethereum.selectedAddress;

  //provide screen confirmation 
  const mapResult = document.getElementById('map-rootuser-result')
  mapResult.innerHTML = "Added " + rootUserAddr + " as root user";
  idDelRootUser.disabled = false;

}

/////////////////////////////////////////////////////////
// DELETE ROOT USER
////////////////////////////////////////////////////////

idDelRootUser.onclick = async () => {
	// grab value from input box
	const rootUserAddr = document.getElementById('rootuser-addr').value;

	await idWallet.methods.deleteRootUser(rootUserAddr).send({from: ethereum.selectedAddress})
	idCreate.disabled = true;
	idUpdate.disabled = true;
	idGetValue.disabled = true;
    
	//reset current account address
	ethAcc = '';
  
	//provide screen confirmation 
	const mapResult = document.getElementById('map-rootuser-result')
	mapResult.innerHTML = "Deleted " + rootUserAddr + " as root user";

	// clear other o/p fields
	profileValue1.innerHTML = "" 
	profileValue2.innerHTML = ""
	profileValue3.innerHTML = ""
	idOutput.innerHTML = ""
  }
  

//////////////////////////////////////////
// CREATE USER PROFILE 
// step 1 - create a small onchain profile  with just URLs - DID/ stream ID
// step 2 - create offchain profile record with actual user data - can be any user validated profiel data
//////////////////////////////////////////

// PREPARE TO CONNECT TO CERAMIC
// point to ceramic test net url - avbl options :

// read only access :
// const API_URL = 'https://gateway-clay.ceramic.network'
// write access:
const API_URL = 'https://ceramic-clay.3boxlabs.com'
// local node
// const API_URL = 'https://localhost:7007'

// Create Ceramic instance of http-client
const ceramic = new CeramicClient(API_URL);

idCreate.onclick = async () => {

  // set up ceramic : Prep to generate did and stream ID 
  // did -> URL in the identity world. unique to a asset, person, org
  // stream ID -> reference to Tile document that holds the data. Deterministic replacement for IPFS CID

  setupCeramic().then(console.log("Ceramic setup complete.. ")) 

	//DID needs to be authenticated before use
    authCeramic().then(value => {
	// concatenated space to force store by value. (workaround for a error encountereed where did was being
	// passed as reference and ended up as null at the time of writing to smart contract)
	const didSp = ceramic.did.id + " "
	did = didSp.trim()
	console.log("did after ceramic set up: " + did)

	// if did authenticated successfully, create tile. (Tile document holds the user profile data. 
	// this function returns stream ID reference for future document retreival and update)
	createProfileOffChain(did).then(value => {
		const streamIDSp = value.id + " "
		const streamID = streamIDSp.trim()
		console.log(" stream from tile create : " + streamID)

	// Store DID/ URL references only on block to save space..
	storeUrlsOnChain(ethAcc, did, streamID)
			.then(value => {
			const name = document.getElementById('id-name-box').value;
			const age = document.getElementById('id-age-box').value;
			const phone = document.getElementById('id-phone-box').value;  
			
			console.log(`name, age, phone: ${name}, ${age}, ${phone}`)
			// store bulkier/ expandable profile data offchain
			updateProfileOffChain(name, age, phone, did)

			// const idDisplayValue1 = document.getElementById('read-output-did')
			// const idDisplayValue2 = document.getElementById('read-output-stream')
			// const idDisplayValue2 = document.getElementById('read-profile-name')
			// const idDisplayValue2 = document.getElementById('read-profile-age')
			// const idDisplayValue2 = document.getElementById('read-profile-phone')

			//screen confirmation
			idOutput.innerHTML = "Create profile - done!"
			idUpdate.disabled = false;
			idGetValue.disabled = false;
			})
			.catch((error) => {alert("Profile create failed")});
		})
	})
	// create profile option can be disabled from the front end, but enabled here to test scenario with dup
	// profile creation 
	// 
	// idCreate.disabled = true;
}

//////////////////////////////////////////
// UPDATE USER PROFILE 
//////////////////////////////////////////

idUpdate.onclick = async () => {
	// grab value from input box
	//   const isString = value => typeof value === 'string' || value instanceof String;
	const name = document.getElementById('id-name-box').value;
	const age = document.getElementById('id-age-box').value;
	const phone = document.getElementById('id-phone-box').value;
	const idOutput = document.getElementById('id-msg-output')

	// pull did reference from chain
	ReadUrlsOnChain(ethAcc).then(value => {
		// get first argument returned from contract read call
		// get rid of extra spaces if any
		const did = value[0].trim()
		console.log("DID from retrieve user ref : " + did)
		updateProfileOffChain(name, age, phone, did)
		.then(idOutput.innerHTML = "Update profile - done!")
	})
}	

////////////////////////////////////////// 
// READ USER PROFILE
//////////////////////////////////////////

	idGetValue.onclick = async () => {
		//grab output fields
		const idDisplayValue1 = document.getElementById('read-output-did')
		const idDisplayValue2 = document.getElementById('read-output-stream')
		
		//read profile data from ETH smart contract
		const value = await ReadUrlsOnChain(ethAcc);
		idDisplayValue1.innerHTML = "DID reference : " + value[0];
		idDisplayValue2.innerHTML =  "Stream ID : " + value[1];

		//prepare for tile read (offchain document)
		const didString = value[0] + " "
		const thisDid = didString.trim()

		//ensure valid did exists. if not screen display above would confirm null data
		if (thisDid != " " && thisDid != "") {
			readProfileOffChain(thisDid).then(
				value => {
					profileValue1.innerHTML = "Name: " + value.content.name
					profileValue2.innerHTML = "Age: " + value.content.age
					profileValue3.innerHTML = "Phone: " + value.content.phone
					idOutput.innerHTML = ""
				})		
		}		
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

	//update provider type
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
const createProfileOffChain = async function (_did) {
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
/// for deterministic document - family id is needed
////////////////////////////////////////////////////

async function updateProfileOffChain(_name, _age, _phone, _did) {
	//retrieve tile document
	const doc = await TileDocument.deterministic(
		ceramic,
		{
			controllers: [_did],
			family: 'pid' 
			//  tags: ['tag1']
		})
	
	//update tile
	await doc.update({
		name: _name,
		age: _age,
		phone: _phone
	})
}
	
/////////////////////////////////////////////////////
///  Read Tile Document
///  need both DID and family ID to retrieve a tile document
////////////////////////////////////////////////////

async function readProfileOffChain(_did) {
	const retrievedDoc = await TileDocument.deterministic(
	  ceramic,
	  {controllers: [_did],
	   family: 'pid'})
	//    anchor: false, publish: false})
	
	return retrievedDoc
	}
	
////////////////////////////////////////////////////
///  Save DID
////////////////////////////////////////////////////

//store DID & streamID in mini userprofile maintained on chain
async function storeUrlsOnChain(_ethAcc, _did, _stream) {
	return await idWallet.methods.saveUrl(_ethAcc, _did, _stream).send({from: ethereum.selectedAddress})
}

////////////////////////////////////////// 
// RETRIEVE DID/STREAM IDS FROM FROM SMART CONTRACT
//////////////////////////////////////////
async function ReadUrlsOnChain(_ethAcc) {
	return await idWallet.methods.retrieveUrl(_ethAcc).call({from: ethereum.selectedAddress})
}

function validateEthAcc() {
	// future code
	}


// ///////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////
// ///// TESTING ONLY - SIMPLE STORAGE
// ///// TESTING ONLY - SIMPLE STORAGE
// ///// TESTING ONLY - SIMPLE STORAGE
// ///////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////

// const ssSetValue = document.getElementById('ss-set-value')

// ssSetValue.onclick = async () => {

//   var web3 = new Web3(window.ethereum)

//   const ssInputValue = document.getElementById('ss-input-box').value;

//   const idWallet = new web3.eth.Contract(idABI, idAddress)
//   idWallet.setProvider(window.ethereum)

// //   await idWallet.methods.set(ssInputValue).send({from: ethereum.selectedAddress})
//   await idWallet.methods.set(ethAcc).send({from: ethereum.selectedAddress})

//   console.log("Updating simple storage...")
//   console.log(ssInputValue)

// //   const idDisplayValue = document.getElementById('ss-output-field')

// //   idDisplayValue.innerHTML = 'Values from storage ' + idDisplayValue

// }

// const ssGetValue = document.getElementById('ss-get-value')

// ssGetValue.onclick = async () => {

//   var web3 = new Web3(window.ethereum)

//   const idWallet = new web3.eth.Contract(idABI, idAddress)
//   idWallet.setProvider(window.ethereum)

//   var value = await idWallet.methods.get().call()

//   console.log(value)

//   const ssDisplayValue = document.getElementById('ss-output-field')

//   ssDisplayValue.innerHTML = 'Reading from Simple Storage... : ' + value

// }

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
