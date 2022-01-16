// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

//TODO: EVENTS!!!


/// @title Yet Another OTC contract.
/// @author Maurizio Murru
/// @notice A simple OTC swap contract for erc20. 
/// @dev A simple OTC swap contract for erc20. This contract should not be deployed on mainnet networks.

contract YetAnotherOTC {

  // This mapping must contain the sets, for each saved user address it records the user's assets. 
  /*struct token {
        address addr;
        uint balance;
    }
*/
  // mapping to check if a set is locked
  mapping(address => bool) isLocked;
  // mapping that cointains the user's balances
  mapping(address => mapping (address => uint)) sets;
  // mapping the contains the array of erc20 token addresses for looping purpose
  mapping (address => address[]) tokensInSet;
  // mapping that contains the offers offered to a specific user's set address
  mapping (address => address[]) offers;


  /// @notice to check that users can deposit and withdraw when the set is not locked
  /// @dev cheks isLocked to verify that the tx sender's set is not locked
  modifier notLocked() {
    require(!isLocked[msg.sender]);
    _;
  }

  /// @notice to check that users can't deposit and withdraw when the set is locked
  /// @dev cheks isLocked to verify that the tx sender's set is locked

  modifier locked() {
    require(isLocked[msg.sender]);
    _;
  }

  constructor() {

  }


/// @notice getter function to lookup if a set is locked by checking isLocked[] array
/// @param _address(the set's owner address)
// @return a bool that is true fi the address is locked
  function getIsLocked(address _address) public view returns (bool) {
    return isLocked[_address];
  }
/// @notice getter function to get all offer's offered to an address by checking isLocked[] array
/// @param _address(the set's owner address)
/// @return the array that contains all offers addresses
  function getOffers (address _address) public view returns (address[] memory) {
    return offers[_address];
  }
/// @notice getter function to get a specific token balance inside a set by checking the sets[][] mapping
/// @param _holder(the set's owner address), _tokenAddress(token's address)
/// @return the user's token balance 
  function getSetTokenAmount(address _holder,address _tokenAddress) public view returns (uint) {
    return sets[_holder][_tokenAddress];
  }
  /// @notice getter function to get a specific token address inside a set by checking the tokensInSet mapping
  /// @param _holder(the set's owner address), _tokenPosition(the token's address position in the tokensInSet array)
  /// @dev the _tokenPosition must be conmputed off-chain, since tokensInSet[_holder] is an array and not a mapping, 
  /// @dev this to ensure that during the swap the token's list can be iterated (impossible by just using mappings)
  /// @return the token's address

  function getTokenInSetAddress(address _holder, uint _tokenPosition) public view returns (address) {
    
    return tokensInSet[_holder][_tokenPosition];
  }

  /// @notice getter function to get the size set by checking the tokensInSet mapping
  /// @param _holder(the set's owner address)
  /// @return the size of a set

  function getSetSize(address _holder) public view returns (uint) {
    
    return tokensInSet[_holder].length;
  }

  /// @notice functions to deposit tokens into the set
  /// @param _tokenAddress(the address of the token) _amount(the amount of tokens that the user want to deposit in the set)
  /// @dev following the check-effect-interactions paradigm:it first checks if the token's allowance is enough,
  /// @dev then modifies the sets and tokensInSet mappings to update the balances,
  /// @dev and last it sends the tokens from the user's address to the contract
  function depositIntoSet (address _tokenAddress, uint _amount) public notLocked {
    ERC20 token;
    token = ERC20(_tokenAddress);
    require(
            token.allowance(msg.sender, address(this)) >= _amount,
            "Token allowance is too low"
        );
    if (sets[msg.sender][_tokenAddress] == 0) {
        tokensInSet[msg.sender].push(_tokenAddress);
    }
    sets[msg.sender][_tokenAddress] += _amount;

    token.transferFrom(msg.sender, address(this), _amount);
    
  }
  /// @notice functions to withdraw tokens from the set
  /// @param _tokenAddress(the address of the token) _amount(the amount of tokens that the user want to withdraw from the set)
  /// @dev following the check-effect-interactions paradigm:
  /// @dev it first checks if there are enough tokens in the set and if the token address corresponds with is position in the 
  /// @dev tokenInSet mapping, then modifies the sets and tokensInSet mappings to update the balances,
  /// @dev if the token balance is zero, it removes the token's address from tokensInSet
  /// @dev and lastly it sends the tokens from the contract to the user's account
  function withdrawalFromSet (address _tokenAddress, uint _amount,uint _position) public notLocked {
    ERC20 token;
    token = ERC20(_tokenAddress);
    require(sets[msg.sender][_tokenAddress] >= _amount,           
            "Not enough tokens in the set"
        );
    require(tokensInSet[msg.sender][_position] == _tokenAddress,"The position does not correspond with the address in the sets");
    sets[msg.sender][_tokenAddress] -= _amount;
    if (sets[msg.sender][_tokenAddress] == 0) {
      tokensInSet[msg.sender][_position] = tokensInSet[msg.sender][tokensInSet[msg.sender].length - 1];
      tokensInSet[msg.sender].pop();
    }
    token.transfer(msg.sender, _amount);
  }
  /// @notice it creates an order by simply locking the set
  function makeOrder() public notLocked {
    isLocked[msg.sender] = true;

  }
/// @notice it creates an offer to match another user's order
/// @param _order(order's address)
/// @dev it locks the set and then it pushes the offer address to the offers mapping
  function makeOffer(address _order) public notLocked {
    isLocked[msg.sender] = true;
    offers[_order].push(msg.sender);


  }
/// @notice it makes the swap between an order and an offer happen
/// @param _offer(the offer's position in the offers[][] array, it must be computed off chain)
/// @dev by using the check-effect-interactions paradigm: it first checks if the offer exists and the set is locked.
/// @dev Then it loops trought the tokensInSet and sets mappings of the offer's and the order's set, inside the loop two auxiliary arrays for each user
/// @dev are filled, after those arrays are filled, the sets mapping balances relative to the swap are deleted to be swapped. 
/// @dev Then the two auxiliary arrays are looped  to fill back the set's balances, swapping the tokens between the two participants.
/// @dev The effect part is done by the withdrawl function, that can be called after the swap takes place, since the sets are now unlocked.
/// @dev The offers[][] array is also deleted.

  function acceptOffer(uint _offer) public  locked {
    address orderAddress = msg.sender;
    require(isOffer(_offer),"This offer does not exist");
    address offerAddress = offers[orderAddress][_offer];
    require(isLocked[offerAddress],"The offer must be locked");
    uint size = tokensInSet[orderAddress].length;
    
    address[] memory helperTokenList1 = new address[](size);
    uint[] memory helperTokenBalances1 = new uint[](size);
    address[] memory helperTokenList2 = new address[](size);
    uint[] memory helperTokenBalances2 = new uint[](size);
  
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
    isLocked[offerAddress] = false;
    isLocked[orderAddress] = false;
    delete offers[msg.sender][_offer];
    //(sets[offers[msg.sender][_offer]],sets[msg.sender]) = (sets[msg.sender],sets[offers[msg.sender][_offer]]);

  }

  /// @notice This getter function purpose is to check if an offer exists
  /// @param _offer(the offer's number, it must be computed off-chain)
  /// @dev This getter function purpose is to check if an offer exists, it cheks the offers[][] array, if it is not the zero address
  /// @dev then it returns true
  /// @return It returns a boolean, that is true if the offer exists, and false otherwise.

  function isOffer(uint _offer) public view returns(bool) {
    if (offers[msg.sender][_offer] != address(0)) {
      return true;
    }
    else return false;
  }
}

  
