let { Web3 } = require('web3');
let solc = require('solc');
let fs = require('fs');
require('dotenv').config()

// connect to the Ganache node
let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

// read Solidity source code
let sourceCode = fs.readFileSync('Hello.sol', 'utf-8').toString();

// prepare compiler input JSON
let compilerInput = {
  language: 'Solidity',
  sources: {
    contract: {
      content: sourceCode
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

// compile and get output JSON
let compiled = solc.compile(JSON.stringify(compilerInput));
let compilerOutput = JSON.parse(compiled);

// extract ABI from output
let abi = compilerOutput.contracts.contract.Hello.abi;

// create Hello contract instance
let contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

// call the getter
contract.methods.getMessage().call().then( function(result) {
    console.log("Current contract message: " + result);
});

// estimate gas and update the message
let newMessage = "Hello, " + Math.floor(Math.random() * 1000) + '!';
contract.methods.setMessage(newMessage).estimateGas( function(error, gasAmount){
    console.log('Estimated gas for call:' + gasAmount);
});
contract.methods.setMessage(newMessage).send({from: process.env.USER_ADDRESS})
.on('error', function(error) {
    console.log("Error: " + error);
})
.on('transactionHash', function(hash){
    console.log("Transaction hash: " + hash);
})
.on('receipt', function(receipt){
    console.log("Updated message.");

    // call the getter again
    contract.methods.getMessage().call().then( function(result) {
        console.log("New contract message: " + result);
    });
})
