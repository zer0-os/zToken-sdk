type ethereumNetwork = 'goerli' | 'rinkeby' | 'mainnet';

interface EthereumConfig {
  ZeroTokenFactory: string;
}

const ethereumConfig: { [key in ethereumNetwork]: EthereumConfig } = {
  goerli: {
    ZeroTokenFactory: '0xd93CB22Cf5027634716F07d0Eb73A1540b7459Bd',
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
