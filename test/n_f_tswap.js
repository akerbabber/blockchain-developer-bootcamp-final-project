const NFTswap = artifacts.require("NFTswap");
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
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
  describe("Initial deployment", async => {
  it("should assert true", async function () {
    const NFTswapInstance = await NFTswap.deployed();
    return assert.isTrue(true);
  }); 
});
describe('First ERC20 deployment', function () {
  beforeEach("should deploy the first token contract",async function () {
    // The bundled BN library is the same one web3 uses under the hood
    this.value = new BN(1);
    console.log(accounts);
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


  /*describe("Testing token transfers into the account address set:", async => {
    it("should let Alice deposit her tokens", async => {
      await firstErc20.transfer(constants.ZERO_ADDRESS, 42, { from: accounts[1] })
    })
  }
   ) */
});
