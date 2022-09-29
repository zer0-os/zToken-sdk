import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers, network } from 'hardhat';

import { verifyContract } from './shared/helpers';

async function main() {
  const signers = await ethers.getSigners();
  if (signers.length < 1) {
    throw new Error(`Not found deployer`);
  }

  const deployer: SignerWithAddress = signers[0];

  if (
    network.name === 'goerli' ||
    network.name === 'rinkeby' ||
    network.name === 'mainnet' ||
    network.name === 'localhost'
  ) {
    // ZeroTokenFactory
    console.log('Deploying ZeroTokenFactory proxy contract...');
    const ZeroTokenFactory = await ethers.getContractFactory(
      'ZeroTokenFactory'
    );
    const zeroTokenFactory = await ZeroTokenFactory.deploy();
    await zeroTokenFactory.deployed();
    console.log(`\ndeployed: ${zeroTokenFactory.address}`);
    await verifyContract(zeroTokenFactory.address);

    console.table([
      {
        Label: 'Deployer address',
        Info: deployer.address,
      },
      {
        Label: 'ZeroTokenFactory address',
        Info: zeroTokenFactory.address,
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
