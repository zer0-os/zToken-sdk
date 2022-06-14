import { BigNumber, ethers } from 'ethers';

import { createZToken } from '../../src';
import { setEnv } from '../shared/setupEnv';

(global as any).XMLHttpRequest = require('xhr2');

const main = async () => {
  const isDev = true;
  const env = setEnv(isDev);

  const provider = new ethers.providers.JsonRpcProvider(
    env.rpcUrl,
    env.network
  );
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const token = await createZToken(signer, 'zSample', 'ZSAMPLE', {
    target: '0x22C38E74B8C0D1AAB147550BcFfcC8AC544E0D8C',
    amount: BigNumber.from(10).pow(18).mul(10000).toString(),
  });
  console.log('new token', token);
};

main()
  .then(() => console.log('main then'))
  .catch((error) => console.log('main catch', error));
