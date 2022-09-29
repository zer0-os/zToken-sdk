// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import {ProxyAdmin} from '@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol';
import {TransparentUpgradeableProxy} from '@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol';

import {ZeroToken} from './ZeroToken.sol';

contract ZeroTokenFactory {
  event NewZeroToken(
    address indexed proxyAdmin,
    address indexed zeroTokenProxy,
    address indexed zeroTokenImpl
  );
  event NewZeroTokenWithMint(
    address indexed proxyAdmin,
    address indexed zeroTokenProxy,
    address indexed zeroTokenImpl,
    address to,
    uint256 amount
  );

  function createZeroToken(string calldata name, string calldata symbol)
    external
    returns (ProxyAdmin, TransparentUpgradeableProxy)
  {
    (
      ProxyAdmin proxyAdmin,
      TransparentUpgradeableProxy zeroTokenProxy,
      ZeroToken zeroTokenImpl
    ) = _createZeroToken(name, symbol);
    _transferOwnership(
      proxyAdmin,
      ZeroToken(address(zeroTokenProxy)),
      zeroTokenImpl,
      msg.sender
    );

    emit NewZeroToken(
      address(proxyAdmin),
      address(zeroTokenProxy),
      address(zeroTokenImpl)
    );
    return (proxyAdmin, zeroTokenProxy);
  }

  function createZeroTokenWithMint(
    string calldata name,
    string calldata symbol,
    address to,
    uint256 amount
  ) external returns (ProxyAdmin, TransparentUpgradeableProxy) {
    (
      ProxyAdmin proxyAdmin,
      TransparentUpgradeableProxy zeroTokenProxy,
      ZeroToken zeroTokenImpl
    ) = _createZeroToken(name, symbol);

    ZeroToken zeroTokenProxyAs = ZeroToken(address(zeroTokenProxy));
    zeroTokenProxyAs.mint(to, amount);

    _transferOwnership(proxyAdmin, zeroTokenProxyAs, zeroTokenImpl, to);

    emit NewZeroTokenWithMint(
      address(proxyAdmin),
      address(zeroTokenProxy),
      address(zeroTokenImpl),
      to,
      amount
    );
    return (proxyAdmin, zeroTokenProxy);
  }

  function _createProxy(
    address _logic,
    address _admin,
    bytes memory _data
  ) internal returns (address payable) {
    return
      payable(
        address(
          new TransparentUpgradeableProxy{
            salt: keccak256(abi.encodePacked(block.number, _data))
          }(_logic, _admin, _data)
        )
      );
  }

  function _createZeroToken(string memory name, string calldata symbol)
    internal
    returns (
      ProxyAdmin proxyAdmin,
      TransparentUpgradeableProxy zeroTokenProxy,
      ZeroToken zeroTokenImpl
    )
  {
    proxyAdmin = new ProxyAdmin();

    zeroTokenImpl = new ZeroToken();

    zeroTokenProxy = TransparentUpgradeableProxy(
      _createProxy(
        address(zeroTokenImpl),
        address(proxyAdmin),
        abi.encodeWithSelector(ZeroToken.initialize.selector, name, symbol)
      )
    );
  }

  function _transferOwnership(
    ProxyAdmin proxyAdmin,
    ZeroToken zeroTokenProxy,
    ZeroToken zeroTokenImpl,
    address newOwner
  ) internal {
    proxyAdmin.transferOwnership(newOwner);
    zeroTokenProxy.transferOwnership(newOwner);
  }
}
