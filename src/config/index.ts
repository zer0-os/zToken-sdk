export * from './types';

export enum SupportedChainId {
  MAINNET = 1,
  // ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
}

export interface TokenMintOptions {
  target: string; // target address to mint for
  amount: string; // mint amount (as big number)
}

export interface DeployedZeroToken {
  proxyAdmin: string;
  zeroTokenProxy: string;
}

type AddressMap = { [chainId in SupportedChainId]: string };
export const ZeroTokenFactoryAddresses: AddressMap = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: '',
  [SupportedChainId.GOERLI]: '0x3645851eAd920A660ec7635cb1768d9B30e5Aa1D',
};
