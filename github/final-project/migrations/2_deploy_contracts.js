var IdentityWallet = artifacts.require("./IdentityWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(IdentityWallet);
};

// var role = artifacts.require("./role.sol");

// module.exports = function(deployer) {
// deployer.deploy(role);
// };