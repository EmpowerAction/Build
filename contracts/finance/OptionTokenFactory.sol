// SPDX-License-Identifier: LGPL-3.0
/*
EmpowerAction - Copyright (C) 2023 Santiago Canepa | Sebastian Leandro | Victoria Quiroga
This project is licensed under the GNU Lesser General Public License, Version 3 (LGPL-3.0). See the file LICENSE.md for more details.
*/
pragma solidity >=0.6.0;

import "../deployment/Deployer.sol";
import "../deployment/ManagedContract.sol";
import "../interfaces/UnderlyingFeed.sol";
import "./OptionToken.sol";

contract OptionTokenFactory is ManagedContract {

    function initialize(Deployer deployer) override internal {

    }

    function create(string calldata symbol, address udlFeed) external returns (address) {

        bytes memory sb1 = bytes(UnderlyingFeed(udlFeed).symbol());
        bytes memory sb2 = bytes(symbol);
        for (uint i = 0; i < sb1.length; i++) {
            if (sb1[i] != sb2[i]) {
                revert("invalid feed");
            }
        }
        return address(new OptionToken(symbol, msg.sender));
    }
}