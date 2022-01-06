

// import {encrypt} from 'eth-sig-util';
// "use strict";
// import { stripHexPrefix } from "../node_modules/ethereumjs-util"
// const { stripHexPrefix } = require('ethereumjs-util')

// var encrypt = window.ethereum.;
// contract address on Ropsten:
const idAddress = '0x925d92f53d867D0c930CcE1f9B54272d2CD74Da7'

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
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ph",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "nom",
				"type": "string"
			}
		],
		"name": "Profile",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "adminTasks",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "basicProfile",
		"outputs": [
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
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "mapToRoot",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"inputs": [],
		"name": "readProfile",
		"outputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_phone",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
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
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "setupRootUser",
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
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_phone",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "updateProfile",
		"outputs": [],
		"stateMutability": "payable",
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
// Using the 'load' event listener for Javascript to
// check if window.ethereum is available

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

//////////////////////// FORM LOGIC STARTS HERE /////////////////////////
/////////////////////////////////////
///// METAMASK CONNECT
/////////////////////////////////////
var web3 = new Web3(window.ethereum)

// Grabbing the button object 

const mmEnable = document.getElementById('mm-connect');

// since MetaMask has been detected, we know
// `ethereum` is an object, so we'll do the canonical
// MM request to connect the account. 
// 
// typically we only request access to MetaMask when we
// need the user to do something, but this is just for
// an example
 
mmEnable.onclick = async () => {
//   await ethereum.request({ method: 'eth_requestAccounts'})
//// TESTING
  const accounts = await web3.eth.getAccounts();
  var mmCurrentAccount = document.getElementById('mm-current-account');
  mmCurrentAccount.innerHTML = 'Current Account: ' + accounts
  mmEnable.disabled = true;

  // grab mm-current-account
  // and populate it with the current address
//   var mmCurrentAccount = document.getElementById('mm-current-account');
//   mmCurrentAccount.innerHTML = 'Current Account: ' + ethereum.selectedAddress
}

////////////////////////////////////////////////////////////
//// VALIDATE IF USER ETH ADDRESS LINNKED TO A VALID PROFILE 
////////////////////////////////////////////////////////////

const chkProfile = document.getElementById('chk-profile-button');

chkProfile.disabled = true;
chkProfile.onclick = async () => {
	// const chkAccountValid= document.getElementById('chk-profile-account').value;
	var web3 = new Web3(window.ethereum)

	// instantiate smart contract instance
	
	const idWallet = new web3.eth.Contract(idABI, idAddress)
	idWallet.setProvider(window.ethereum)
    const accounts = await web3.eth.getAccounts();

	// validFlag = await idWallet.methods.validateAccount(accounts[0]).send({from: ethereum.selectedAddress})
	validFlag = await idWallet.methods.validateAccount(accounts[0]).call({from: ethereum.selectedAddress})

	var chkProfileMsg = document.getElementById('chk-profile-msg');
	chkProfileMsg.innerHTML = ethereum.selectedAddress;
  }
  

////////////////////////////////////////////////////////////////
//// ADMIN ACTION BY CONTRACT OWNER ONLY - ADD ROOT USER
//// FIRST NON-ZERO ADDRESS WILL BE A ROOT USER
//// ALL OTHER ACCOUNT ADDRESSES WILL BE LINKED TO THE ROOT USER 
////////////////////////////////////////////////////////////////

const addProfile = document.getElementById('add-rootuser-button');

addProfile.onclick = async () => {
	var web3 = new Web3(window.ethereum)

	// instantiate smart contract instance
	
	const idWallet = new web3.eth.Contract(idABI, idAddress)
	idWallet.setProvider(window.ethereum)
    const accounts = await web3.eth.getAccounts();

	// validFlag = await idWallet.methods.validateAccount(accounts[0]).send({from: ethereum.selectedAddress})
	await idWallet.methods.setupRootUser().send({from: ethereum.selectedAddress}).then((result) => {
		console.log(result);
	})

	

	var addProfileMsg = document.getElementById('add-rootuser-msg');
	addProfileMsg.innerHTML = "Root address added";
  }

//////////////////////////////////////////
// GET USER INPUTS FROM SCREEN
//////////////////////////////////////////

const idUpdate = document.getElementById('id-update-button');

idUpdate.onclick = async () => {
  // grab value from input box

  const idnameValue = document.getElementById('id-name-box').value;
  console.log(idnameValue)
  const idageValue = document.getElementById('id-age-box').value;
  const idphoneValue = document.getElementById('id-phone-box').value;
  var web3 = new Web3(window.ethereum)

  // instantiate smart contract instance
  
  const idWallet = new web3.eth.Contract(idABI, idAddress)
  idWallet.setProvider(window.ethereum)

  await idWallet.methods.updateProfile(idageValue, idphoneValue, idnameValue).send({from: ethereum.selectedAddress})

  console.log("Updated values...")
}

////////////////////////////////////////// 
// READ USER DATA FROM CONTRACT
/////////////////////////////////////////

const idGetValue = document.getElementById('id-get-value')

idGetValue.onclick = async () => {

  var web3 = new Web3(window.ethereum)

  const idWallet = new web3.eth.Contract(idABI, idAddress)
  idWallet.setProvider(window.ethereum)

  var value = await idWallet.methods.readProfile().call()

  console.log("Reading values...")
  console.log(value)

  const idDisplayValue = document.getElementById('id-display-value')

  idDisplayValue.innerHTML = 'Name, Age, Phone ' + value

}

