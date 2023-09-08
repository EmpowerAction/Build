// SPDX-License-Identifier: LGPL-3.0
/*
EmpowerAction - Copyright (C) 2023 Santiago Canepa | Sebastian Leandro | Victoria Quiroga
This project is licensed under the GNU Lesser General Public License, Version 3 (LGPL-3.0). See the file LICENSE.md for more details.
*/
pragma solidity >=0.4.22 <0.8.0;

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;

  modifier restricted() {
        require(
          msg.sender == owner,
          "This function is restricted to the contract's owner"
        );
        _;
  }

  function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
  }
}
