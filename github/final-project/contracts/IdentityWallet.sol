// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract IdentityWallet is Ownable{

//define struct for the user data
  struct BasicProfile{
    string fname;
    //string lname;
    uint age;
    //string homeAddress;
    uint phone;
    //string email;
  }

//define an array of users
  BasicProfile public basicProfile;

  // A person can have multiple ETH accounts, but only rootuser account.
  // list of all friendly accounts linked a profile
  // MAPPING A PROXY FOR DIDs -- needs more learning to to be implement, pushed for next version

  mapping (address => address) rootUser;
  //  root user to user profile mapping 
  mapping (address => BasicProfile) public userProfile;

// // define enums for request type - create, update, reset
//   enum Request {
//        Update,
//        Read
//     }


  modifier validUser () {
   //ensure user has a valid profile
   //check nested mapping to see if valid user for this profile
    // caller has a root user address attached to their address
    require(msg.sender != address(0), 'Invalid dude');
    _;
  }

  /////////////////////////////////
  ////// SAMPLE CODE FOR TESTING FROM SIMPLE STORAGE
  ////////////////////////////////
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  // fallback() external {
  //     emit Log ("Something went wrong");
  // }

  event Log(string msg);
  event Profile(uint age, uint ph, string nom);

//constructor init values 
//   constructor() public {
// nothing at the moment
  // userProfile[msg.sender] = address[0];
//   }

  function adminTasks() public onlyOwner {
    //some potential tasks for admin
    // 1. transfer ownership
    // 2. renounce ownership
  }
// event log and emit when user data successfully updated

//////////////////////////////////////////////////////////
//// CHECK IF WE CAN IMPLEMENT MULTI SIG WALLETS HERE
/////////////////////////////////////////////////////////
  function mapToRoot (address _userAddress) public {
   //ensure user has a valid profile
   // Account requestor (msg.sender) should be the root user
    if(rootUser[msg.sender] == msg.sender) {
      // map account to root user
        rootUser[_userAddress] = msg.sender; 
    }
  }

  // function validateAccount() external view validUser() returns (string memory) {
  //   string memory retMsg = "OK Valid";
  //   return (retMsg);
  // }

  // function setupRootUser(address userAddress) public onlyOwner validUser(){
    // Root user access is granted by contract owner, if one doesnt exist
  function setupRootUser(address userAddress) public onlyOwner returns (string memory) {
    string memory retString;
    if (rootUser[userAddress] != address(0))
    {
        rootUser[userAddress] = userAddress;
        retString = "Added";
    }
    // verify root user already has an entry
    else if(rootUser[userAddress] == userAddress)
    {
        emit Log("Already a root user");
        retString = "Already root user";
    }
    // For safety log invalid update attempts
    else {
        emit Log("Invalid access request");
        retString = "Invalid access request";
    }
    return retString;
  }

// For a valid root user, update their profile details
  // function updateProfile(uint _age, uint _phone, string memory _name) payable public validUser(msg.sender) {

  function updateProfile(uint _age, uint _phone, string memory _name) payable public {

    // require(if this role has admin then allow this function to execute)
    // valid user asking for a update
    // require(_requestType == Request.Update);        
        userProfile[rootUser[msg.sender]].fname = _name;
        userProfile[rootUser[msg.sender]].age = _age;
        userProfile[rootUser[msg.sender]].phone = _phone;

        emit Log("Updated Profile");
    }

// Retrieve user profile data 
// coding best practice: not receommended to return an array from a function.. Cos it can get called 
// repeatedly and costs gas.
  function readProfile() external validUser() returns(string memory _name, uint _age, uint _phone){
            _name = userProfile[rootUser[msg.sender]].fname;
            _age = userProfile[rootUser[msg.sender]].age;
            _phone = userProfile[rootUser[msg.sender]].phone;
            // log output for testing
            emit Profile(_age, _phone, _name);
            return (_name, _age, _phone);
  }
}