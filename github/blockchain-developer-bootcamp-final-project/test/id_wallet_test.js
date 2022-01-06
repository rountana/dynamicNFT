const idWalletTest = artifacts.require("idWalletTest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("idWalletTest", function (/* accounts */) {
  it("should assert true", async function () {
    await idWalletTest.deployed();
    return assert.isTrue(true);
  });
});
