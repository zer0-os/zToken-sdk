import * as dotenv from 'dotenv';
import * as env from 'env-var';
import { BigNumber, ethers } from 'ethers';

import { createZToken } from '../../src';
import { SupportedChainId } from '../../src/config';

dotenv.config();

const networkConfig = {
  [SupportedChainId.GOERLI]: {
    rpcUrl: env.get('GOERLI_RPC_URL').required().asString(),
    network: SupportedChainId.GOERLI,
    privateKey: env.get('PRIVATE_KEY').required().asString(),
  },
  [SupportedChainId.RINKEBY]: {
    rpcUrl: env.get('RINKEBY_RPC_URL').required().asString(),
    network: SupportedChainId.RINKEBY,
    privateKey: env.get('PRIVATE_KEY').required().asString(),
  },
};

const tokenConfig = {
  name: 'WILD',
  symbol: 'mWILD',
  target: '0x22C38E74B8C0D1AAB147550BcFfcC8AC544E0D8C',
  amount: BigNumber.from(10).pow(18).mul(10000).toString(),
};

const main = async () => {
  const network = SupportedChainId.GOERLI;

  const provider = new ethers.providers.JsonRpcProvider(
    networkConfig[network].rpcUrl,
    networkConfig[network].network
  );
  const signer = new ethers.Wallet(networkConfig[network].privateKey, provider);

  const addresses = await createZToken(
    signer,
    tokenConfig.name,
    tokenConfig.symbol,
    {
      target: tokenConfig.target,
      amount: tokenConfig.amount,
    }
  );
  console.log('Deployed addresses', addresses);
};

main()
  .then(() => console.log('main then'))
  .catch((error) => console.log('main catch', error));
