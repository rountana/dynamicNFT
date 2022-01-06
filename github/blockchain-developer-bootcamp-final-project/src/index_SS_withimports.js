import { CeramicClient } from '@ceramicnetwork/http-client'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { TileDocument } from '@ceramicnetwork/stream-tile'

// import DID resolvers
import { DID } from 'dids'
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { randomBytes } from '@stablelib/random'

// var encrypt = window.ethereum.;
const idAddress = '0x9a1282CCc5f8B972445000ddd32Eb40Cb6F02B51'

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
			}
		],
		"name": "Log",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "did",
				"type": "string"
			}
		],
		"name": "Profile",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "basicProfile",
		"outputs": [
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "phone",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
				"name": "_did",
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
				"internalType": "uint256",
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "set",
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
		"name": "userProfile",
		"outputs": [
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "phone",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
// point to ceramic test net - options :

	// for read only access :
	// const API_URL = 'https://gateway-clay.ceramic.network'
	// for write access:
	const API_URL = 'https://ceramic-clay.3boxlabs.com'
	// for local node
	// const API_URL = 'https://localhost:7007'

	// Create Ceramic instance of http-client
	const ceramic = new CeramicClient(API_URL);

// Using the 'load' event listener for Javascript to
//
// metamask checks
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

//////////////////////// FORM LOGIC I/O  /////////////////////////

// Make connections to Ethereuem and instantiate smart contract

let ethAcc = '';
// Common code to be referenced later
var web3 = new Web3(window.ethereum)
const idWallet = new web3.eth.Contract(idABI, idAddress)
idWallet.setProvider(window.ethereum)

// Grab the button object 

const mmEnable = document.getElementById('mm-connect');

// since MetaMask has been detected, we know
// `ethereum` is an object, so we'll do the canonical
// MM request to connect the account. 
// 
mmEnable.onclick = async () => {
//   await ethereum.request({ method: 'eth_requestAccounts'})
//// TESTING
  const accounts = await web3.eth.getAccounts();
//   const _xdid = "kjzl6cwe1jw146bt5zbu48nquj4r7degwpuaaqxtyed0qjhswv49n8g59gv330i"
//   await idWallet.methods.saveDID(accounts[0], _did).send({from: ethereum.selectedAddress})

//   console.log(" eth.getAccounts output" + accounts[0] , accounts[1])
  // grab html element and populate it with the current address

  var mmCurrentAccount = document.getElementById('mm-current-account');
  mmCurrentAccount.innerHTML = 'Current Account: ' + accounts

//   mmEnable.disabled = true;
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

  await idWallet.methods.set(ssInputValue).send({from: ethereum.selectedAddress})

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
