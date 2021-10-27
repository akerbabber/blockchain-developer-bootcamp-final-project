// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NFTswap {

  // This mapping must contain the sets, for each saved user address it records the user's assets. 
  mapping (address => address[]) public sets;
  constructor() public {

  }
// depositIntoSet() must accept tokens, if the user does not have a set it creates a new one, then proceeds deposit the token
// and record it's ownerwhip
  function depositIntoSet (address _token) public {

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

  
