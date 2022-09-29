import { ethers } from 'ethers';

import ERC1967ProxyAbi from './config/abi/ERC1967Proxy.json';
import ZeroTokenAbi from './config/abi/ZeroToken.json';
import { TokenMintOptions } from './types';
import { errorMessageForError } from './utilities';

export const createZToken = async (
  signer: ethers.Signer,
  name: string,
  symbol: string,
  options?: TokenMintOptions
): Promise<string> => {
  try {
    // create implementation of zToken
    const zTokenFactory = new ethers.ContractFactory(
      ZeroTokenAbi.abi,
      ZeroTokenAbi.bytecode,
      signer
    );
    const zTokenImplementation = await zTokenFactory.deploy();
    await zTokenImplementation.deployed();

    // create ERC1967 proxy contract
    const zTokenInterface = new ethers.utils.Interface(ZeroTokenAbi.abi);
    const proxyData = zTokenInterface.encodeFunctionData('initialize', [
      name,
      symbol,
    ]);

    const proxyFactory = new ethers.ContractFactory(
      ERC1967ProxyAbi.abi,
      ERC1967ProxyAbi.bytecode,
      signer
    );

    const proxyContract = await proxyFactory.deploy(
      zTokenImplementation.address,
      proxyData
    );
    await proxyContract.deployed();

    if (options) {
      const contract = new ethers.Contract(
        proxyContract.address,
        ZeroTokenAbi.abi,
        signer.provider
      );

      // mint tokens
      await contract.connect(signer).mint(options.target, options.amount);
    }

    return proxyContract.address;
  } catch (error) {
    console.error(error);
    throw new Error(errorMessageForError('failed-create-token'));
  }
};
