type ethereumNetwork = 'goerli' | 'rinkeby' | 'mainnet';

interface EthereumConfig {
  ZeroTokenFactory: string;
}

const ethereumConfig: { [key in ethereumNetwork]: EthereumConfig } = {
  goerli: {
    ZeroTokenFactory: '0x3645851eAd920A660ec7635cb1768d9B30e5Aa1D',
  },
  rinkeby: {
    ZeroTokenFactory: '',
  },
  mainnet: {
    ZeroTokenFactory: '',
  },
};

export const config = {
  ...ethereumConfig,
};
