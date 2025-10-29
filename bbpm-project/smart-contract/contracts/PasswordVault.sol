// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PasswordVault {
    mapping(address => string) private vault;

    event PasswordUpdated(address user);

    function store(string calldata encryptedPassword) external {
        vault[msg.sender] = encryptedPassword;
        emit PasswordUpdated(msg.sender);
    }

    function get(address user) external view returns (string memory) {
        return vault[user];
    }
}
