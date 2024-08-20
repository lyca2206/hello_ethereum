let { Web3 } = require('web3');
let solc = require('solc');
let fs = require('fs');
require('dotenv').config()

// connect to the Ganache node
let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

// read Solidity source code
let sourceCode = fs.readFileSync('Hello.sol', 'utf-8').toString()

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
let compiled = solc.compile(JSON.stringify(compilerInput))
let compilerOutput = JSON.parse(compiled)

// extract ABI and EVM bytecode from output
let abi = compilerOutput.contracts.contract.Hello.abi
let bytecode = compilerOutput.contracts.contract.Hello.evm.bytecode.object

// prepare Contract wrapper and "deploy" transaction, estimate cost for deployment
let contract = new web3.eth.Contract(abi);
let deployTransaction = contract.deploy({data: bytecode});
deployTransaction.estimateGas(function(err, gas){
    console.log("Estimated gas for deployment: " + gas);
});

// deploy from the given account, using up to the given gas amount
// print transaction hash and new contract instance address
deployTransaction.send({from: process.env.DEPLOYER_ADDRESS, gas: 1000000})
.on('error', function(error){
    console.log("Error: " + error);
})
.on('transactionHash', function(transactionHash){
    console.log("Deployment Transaction Hash: " + transactionHash)
})
.on('receipt', function(receipt){
   console.log("New contract address: " + receipt.contractAddress)
});