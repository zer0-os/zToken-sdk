type ethereumNetwork = 'goerli' | 'rinkeby' | 'mainnet';

interface EthereumConfig {
  ZeroTokenFactory: string;
}

const ethereumConfig: { [key in ethereumNetwork]: EthereumConfig } = {
  goerli: {
    ZeroTokenFactory: '0xe5BC17Db023c454E9A58C0292185C227d308FE4E',
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
