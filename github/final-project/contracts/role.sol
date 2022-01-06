// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
// import "../mode_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is AccessControl {
    // Create a new role identifier for the minter role
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant DATAOWNER_ROLE = keccak256("DATAOWNER_ROLE");
    bytes32 public constant THIRDPARTY_ROLE = keccak256("THIRDPARTY_ROLE");

    constructor(address owner)  {
          // Grant the admin role to the person who created the contract
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    function setupThirdParty (address _thirdParty) public {
        grantRole(THIRDPARTY_ROLE, _thirdParty);
    }

    function setupdataOwner (address _dataOwner) public {
        grantRole(DATAOWNER_ROLE, _dataOwner);
    }
    function thirdParty(address _thirdParty) public view {
        // Check that the calling account has the minter role
        require(hasRole(THIRDPARTY_ROLE, msg.sender), "Caller is not a authorised third party");
        // _mint(to, amount);
    }
      

   function dataOwner(address _dataOwner) public view {
        // Check that the calling account has the minter role
        require(hasRole(DATAOWNER_ROLE, msg.sender), "Caller is not a authorised DATA OWNER ");
        // _mint(to, amount);
    
    }
}

 