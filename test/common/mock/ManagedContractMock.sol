// SPDX-License-Identifier: LGPL-3.0
/*
EmpowerAction - Copyright (C) 2023 Santiago Canepa | Sebastian Leandro | Victoria Quiroga
This project is licensed under the GNU Lesser General Public License, Version 3 (LGPL-3.0). See the file LICENSE.md for more details.
*/

pragma solidity >=0.6.0;

import "../../../contracts/deployment/Deployer.sol";
import "../../../contracts/deployment/ManagedContract.sol";

contract ManagedContractMock is ManagedContract {
    
    bool initialized;
    
    function initialize(Deployer deployer) override internal {

        require(address(deployer) != address(0), "invalid deployer variable");
        require(deployer.getContractAddress("ManagedContract") == address(this), "invalid contract address");
        initialized = true;
    }

    function getInitialized() public view returns(bool) {

        return initialized;
    }
}