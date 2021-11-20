// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract NFTswap {

  // This mapping must contain the sets, for each saved user address it records the user's assets. 
  /*struct token {
        address addr;
        uint balance;
    }
*/
  mapping(address => bool) isLocked;
  mapping(address => mapping (address => uint)) sets;
  mapping (address => address[]) tokensInSet;
  mapping (address => address[]) offers;



  modifier notLocked() {
    require(!isLocked[msg.sender]);
    _;
  }

  modifier locked() {
    require(isLocked[msg.sender]);
    _;
  }

  constructor() {

  }
// depositIntoSet() must accept tokens, if the user does not have a set it creates a new one, then proceeds deposit the token
// and record it's ownerwhip
  function makeSet() public {
    
  }
  function depositIntoSet (address _tokenAddress, uint _amount) public notLocked {
    ERC20 token;
    token = ERC20(_tokenAddress);
    require(
            token.allowance(msg.sender, address(this)) >= _amount,
            "Token allowance too low"
        );
    sets[msg.sender][_tokenAddress] += _amount;
    tokensInSet[msg.sender].push(_tokenAddress);
    token.transferFrom(msg.sender, address(this), _amount);
    
  }
// withdrawlFromSet() enables the withdrawl of a token from the set, changing the user's set accordingly
  function withdrawlfromSet (address _tokenAddress, uint _amount) public notLocked {
    ERC20 token;
    token = ERC20(_tokenAddress);
    require(sets[msg.sender][_tokenAddress] >= _amount,           
            "Not enough tokens in the set"
        );
    sets[msg.sender][_tokenAddress] -= _amount;
    token.transfer(msg.sender, _amount);
  }
  // makeOrder() creates an order, putting at sale the maker's set after having locked it
  function makeOrder() public notLocked {
    isLocked[msg.sender] = true;

  }
// makeOffer() creates an offer to match an order. The taker, after locking it's set, can match a maker's set.
  function makeOffer(address _order) public notLocked {
    isLocked[msg.sender] = true;
    offers[_order].push(msg.sender);


  }
// acceptOffer() make the exchange happen, maker and taker swaps their sets.
  function acceptOffer(uint _offer) public  locked {
    address orderAddress = msg.sender;
    address offerAddress = offers[orderAddress][_offer];

    require(isOffer(_offer),"This offer does not exist");
    require(isLocked[offerAddress],"The offer must be locked");
    
    address[] memory helperTokenList1;
    uint[] memory helperTokenBalances1;
    address[] memory helperTokenList2;
    uint[] memory helperTokenBalances2;
  
    for (uint i = 0;i < tokensInSet[orderAddress].length; i++){
      helperTokenList1[i] = tokensInSet[orderAddress][i];
      helperTokenBalances1[i] = sets[orderAddress][tokensInSet[orderAddress][i]];
      delete sets[orderAddress][tokensInSet[orderAddress][i]];
      
    }
    for (uint i = 0;i < tokensInSet[offerAddress].length; i++){
      helperTokenList2[i] = tokensInSet[offerAddress][i];
      helperTokenBalances2[i] = sets[offerAddress][tokensInSet[offerAddress][i]];
      delete sets[offerAddress][tokensInSet[offerAddress][i]];
    }
    
    delete tokensInSet[orderAddress];
    delete tokensInSet[offerAddress];

    for (uint i = 0;i < helperTokenList1.length;i++){
      sets[offerAddress][helperTokenList1[i]] = helperTokenBalances1[i];
      tokensInSet[offerAddress].push(helperTokenList1[i]);
    }

    for (uint i = 0;i < helperTokenList2.length;i++){
      sets[orderAddress][helperTokenList2[i]] = helperTokenBalances2[i];
      tokensInSet[orderAddress].push(helperTokenList2[i]);
    }
    
    //(sets[offers[msg.sender][_offer]],sets[msg.sender]) = (sets[msg.sender],sets[offers[msg.sender][_offer]]);

  }

  function isOffer(uint _offer) public view returns(bool) {
    if (offers[msg.sender][_offer] != address(0)) {
      return true;
    }
    else return false;
  }
}

  
