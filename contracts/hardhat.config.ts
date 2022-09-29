import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config({ path: __dirname + '/.env' });

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.3',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
  },
  networks: {
    goerli: {
      accounts: [`0x${process.env.TESTNET_PRIVATE_KEY}`],
      url: 'https://goerli.infura.io/v3/97e75e0bbc6a4419a5dd7fe4a518b917',
    },
    rinkeby: {
      accounts: [`0x${process.env.TESTNET_PRIVATE_KEY}`],
      url: 'https://eth-rinkeby.alchemyapi.io/v2/l1u0wuvuvoqtYye4fFuY9C3NGZFKWhXC',
    },
  },
  etherscan: {
    apiKey: 'FZ1ANB251FC8ISFDXFGFCUDCANSJNWPF9Q',
  },
};

export default config;
