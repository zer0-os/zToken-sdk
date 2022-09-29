import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers, network, upgrades } from 'hardhat';

import { ZeroToken } from '../types';
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
    // ZDAORegistry
    console.log('Deploying ZeroToken proxy contract...');
    const ZeroTokenFactory = await ethers.getContractFactory('ZeroToken');
    const zeroToken = (await upgrades.deployProxy(
      ZeroTokenFactory,
      [tokenName, tokenSymbol],
      {
        kind: 'transparent',
        initializer: 'initialize',
      }
    )) as ZeroToken;
    await zeroToken.deployed();
    console.log(`\ndeployed: ${zeroToken.address}`);

    const zeroTokenImpl = await upgrades.erc1967.getImplementationAddress(
      zeroToken.address
    );
    await verifyContract(zeroTokenImpl);

    console.table([
      {
        Label: 'Deployer address',
        Info: deployer.address,
      },
      {
        Label: 'Proxy address',
        Info: zeroToken.address,
      },
      {
        Label: 'ZeroToken address',
        Info: zeroTokenImpl,
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
