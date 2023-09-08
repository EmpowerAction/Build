// SPDX-License-Identifier: LGPL-3.0
/*
EmpowerAction - Copyright (C) 2023 Santiago Canepa | Sebastian Leandro | Victoria Quiroga
This project is licensed under the GNU Lesser General Public License, Version 3 (LGPL-3.0). See the file LICENSE.md for more details.
*/
pragma solidity >=0.6.0;

import "./ProtocolSettings.sol";

abstract contract Proposal {

    function getName() public virtual returns (string memory);

    function execute(ProtocolSettings _settings) public virtual;
}