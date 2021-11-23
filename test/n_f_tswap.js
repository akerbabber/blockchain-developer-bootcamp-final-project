const NFTswap = artifacts.require("NFTswap");
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');
const { expect, assert } = require('chai');
const { } = require('console');
const { address } = require('faker');
const { toBN } = require('web3-utils');
// let accounts;
// async function getAccounts() {
//   // Get list of all accounts
//   accounts = await web3.eth.getAccounts();
//   // Use one of those accounts to deploy the contract
// };
// await getAccounts();



let firstErc20;
let secondErc20;
let thirdErc20;
let fourthErc20;

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
const ERC20 = artifacts.require('ERC20PresetMinterPauser');



contract("NFTswap", function (accounts) {
  const alice = accounts[0];
  const bob = accounts[1];
  let NFTswapInstance;
  describe("Initial deployment", async => {
  it("should assert true", async function () {
    NFTswapInstance = await NFTswap.deployed();
    return assert.isTrue(true);
  }); 
});
describe('First ERC20 deployment', function () {
  beforeEach("should deploy the first token contract",async function () {
    // The bundled BN library is the same one web3 uses under the hood
    this.value = new BN(1);
    //console.log(accounts);
    firstErc20 = await ERC20.new("firstErc20","FE2",{from: alice});
  });
  it('ERC20 should work', async () => {
    await expectRevert(
        firstErc20.transfer(constants.ZERO_ADDRESS, 42, { from: bob }),
        'ERC20: transfer to the zero address'
    );
    expect(
      await firstErc20.mint(alice,toBN(100 * 10 ** 18))
    );
    it("alice should recive 100 tokens", async () => {
      assert.equal(await firstErc20.balanceOf(alice),toBN(100 * 10 ** 18), "Alice has not received her tokens");
    });
});
});


  describe("Testing token transfers into the account address set:", async () => {
    it("Alice should give token allowance to the contract", async () => {
      await firstErc20.approve(NFTswapInstance.address,toBN(100 * 10 ** 18),{from: alice});
    });
    it("should let Alice deposit her tokens", async () => {
      await NFTswapInstance.depositIntoSet(firstErc20.address,toBN(100 * 10 ** 18),{from: alice});
    });
    it("should save the change into the contract state", async () => {
      assert.equal((await NFTswapInstance.getSetTokenAmount(alice,firstErc20.address)).toString(),toBN(100 * 10 ** 18).toString());
      
    });
    it("should add the token address to the array", async () => {
      assert.equal(await NFTswapInstance.getTokenInSetAddress(alice,0),firstErc20.address);
    });
    it("should transfer the tokens", async () => {
      assert.equal(await firstErc20.balanceOf(NFTswapInstance.address),toBN(100 * 10 ** 18).toString());
    });
    
    
  }
   ); 
   describe("Testing token withdrawal from the token set",async () => {
    it("Alice should be able to withdrawal tokens", async () => {
      await NFTswapInstance.withdrawalFromSet(firstErc20.address,toBN(100 * 10 ** 18).toString());
    } ) ;
    it("should update the sets amount", async () => {
      assert.equal(await NFTswapInstance.getSetTokenAmount(alice,firstErc20.address),"0");
    })
    it("should have transferred the tokens bak to Alice's address", async () => {
      assert.equal(await firstErc20.balanceOf(alice),toBN(100 * 10 ** 18).toString());
    });

   }) ;
   describe("Testing multiple token deposit",async () => { 
    it('should mint the tokens', async () => {
      secondErc20 = await ERC20.new("secondErc20","SE2",{from: alice});
      thirdErc20 = await ERC20.new("thirdErc20","TE2",{from: bob});
      fourthErc20 = await ERC20.new("fourthErc20","FOE2",{from: bob});
    expect(
      await firstErc20.mint(alice,toBN(100 * 10 ** 18),{from: alice})
      );
    expect(
      await secondErc20.mint(alice,toBN(100 * 10 ** 18),{from: alice})
    );
    expect(
      await thirdErc20.mint(bob,toBN(100 * 10 ** 18),{from: bob})
    );
    expect(
      await fourthErc20.mint(bob,toBN(100 * 10 ** 18),{from: bob})
    );

});
it("should approve tokens", async () => {
  await firstErc20.approve(NFTswapInstance.address,toBN(100 * 10 ** 18),{from: alice});
  await secondErc20.approve(NFTswapInstance.address,toBN(100 * 10 ** 18),{from: alice});
  await thirdErc20.approve(NFTswapInstance.address,toBN(100 * 10 ** 18),{from: bob});
  await fourthErc20.approve(NFTswapInstance.address,toBN(100 * 10 ** 18),{from: bob});
});
it("should let alice and bob deposit their tokens", async () => {
  await NFTswapInstance.depositIntoSet(firstErc20.address,toBN(100 * 10 ** 18),{from: alice});
  await NFTswapInstance.depositIntoSet(secondErc20.address,toBN(100 * 10 ** 18),{from: alice});
  await NFTswapInstance.depositIntoSet(thirdErc20.address,toBN(100 * 10 ** 18),{from: bob});
  await NFTswapInstance.depositIntoSet(fourthErc20.address,toBN(100 * 10 ** 18),{from: bob});
});
describe("Testing order-offer matching and lock mechanism", async () => {
  it("should let alice make an order", async() => {
    await NFTswapInstance.makeOrder({from: alice});
    assert.equal(await NFTswapInstance.getIsLocked(alice),true);
  });
  it("should let bob match Alice's offer",async () =>{
    await NFTswapInstance.makeOffer(alice,{from: bob});
    assert.equal(await NFTswapInstance.getIsLocked(bob),true);
    assert.equal((await NFTswapInstance.getOffers(alice)).includes(bob),true);
  });
});
describe("Testing the swap", async () => {
  it("should run acceptOffer() and make the swap happen", async () => {
    await debug(NFTswapInstance.acceptOffer(0,{from: alice}));
  })
  
});

})
})
