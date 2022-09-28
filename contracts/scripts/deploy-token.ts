import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers, network } from 'hardhat';

import { ZeroTokenFactory } from '../types';
import { config } from './shared/config';
import { verifyContract } from './shared/helpers';

async function main() {
  const signers = await ethers.getSigners();
  if (signers.length < 1) {
    throw new Error(`Not found deployer`);
  }

  const deployer: SignerWithAddress = signers[0];

  if (network.name === 'goerli' || network.name === 'mainnet') {
    // ZeroTokenFactory
    const zeroTokenFactory = (await ethers.getContractAt(
      'ZeroTokenFactory',
      config[network.name].ZeroTokenFactory,
      deployer
    )) as ZeroTokenFactory;

    const [proxyAdmin, newToken] = (await zeroTokenFactory.createZeroToken(
      'WILD',
      'mWILD'
    )) as any;

    await verifyContract(proxyAdmin);

    console.table([
      {
        Label: 'Deployer address',
        Info: deployer.address,
      },
      {
        Label: 'ProxyAdmin address',
        Info: proxyAdmin,
      },
      {
        Label: 'New Token address',
        Info: newToken,
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
