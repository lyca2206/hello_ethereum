Hello Ethereum
--------------

A 'Hello world' smart contract, referenced by a [blog post in Stelios Gerogiannakis's personal blog](https://sgerogia.github.io/Hello-world-Ganache).

Prerequisite NPM packages:  
* `solc@^0.8.6`
* `web3@^4.11.1`

Install them by using the `npm install` command.

# Usage
First, run Ganache. You can download it [here](https://archive.trufflesuite.com/ganache/).

To deploy a new contract instance:
* Replace the DEPLOYER_ADDRESS placeholder in `.env`.
* `node deploy.js`

To interact with the contract instance:
* Replace the USER_ADDRESS and CONTRACT_ADDRESS placeholders in `.env`.
* `node interact.js`