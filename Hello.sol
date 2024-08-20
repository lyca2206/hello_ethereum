// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Hello {
    string message;

    constructor() {
        message = "Hello, World!";
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory _message) public {
        message = _message;
    }
}