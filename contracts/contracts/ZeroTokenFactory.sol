// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import {createProxy} from './helpers/Proxy.sol';
import {ProxyAdmin} from './oz/proxy/transparent/ProxyAdmin.sol';
import {ZeroToken} from './ZeroToken.sol';

contract ZeroTokenFactory {
  function createZeroToken(string calldata name, string calldata symbol)
    external
    returns (ProxyAdmin, ZeroToken)
  {
    (ProxyAdmin proxyAdmin, ZeroToken zeroToken) = _createZeroToken(
      name,
      symbol
    );
    _transferOwnership(proxyAdmin, zeroToken, msg.sender);
    return (proxyAdmin, zeroToken);
  }

  function createZeroTokenWithMint(
    string calldata name,
    string calldata symbol,
    address to,
    uint256 amount
  ) external returns (ProxyAdmin, ZeroToken) {
    (ProxyAdmin proxyAdmin, ZeroToken zeroToken) = _createZeroToken(
      name,
      symbol
    );
    zeroToken.mint(to, amount);
    _transferOwnership(proxyAdmin, zeroToken, msg.sender);
    return (proxyAdmin, zeroToken);
  }

  function _createZeroToken(string memory name, string calldata symbol)
    internal
    returns (ProxyAdmin proxyAdmin, ZeroToken zeroTokenProxy)
  {
    proxyAdmin = new ProxyAdmin();

    zeroTokenProxy = ZeroToken(
      createProxy(
        address(new ZeroToken()),
        address(proxyAdmin),
        abi.encodeWithSelector(ZeroToken.initialize.selector, name, symbol)
      )
    );
  }

  function _transferOwnership(
    ProxyAdmin proxyAdmin,
    ZeroToken zeroToken,
    address newOwner
  ) internal {
    proxyAdmin.transferOwnership(newOwner);
    zeroToken.transferOwnership(newOwner);
  }
}
