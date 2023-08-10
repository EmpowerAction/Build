// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MiToken is ERC20 {
    constructor(uint256 supplyInicial) ERC20("Mi Token", "MTK") {
        _mint(msg.sender, supplyInicial * 10 ** decimals());
    }
}

