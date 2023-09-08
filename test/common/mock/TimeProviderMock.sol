// SPDX-License-Identifier: LGPL-3.0
/*
EmpowerAction - Copyright (C) 2023 Santiago Canepa | Sebastian Leandro | Victoria Quiroga
This project is licensed under the GNU Lesser General Public License, Version 3 (LGPL-3.0). See the file LICENSE.md for more details.
*/
pragma solidity >=0.6.0;

import "../../../contracts/deployment/ManagedContract.sol";
import "../../../contracts/interfaces/TimeProvider.sol";

contract TimeProviderMock is ManagedContract, TimeProvider {
    
    uint offset = 0;
    int fixedTime = -1;
    
    function getNow() override external view returns (uint) {

        return fixedTime >= 0 ? uint(fixedTime) : block.timestamp + offset;
    }
    
    function setTimeOffset(uint _offset) public {

        offset = _offset;
        fixedTime = -1;
    }

    function setFixedTime(int _fixedTime) public {
        
        fixedTime = _fixedTime;
    }
}