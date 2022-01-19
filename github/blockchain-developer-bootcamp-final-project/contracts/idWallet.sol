// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/security/ReentrancyGuard.sol";

contract idWallet is Ownable, ReentrancyGuard{

//////******************** CHECK _OWNER VS MSG>SENDER FOR CONTRACT OWNER *************/
//define struct for the user data. An Eth account can have only one matching profile
// DID is the identity URL - a W3C standard
// stream ID is the URL to access content document - underneath is a CID for a IPFS document

  struct Url {
    //did reference to user profile data
    // ** solidity notes ** "did" is the key reference for the value stored in struct 
    string did;
    string streamID;
  }

  // profile to URL mapping - is a link to the offchain profile database
  mapping (address => Url) public profileData;

  // Access table : list of all valid accounts including root address. 
  // mapping looks like this..
  // 0xa1...(key - > unique account address) = 0xroo2 (value -> corresponding root user address)
  // if only one address exists, both key and value will be root addresses

  mapping (address => address) public validAccounts;

  //message events
  event UrlLog(string msg, string did, string sid);
  event accountAddrLog(string msg, address ethAcc);
  event messg(string msg);

///////////////////////////////////////
// MODIFIERS
///////////////////////////////////////
// ensure caller is not a zero address
  modifier validAddress () {
   //ensure user has a valid profile
    // require(msg.sender != address(0), 'Invalid caller address');
    // emit accountAddrLog("Invalid caller address", msg.sender);
    // if (msg.sender == address(0)) {
      assert(msg.sender != address(0));
    _;
  }

  //check if root user (owner of user profle)
  modifier onlyRootUser (address ethAcc) {
    require(validAccounts[msg.sender] == ethAcc, "Not a root user");
    _;
  }

  //avoid duplicate profiles from being created 
  modifier notDupProfile(address ethAcc) {
    // check if profile data exists
    Url memory _senderUrl = profileData[msg.sender];
    //way to test for empty string
    bytes memory tempSenderDid = bytes(_senderUrl.did);
    // ensure no prior profile data URL exists for user
    require (tempSenderDid.length == 0, "Profile already exists");
    _;
  }

  //avoid duplicate account address entries in access table
  modifier notDupUser(address ethAcc) {
    require(validAccounts[ethAcc] == address(0), "Account already exists");
    _;
  }

// add account address as root user. only contract owner is allowed this privilege.
  function createRootUser(address ethAcc) external notDupUser(ethAcc) onlyOwner{
    //set value and key to same address
    validAccounts[ethAcc] = ethAcc;
    emit accountAddrLog("root user created for address : ", ethAcc);
  }

//delete root user
  function deleteRootUser(address ethAcc) external onlyOwner {
    //set value and key to same address
    if(validAccounts[ethAcc] != address(0))
    {
       delete validAccounts[ethAcc];
       emit accountAddrLog("root user access deleted for account : ", ethAcc);
    }
    else
    {
        emit accountAddrLog("Account does not exist : ", ethAcc);
    }
    }

// Check if profile exists for this user.
  function checkUserAccess() external returns (string memory){

      //placeholder for future code--------
      //check if one of the valid access accounts
      //if so, retrieve root user ----------
      //else, assume msg.sender is root user
      address rootUser = msg.sender;
      //
    //check if 'did' exists for this user  
    Url memory _senderUrl = profileData[rootUser];
    bytes memory tempSenderDid = bytes(_senderUrl.did);
    // yes, confirm with msg and log values
    if (tempSenderDid.length != 0) {
      emit messg("Profile exists");
      emit UrlLog("URL LOG: ", _senderUrl.did, _senderUrl.streamID);
    }
    // no, send error message and log values
    else {
      emit messg("No Profile exists");
    }
    //send did or null
    return _senderUrl.did;
  }

  //
  // option to add multiple controlling accounts for a user profile 
  // 
  function addNewAccount(address ethAcc) external onlyRootUser(ethAcc) {
    // to be implemented
  }

  // future function to delete user entries
  function delAccounts(address ethAcc) external onlyRootUser(ethAcc) {
    // to be implemented
  }
  //
  // when a profile is created - the associated DID reference and streamIDs will be stored
  // update happens only when
  // * user address is valid
  // * account has root user access
  // * profile does not exist already - did created and stored only once per user - cannot be rotated

  function saveUrl(address ethAcc, string memory _did, string memory _streamID) external validAddress onlyRootUser(ethAcc) notDupProfile(ethAcc) returns (bool){

  // ensure input did string is not zero before saving to storage variable   
    bytes memory tempDid = bytes(_did);
    if (tempDid.length != 0)
    {
        profileData[ethAcc].did = _did;
        profileData[ethAcc].streamID = _streamID;
        emit UrlLog("saved DID on chain", profileData[ethAcc].did, profileData[ethAcc].streamID);
        return true;
    }  
    return false;
  }


// retrieve did and stream ID from storage variable
  function retrieveUrl(address ethAcc) external validAddress returns(string memory, string memory)  {

    // require(if this role has admin then allow this function to execute)
    // valid user asking for a update
    // require(_requestType == Request.Update);     
        emit UrlLog("retrieved DID", profileData[ethAcc].did, profileData[ethAcc].streamID);
        return (profileData[ethAcc].did, profileData[ethAcc].streamID);
    }
  
  fallback() external  {
  }

}

