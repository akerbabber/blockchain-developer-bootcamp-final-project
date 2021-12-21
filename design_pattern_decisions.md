# Design patterns used


## Inheritance and Interfaces
- The `YetAnotherOTC` makes use of the openzeppelin token implementation. **Libraries in use**: ERC20PresetMinterPauser by openzeppelin.

## Inter-Contract Execution
- The `YetAnotherOTC` contract calls the transfer function of a standard ERC20 contract in order to receive a previously approved tokens.