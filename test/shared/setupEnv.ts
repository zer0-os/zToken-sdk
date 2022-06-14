import * as dotenv from 'dotenv';

import { SupportedChainId } from '../../src/types';

dotenv.config();

interface Env {
  rpcUrl: string;
  network: SupportedChainId;
}

export const setEnv = (isDev = true): Env => {
  return isDev
    ? {
        rpcUrl: process.env.RINKEBY_RPC_URL!,
        network: SupportedChainId.RINKEBY,
      }
    : {
        rpcUrl: process.env.MAINNET_RPC_URL!,
        network: SupportedChainId.MAINNET,
      };
};
