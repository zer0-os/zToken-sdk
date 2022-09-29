type ethereumNetwork = 'goerli' | 'rinkeby' | 'mainnet';

interface EthereumConfig {
  ZeroTokenFactory: string;
}

const ethereumConfig: { [key in ethereumNetwork]: EthereumConfig } = {
  goerli: {
    ZeroTokenFactory: '0x5D62c81200B8106674eFfe07417af06e24B53b78',
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
