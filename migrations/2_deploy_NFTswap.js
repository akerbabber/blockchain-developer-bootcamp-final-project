const NFTswap = artifacts.require("NFTswap");

module.exports = function(deployer) {
  deployer.deploy(NFTswap);
}