
// Ganache instance of contract
// const contractAddress = "0x8BA38a9cF5b943d46CB571833B1Ca2afC54aFCA6"


// Kovan instance of contract
const contractAddress = "0x9cDba3b5F5325c475618a7E4b00B1f715ebFE19F";
const faucetAddresses = ["0xc388fB1Af39587C605e4e5e66e87D28b1bBfdFe1",
  "0x7d003787Baa2cF5b6995899d5cb7F57bcF4E5a44",
  "0x10EF22b5D082ABB9997386BB567503Ed03c343A2",
  "0x327e1962fEcFf9e7768BF33A006F5671B29A57D4"];

// Ganache-deployed contract ABI
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getIsLocked",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getOffers",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_holder",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      }
    ],
    "name": "getSetTokenAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_holder",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenPosition",
        "type": "uint256"
      }
    ],
    "name": "getTokenInSetAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_holder",
        "type": "address"
      }
    ],
    "name": "getSetSize",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "depositIntoSet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_position",
        "type": "uint256"
      }
    ],
    "name": "withdrawalFromSet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "makeOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_order",
        "type": "address"
      }
    ],
    "name": "makeOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_offer",
        "type": "uint256"
      }
    ],
    "name": "acceptOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_offer",
        "type": "uint256"
      }
    ],
    "name": "isOffer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const tokenABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "MINTER_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "PAUSER_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burnFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getRoleMember",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleMemberCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Validate app is loading
console.log("Page loaded as expected.");

// Set core app variables and constants
var web3 = new Web3(window.ethereum);
const smartContractInstance = new web3.eth.Contract(contractABI, contractAddress);
smartContractInstance.setProvider(window.ethereum);

// 1. Detect whether MetaMask is or is not installed
window.addEventListener('load', function () {
  if (typeof window.ethereum !== 'undefined') {
    let mmDetected = document.getElementById('mm-detected');
    mmDetected.innerHTML = "MetaMask has been detected!";
  }

  else {
    console.log('No wallet available!');
    this.alert("You need to install MetaMask or another wallet");
  }

  // 2. Allow the user to get access to MetaMask / Connect to MetaMask
  const mmEnable = document.getElementById('mm-connect');

  mmEnable.onclick = async () => {
    await ethereum.request({ method: 'eth_requestAccounts' });

    const mmCurrentAccount = document.getElementById('mm-current-account');
    mmCurrentAccount.innerHTML = "Here's your current account: " + ethereum.selectedAddress;




  };

});

/*const ssSubmit = document.getElementById('ss-input-button');

ssSubmit.onclick = async () => {
    const ssValue = document.getElementById('ss-input-box').value;
    console.log(ssValue);

    const smartContractInstance = new web3.eth.Contract(contractABI, contractAddress);
    

    smartContractInstance.setProvider(window.ethereum);
	
	
    await smartContractInstance.methods.mint(ethereum.selectedAddress, ssValue)
      .send({from: ethereum.selectedAddress})
      .then(function(receipt){
      console.log(receipt)// receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      const txHash = document.getElementById("tx-hash")
        txHash.innerHTML = "<section><article><h4>Transaction Hash</h4><p><a href='https://kovan.etherscan.io/tx/" + receipt.transactionHash + "'>" + receipt.transactionHash + "</a>.</p></article></section>"
        // Transaction Hash: <a href='https://kovan.etherscan.io/tx/" + receipt.transactionHash + "'>" + receipt.transactionHash + "</a>."
      });
    // await smartContract.mint(accounts[0], uri);
        } */


const ssTokenFaucet = document.getElementById('ss-faucet-button');

ssTokenFaucet.onclick = async () => {

  let faucetInstances = [];

  for (i = 0; i < faucetAddresses.length; i++) {
    faucetInstances.push(new web3.eth.Contract(tokenABI, faucetAddresses[i]));
    faucetInstances[i].setProvider(window.ethereum);
    await faucetInstances[i].methods.mint(ethereum.selectedAddress, web3.utils.toBN(100 * 10 ** 18))
      .send({
        from: ethereum.selectedAddress, maxPriorityFeePerGas: null,
        maxFeePerGas: null
      });
    console.log(await faucetInstances[i].methods.balanceOf(ethereum.selectedAddress).call());
  }




}
let ssGetAddress = document.getElementById('ss-input-token-address-box').value;
let ssGetAmount = document.getElementById('ss-input-token-amount-box').value;
const ssApproveButton = document.getElementById('ss-input-approve-button');

ssApproveButton.onclick = async () => {
  const tokenInstance = new web3.eth.Contract(tokenABI, ssGetAddress);
  tokenInstance.setProvider(window.ethereum);
  maxUint = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
  await tokenInstance.methods.approve(smartContractInstance.options.address, web3.utils.toBN(maxUint))
    .send({ from: ethereum.selectedAddress });
  window.alert("tx successful");

}

const ssDepositButton = document.getElementById('ss-input-deposit-button');

ssDepositButton.onclick = async () => {
  await smartContractInstance.methods.depositIntoSet(ssGetAddress, web3.utils.toBN(ssGetAmount * 10 ** 18))
    .send({
      from: ethereum.selectedAddress, maxPriorityFeePerGas: null,
      maxFeePerGas: null
    });
  window.alert("tx successful");

}

const ssWithdrawButton = document.getElementById('ss-input-withdraw-button');

ssWithdrawButton.onclick = async () => {
  const position = await findPosition(ssGetAddress);
  console.log(position);
  if (position != -1) {
    await smartContractInstance.methods.withdrawalFromSet(ssGetAddress, web3.utils.toBN(ssGetAmount * 10 ** 18), position)
      .send({
        from: ethereum.selectedAddress, maxPriorityFeePerGas: null,
        maxFeePerGas: null
      });
  } else {
    console.log("token not in set");
  }
  window.alert("tx successful");


}

const findPosition = async (tokenAddress) => {
  const lastPosition = await smartContractInstance.methods.getSetSize(ethereum.selectedAddress).call();
  for (let position = 0; position < lastPosition; position++) {
    let addressInPosition = await smartContractInstance.methods.getTokenInSetAddress(ethereum.selectedAddress, position).call();
    console.log(addressInPosition);
    if (addressInPosition == tokenAddress) {
      return position
    }
  }
  return -1;
}

const ssOfferButton = document.getElementById('ss-input-offer-button');

ssOfferButton.onclick = async () => {

  await smartContractInstance.methods.makeOrder()
    .send({
      from: ethereum.selectedAddress, maxPriorityFeePerGas: null,
      maxFeePerGas: null
    });
  window.alert("tx successful");

}

const ssGetOfferAddress = document.getElementById('ss-input-offer-address-box').value;
const ssOrderButton = document.getElementById('ss-input-order-button');

ssOrderButton.onclick = async () => {

  await smartContractInstance.methods.makeOffer(ssGetOfferAddress)
    .send({
      from: ethereum.selectedAddress, maxPriorityFeePerGas: null,
      maxFeePerGas: null
    });
  window.alert("tx successful");

}

const ssGetSwapAddress = document.getElementById('ss-input-swap-address-box').value;
const ssSwapButton = document.getElementById('ss-input-swap-button');

ssSwapButton.onclick = async () => {

  await smartContractInstance.methods.acceptOffer(ssGetSwapAddress)
    .send({
      from: ethereum.selectedAddress, maxPriorityFeePerGas: null,
      maxFeePerGas: null
    });
  window.alert("tx successful");

}

window.addEventListener('click', async function () {
  const tokenList = document.getElementById('token-list');
  const setSize = await smartContractInstance.methods.getSetSize(ethereum.selectedAddress).call();
  console.log(ssGetAddress);
  if (setSize != 0) {
    tokenList.innerHTML = "";
    for (let position = 0; position < setSize; position++) {
      let tokenAddr = await smartContractInstance.methods.getTokenInSetAddress(ethereum.selectedAddress, position).call();
      let tokenAmount = await smartContractInstance.methods.getSetTokenAmount(ethereum.selectedAddress, tokenAddr).call();
      console.log(tokenAddr);
      tokenList.innerHTML += "Address: " + tokenAddr + " <div></div>Amount: " + (tokenAmount / 10 ** 18) + "<div></div>";
    }
  }

});
