/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface ZeroTokenFactoryInterface extends utils.Interface {
  functions: {
    "createZeroToken(string,string)": FunctionFragment;
    "createZeroTokenWithMint(string,string,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "createZeroToken" | "createZeroTokenWithMint"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createZeroToken",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "createZeroTokenWithMint",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "createZeroToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createZeroTokenWithMint",
    data: BytesLike
  ): Result;

  events: {
    "NewZeroToken(address,address,address)": EventFragment;
    "NewZeroTokenWithMint(address,address,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewZeroToken"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewZeroTokenWithMint"): EventFragment;
}

export interface NewZeroTokenEventObject {
  proxyAdmin: string;
  zeroTokenProxy: string;
  zeroTokenImpl: string;
}
export type NewZeroTokenEvent = TypedEvent<
  [string, string, string],
  NewZeroTokenEventObject
>;

export type NewZeroTokenEventFilter = TypedEventFilter<NewZeroTokenEvent>;

export interface NewZeroTokenWithMintEventObject {
  proxyAdmin: string;
  zeroTokenProxy: string;
  zeroTokenImpl: string;
  to: string;
  amount: BigNumber;
}
export type NewZeroTokenWithMintEvent = TypedEvent<
  [string, string, string, string, BigNumber],
  NewZeroTokenWithMintEventObject
>;

export type NewZeroTokenWithMintEventFilter =
  TypedEventFilter<NewZeroTokenWithMintEvent>;

export interface ZeroTokenFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ZeroTokenFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createZeroToken(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createZeroTokenWithMint(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createZeroToken(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createZeroTokenWithMint(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createZeroToken(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string, string]>;

    createZeroTokenWithMint(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, string]>;
  };

  filters: {
    "NewZeroToken(address,address,address)"(
      proxyAdmin?: PromiseOrValue<string> | null,
      zeroTokenProxy?: PromiseOrValue<string> | null,
      zeroTokenImpl?: PromiseOrValue<string> | null
    ): NewZeroTokenEventFilter;
    NewZeroToken(
      proxyAdmin?: PromiseOrValue<string> | null,
      zeroTokenProxy?: PromiseOrValue<string> | null,
      zeroTokenImpl?: PromiseOrValue<string> | null
    ): NewZeroTokenEventFilter;

    "NewZeroTokenWithMint(address,address,address,address,uint256)"(
      proxyAdmin?: PromiseOrValue<string> | null,
      zeroTokenProxy?: PromiseOrValue<string> | null,
      zeroTokenImpl?: PromiseOrValue<string> | null,
      to?: null,
      amount?: null
    ): NewZeroTokenWithMintEventFilter;
    NewZeroTokenWithMint(
      proxyAdmin?: PromiseOrValue<string> | null,
      zeroTokenProxy?: PromiseOrValue<string> | null,
      zeroTokenImpl?: PromiseOrValue<string> | null,
      to?: null,
      amount?: null
    ): NewZeroTokenWithMintEventFilter;
  };

  estimateGas: {
    createZeroToken(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createZeroTokenWithMint(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createZeroToken(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createZeroTokenWithMint(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
