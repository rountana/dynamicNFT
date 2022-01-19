const idWallet = artifacts.require("idWallet");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("idWallet", function (  accounts ) {
  const [owner, alice, bob, carlos] = accounts;

  const ethAcc = owner;
  const zeroAcc = "0x0000000000000000000000000000000000000000";
  const did = "did:key:z6MkqBNP2SZBACivJ8V729EBUizTbsLe8TUEzt73MuxW0000";
  const streamID = "k2t6wyfsu4pg0lm5d7hq1g54jqduz1j8f2dm5xuynyqxpsqfe4d1xn2fr20000";

  beforeEach(async function()  {
    instance = await idWallet.deployed()
  })

  //check initial values of profile data 
  it("1- ensure no profile data exists at first pass", async() => {

  const _profileData = await instance.profileData(bob);
  console.log(_profileData[0])
  assert(_profileData.did == '', "profile data should be null before first entry")
  });

  //check initial values of authorized user db 
  it("2- check if no root user exists at init", async() => {

  //adding profile for bob
  //at this stage caller is not a root user, so save URL should fail
  //check root user exists
  const rootUser = await instance.validAccounts(bob)
  console.log(`root user before create: ${rootUser}`)
  assert(rootUser === '0x0000000000000000000000000000000000000000', "Root user should be null at first pass")

  });
  
  //now, add root user and check if successful 
  it("3- root user added to access list prior to profile update", async () => {
    let eventEmitted = false;
    const result = await instance.createRootUser(bob, { from: owner });

    if (result.logs[0].event == "accountAddrLog") {
      eventEmitted = true;
    }

    assert.equal(
      eventEmitted,
      true,
      "root user should be created and logged",
    );

    // ensure that root user is added
    const rootUser = await instance.validAccounts(bob)
    console.log(`root user after create: ${rootUser}`)
    assert(rootUser === bob, "Root user cannot be null")
  
  });

  // read operation - prove that smart contract storage is empty prior to adding any data
  it("4- read profil URLs prior to saving any data - should return null", async () => {
    let eventEmitted = false;
    const result = await instance.retrieveUrl(bob, {from: bob});

    if (result.logs[0].event == "UrlLog") {
      eventEmitted = true;
    }

    assert.equal(
      eventEmitted,
      true,
      "Log the DID when profile data is read",
    );

    const _profileData = await instance.profileData(bob);
    assert(_profileData.did == '', "profile data should be null before first entry")
  
  });

  // verify update user data works well
  it("5- User profile data saved in smart contract storage", async () => {
    let eventEmitted = false;
    const result = await instance.saveUrl(bob, did, streamID, {from: bob});


    if (result.logs[0].event == "UrlLog") {
      eventEmitted = true;
    }

    assert.equal(
      eventEmitted,
      true,
      "Log the DID/Stream IDs when new profile is created",
    );

    });

    // read user data again. double check we are able to read updated data
    it("6- read profile URLs afer updates - should return valid DID", async () => {
      const _profileData = await instance.profileData(bob);
      await instance.retrieveUrl(bob, {from: bob});

      assert(_profileData.did == did, "DID value has to match saved DID")

    })
    
    // case of invalid user - ensure appropriate response for user who has no entry in the user table
    it("7- read profile URLs afer updates - for unknown user", async () => {
      const _profileData = await instance.profileData(alice);
      await instance.retrieveUrl(alice, {from: bob});

      assert(_profileData.did != did, "DID value cannot be same as saved DID")

    })

    //  verify function that checks if a user has access to a given profile data
    it("8- check if profile data attached to the user", async () => {
      let eventEmitted = false;
      const result = await instance.checkUserAccess({from: bob});

      if (result.logs[1].event == "UrlLog") {
        eventEmitted = true;
      }
  
      assert.equal(
        eventEmitted,
        true,
        "Log the DID/Stream IDs when profile exists for user",
      );
  
    })
//final parantheses
})


