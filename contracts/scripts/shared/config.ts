type ethereumNetwork = 'goerli' | 'mainnet';

interface EthereumConfig {
  ZeroTokenFactory: string;
}

const ethereumConfig: { [key in ethereumNetwork]: EthereumConfig } = {
  goerli: {
    ZeroTokenFactory: '',
  },
  mainnet: {
    ZeroTokenFactory: '',
  },
};

export const config = {
  ...ethereumConfig,
};
