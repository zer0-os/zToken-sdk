import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers, network } from 'hardhat';

import {
  ProxyAdmin__factory,
  TransparentUpgradeableProxy__factory,
  ZeroToken__factory,
} from '../types';
import { ZeroTokenInterface } from '../types/ZeroToken';
import { verifyContract } from './shared/helpers';

async function main() {
  const signers = await ethers.getSigners();
  if (signers.length < 1) {
    throw new Error(`Not found deployer`);
  }

  const deployer: SignerWithAddress = signers[0];

  const tokenName = 'WILD',
    tokenSymbol = 'mWILD';

  if (
    network.name === 'goerli' ||
    network.name === 'rinkeby' ||
    network.name === 'mainnet' ||
    network.name === 'localhost'
  ) {
    const ZeroToken = new ZeroToken__factory(deployer);
    const zeroToken = await ZeroToken.deploy();
    await zeroToken.deployed();
    console.log('zeroToken.address', zeroToken.address);
    await verifyContract(zeroToken.address);

    const ProxyAdmin = new ProxyAdmin__factory(deployer);
    const proxyAdmin = await ProxyAdmin.deploy();
    await proxyAdmin.deployed();
    console.log('proxyAdmin.address', proxyAdmin.address);
    await verifyContract(proxyAdmin.address);

    const zeroTokenInterface: ZeroTokenInterface =
      ZeroToken__factory.createInterface();

    const TransparentUpgradeableProxy =
      new TransparentUpgradeableProxy__factory(deployer);
    const transparentUpgradeableProxy =
      await TransparentUpgradeableProxy.deploy(
        zeroToken.address,
        proxyAdmin.address,
        zeroTokenInterface.encodeFunctionData('initialize', [
          tokenName,
          tokenSymbol,
        ])
      );
    console.log(
      'transparentUpgradeableProxy.address',
      transparentUpgradeableProxy.address
    );
    await transparentUpgradeableProxy.deployed();

    console.log('upgrade');
    await proxyAdmin.upgrade(
      transparentUpgradeableProxy.address,
      zeroToken.address
    );
    console.log('changeProxyAdmin');
    await proxyAdmin.changeProxyAdmin(
      transparentUpgradeableProxy.address,
      deployer.address
    );

    // const zeroToken = {
    //   address: '0x8122BFbFA20a738e71eDAFb7aFA40f7fd71d55A9',
    // };
    // const proxyAdmin = {
    //   address: '0x6c3c12640eF725c691cD61e3dB39F45Bf70F8205',
    // };
    // const transparentUpgradeableProxy =
    //   TransparentUpgradeableProxy__factory.connect(
    //     '0x477556B45b9c9B4954776442a67BE743C6b18158',
    //     deployer
    //   );

    console.log(
      'proxydata',
      zeroTokenInterface.encodeFunctionData('initialize', [
        tokenName,
        tokenSymbol,
      ])
    );
    await verifyContract(transparentUpgradeableProxy.address, [
      zeroToken.address,
      proxyAdmin.address,
      zeroTokenInterface.encodeFunctionData('initialize', [
        tokenName,
        tokenSymbol,
      ]),
    ]);

    console.table([
      {
        Label: 'Deployer address',
        Info: deployer.address,
      },
      {
        Label: 'TransparentUpgradeableProxy address',
        Info: transparentUpgradeableProxy.address,
      },
      {
        Label: 'ProxyAdmin address',
        Info: proxyAdmin.address,
      },
      {
        Label: 'ZeroToken address',
        Info: zeroToken.address,
      },
    ]);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
