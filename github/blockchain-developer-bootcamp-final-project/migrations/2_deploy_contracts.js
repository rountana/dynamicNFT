var idWallet = artifacts.require("./idWallet.sol");

module.exports = function(deployer,network,accounts) {
  deployer.deploy(idWallet, {from: accounts[0]});
};