var idWallet = artifacts.require("./idWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(idWallet);
};