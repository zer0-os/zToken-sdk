import { Log } from '@ethersproject/abstract-provider';
import { ContractReceipt, ContractTransaction, ethers } from 'ethers';

import {
  DeployedZeroToken,
  SupportedChainId,
  TokenMintOptions,
  ZeroTokenFactory__factory,
  ZeroTokenFactoryAddresses,
} from './config';

export const createZToken = async (
  signer: ethers.Signer,
  name: string,
  symbol: string,
  options?: TokenMintOptions
): Promise<DeployedZeroToken> => {
  try {
    const chainId = await signer.getChainId();

    const ZeroTokenFactory = ZeroTokenFactory__factory.connect(
      ZeroTokenFactoryAddresses[chainId as SupportedChainId],
      signer
    );

    let tx: ContractTransaction;
    if (options) {
      tx = await ZeroTokenFactory.createZeroTokenWithMint(
        name,
        symbol,
        options.target,
        options.amount
      );
    } else {
      tx = await ZeroTokenFactory.createZeroToken(name, symbol);
    }
    const receipt: ContractReceipt = await tx.wait();

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
        const proxyAdmin = parsed.args.proxyAdmin;
        const zeroTokenProxy = parsed.args.zeroTokenProxy;

        return {
          proxyAdmin,
          zeroTokenProxy,
        };
      })
      .filter((value) => value !== null);
    if (addresses.length < 1) {
      throw new Error("What's happening, Not found deployed addresses");
    }

    return addresses[0]!;
  } catch (error: any) {
    throw new Error(`Failed to create token: ${error.message}`);
  }
};
