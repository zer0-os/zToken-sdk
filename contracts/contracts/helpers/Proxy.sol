// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {TransparentUpgradeableProxy} from '../oz/proxy/transparent/TransparentUpgradeableProxy.sol';

function createProxy(
  address _logic,
  address _admin,
  bytes memory _data
) returns (address payable) {
  return
    payable(
      address(
        new TransparentUpgradeableProxy{
          salt: keccak256(abi.encodePacked(block.number, _data))
        }(_logic, _admin, _data)
      )
    );
}
