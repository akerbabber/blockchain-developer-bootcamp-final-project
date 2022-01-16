const YetAnotherOTC = artifacts.require("YetAnotherOTC");
const ERC20 = artifacts.require('FaucetERC20');


module.exports = function(deployer) {
  deployer.deploy(YetAnotherOTC);
  deployer.deploy(ERC20,"firstErc20","FE2");
  deployer.deploy(ERC20,"thirdErc2","TE2");
  deployer.deploy(ERC20,"secondErc20","SE2");
  deployer.deploy(ERC20,"fourthErc20","FOE2");
}