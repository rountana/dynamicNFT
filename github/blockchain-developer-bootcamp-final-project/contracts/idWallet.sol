// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract idWallet{

//define struct for the user data

  struct url {
    //did reference to user profile data
    string did;
    string streamID;
    // string fname;
    // //string lname;
    // uint age;
    // //string homeAddress;
    // uint phone;
    //string email;
  }

//define an array of URL
  url public urlRef;

  // A person can have multiple ETH accounts, but only rootuser account.
  // list of all friendly accounts linked a profile
  // MAPPING A PROXY FOR DIDs -- needs more learning to to be implement, pushed for next version

  // mapping (address => address) rootUser;
  //  user to did mapping 
  mapping (address => url) public userRefID;

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
  address storedData;

  function set(address x) public {
    storedData = x;
  }

  function get() public view returns (address) {
    return storedData;
  }

  // fallback() external {
  //     emit Log ("Something went wrong");
  // }

  event DataLog(string msg, string did, string sid);

// //constructor init values 
// //   constructor() public {
// // nothing at the moment
//   // userProfile[msg.sender] = address[0];
// //   }

//   function adminTasks() public onlyOwner {
//     //some potential tasks for admin
//     // 1. transfer ownership
//     // 2. renounce ownership
//   }
// // event log and emit when user data successfully updated

// //////////////////////////////////////////////////////////
// //// CHECK IF WE CAN IMPLEMENT MULTI SIG WALLETS HERE
// /////////////////////////////////////////////////////////
//   function mapToRoot (address _userAddress) public {
//    //ensure user has a valid profile
//    // Account requestor (msg.sender) should be the root user
//     if(rootUser[msg.sender] == msg.sender) {
//       // map account to root user
//         rootUser[_userAddress] = msg.sender; 
//     }
//   }
//   // string retMsg; 

//   // function validateAccount() external view validUser() returns (string calldata retMsg) {
//   //   retMsg = "OK Valid";
//   //   // return (retMsg);
//   // }

//   // function setupRootUser(address userAddress) public onlyOwner validUser(){
//     // Root user access is granted by contract owner, if one doesnt exist
//   function setupRootUser(address userAddress) public onlyOwner returns (string memory) {
//     string memory retString;
//     if (rootUser[userAddress] != address(0))
//     {
//         rootUser[userAddress] = userAddress;
//         retString = "Added OK";
//     }
//     // verify root user already has an entry
//     else if(rootUser[userAddress] == userAddress)
//     {
//         emit Log("Error - User exists");
//         retString = "Error - User exists";
//     }
//     // For safety log invalid update attempts
//     else {
//         emit Log("Error - Invalid access request");
//         retString = "Error - Invalid access request";
//     }
//     return retString;
//   }

// // For a valid root user, update their profile details
//   // function updateProfile(uint _age, uint _phone, string memory _name) payable public validUser(msg.sender) {

//   function updateProfile(uint _age, uint _phone, string memory _name) payable public {

//     // require(if this role has admin then allow this function to execute)
//     // valid user asking for a update
//     // require(_requestType == Request.Update);        
//         userProfile[rootUser[msg.sender]].fname = _name;
//         userProfile[rootUser[msg.sender]].age = _age;
//         userProfile[rootUser[msg.sender]].phone = _phone;

//         emit Log("Updated Profile");
//     }

// // Retrieve user profile data 
// // coding best practice: not receommended to return an array from a function.. Cos it can get called 
// // repeatedly and costs gas.
//   function readProfile() external validUser() view returns(string memory _name, uint _age, uint _phone){
//             _name = userProfile[rootUser[msg.sender]].fname;
//             _age = userProfile[rootUser[msg.sender]].age;
//             _phone = userProfile[rootUser[msg.sender]].phone;
//             // log output for testing
//             // emit Profile(_age, _phone, _name);
//   }

  function saveDID(address ethAcc, string memory _did, string memory _streamID) external validUser(){

    // require(if this role has admin then allow this function to execute)
    // valid user asking for a update
    // require(_requestType == Request.Update);        
        userRefID[ethAcc].did = _did;
        userRefID[ethAcc].streamID = _streamID;
        emit DataLog("saved DID on chain", userRefID[ethAcc].did, userRefID[ethAcc].streamID);
    }

  function retrieveDID(address ethAcc) external validUser() returns(string memory, string memory) {

    // require(if this role has admin then allow this function to execute)
    // valid user asking for a update
    // require(_requestType == Request.Update);     
        emit DataLog("retrieved DID", userRefID[ethAcc].did, userRefID[ethAcc].streamID);
        return (userRefID[ethAcc].did, userRefID[ethAcc].streamID);
    }

}

  