// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTswap {

  // This mapping must contain the sets, for each saved user address it records the user's assets. 
  /*struct token {
        address addr;
        uint balance;
    }
*/
  mapping(address => bool) isLocked;
  mapping(address => mapping (address => uint)) sets;

  //using SafeERC20 for IERC20;

  modifier notLocked() {
    require(!isLocked[msg.sender]);
    _;
  }

  constructor() {

  }
// depositIntoSet() must accept tokens, if the user does not have a set it creates a new one, then proceeds deposit the token
// and record it's ownerwhip
  function makeSet() public {
    
  }
  function depositIntoSet (address _tokenAddress, uint _amount) public {
    IERC20 token;
    token = IERC20(_tokenAddress);
    require(
            token.allowance(msg.sender, address(this)) >= _amount,
            "Token allowance too low"
        );
    sets[msg.sender][_tokenAddress] = _amount;
    token.transferFrom(msg.sender, address(this), _amount);
    
  }
// withdrawlFromSet() enables the withdrawl of a token from the set, changing the user's set accordingly
  function withdrawlfromSet (address _token) public {

  }
  // makeOrder() creates an order, putting at sale the maker's set after having locked it
  function makeOrder() public {

  }
// makeOffer() creates an offer to match an order. The taker, after locking it's set, can match a maker's set.
  function makeOffer() public {

  }
// acceptOffer() make the exchange happen, maker and taker swaps their sets.
  function acceptOffer() public {}
}

  
