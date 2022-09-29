import { Log } from '@ethersproject/abstract-provider';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers, network, upgrades } from 'hardhat';

import {
  ZeroToken__factory,
  ZeroTokenFactory,
  ZeroTokenFactory__factory,
} from '../types';
import { config } from './shared/config';
import { verifyContract } from './shared/helpers';

interface DeployedZeroToken {
  proxyAdmin: string;
  zeroTokenProxy: string;
}

async function main() {
  const signers = await ethers.getSigners();
  if (signers.length < 1) {
    throw new Error(`Not found deployer`);
  }

  const deployer: SignerWithAddress = signers[0];

  const tokenName = 'WILD2',
    tokenSymbol = 'mWILD2';

  if (
    network.name === 'goerli' ||
    network.name === 'rinkeby' ||
    network.name === 'mainnet' ||
    network.name === 'localhost'
  ) {
    // ZeroTokenFactory
    const zeroTokenFactory = (await ethers.getContractAt(
      'ZeroTokenFactory',
      config[network.name].ZeroTokenFactory,
      deployer
    )) as ZeroTokenFactory;

    const tx = await zeroTokenFactory.createZeroToken(tokenName, tokenSymbol);
    const receipt = await tx.wait();

    const NewZeroTokenTopic = ethers.utils.id(
      'NewZeroToken(address,address,address)'
    );
    const NewZeroTokenWithMintTopic = ethers.utils.id(
      'NewZeroTokenWithMint(address,address,address,address,uint256)'
    );

    const addresses = receipt.logs
      .map((log: Log): DeployedZeroToken | null => {
        if (
          log.topics[0] !== NewZeroTokenTopic &&
          log.topics[0] != NewZeroTokenWithMintTopic
        )
          return null;

        const abiInterface = ZeroTokenFactory__factory.createInterface();
        const parsed = abiInterface.parseLog(log);
        console.log('parsed', parsed.args);
        const proxyAdmin = parsed.args.proxyAdmin;
        const zeroTokenProxy = parsed.args.zeroTokenProxy;

        return {
          proxyAdmin,
          zeroTokenProxy,
        };
      })
      .filter((value) => value !== null);
    if (receipt.logs.length < 1) {
      throw new Error("What's happening, Events didn't emit yet");
    }

    const addressSet = addresses[0]!;
    console.log('Deployed addresses', addressSet);

    console.log('Verifying ProxyAdmin...');
    await verifyContract(addressSet.proxyAdmin);

    const zeroTokenImpl = await upgrades.erc1967.getImplementationAddress(
      addressSet.zeroTokenProxy
    );
    console.log('Verifying ZeroToken Implementation...');
    await verifyContract(zeroTokenImpl);

    const zeroTokenInterface = ZeroToken__factory.createInterface();

    const proxyData = zeroTokenInterface.encodeFunctionData('initialize', [
      tokenName,
      tokenSymbol,
    ]);
    console.log('proxyData', proxyData);

    console.log('Verifying ZeroToken Proxy...');
    await verifyContract(addressSet.zeroTokenProxy, [
      zeroTokenImpl,
      addressSet.proxyAdmin,
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
        Label: 'ProxyAdmin address',
        Info: addressSet.proxyAdmin,
      },
      {
        Label: 'NewToken Proxy address',
        Info: addressSet.zeroTokenProxy,
      },
      {
        Label: 'NewToken Implementation address',
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
