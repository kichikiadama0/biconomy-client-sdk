import { ContractTransaction } from '@ethersproject/contracts'
import { PromiEvent, TransactionReceipt } from 'web3-core/types'

export type SmartAccountVersion = '1.3.0' | '1.2.0' | '1.1.1'

export enum OperationType {
  Call, // 0
  DelegateCall // 1
}

// Temp
export interface SmartAccountContext {
  entryPointAddress: string,
  fallbackHandlerAddress: string,
  // multiSendAddress: string,
  // multiSendObnlyCallAddress: string,
}

export interface MetaTransactionData {
  readonly to: string
  readonly value: string
  readonly data: string
  readonly operation?: OperationType
}

export interface SmartAccountTrxData extends MetaTransactionData {
  readonly operation: OperationType
  readonly SmartAccountTxGas: number
  readonly baseGas: number
  readonly gasPrice: number
  readonly gasToken: string
  readonly refundReceiver: string
  readonly nonce: number
}

export interface SmartAccountTrxDataPartial extends MetaTransactionData {
  readonly SmartAccountTxGas?: number
  readonly baseGas?: number
  readonly gasPrice?: number
  readonly gasToken?: string
  readonly refundReceiver?: string
  readonly nonce?: number
}

export interface Signature {
  readonly signer: string
  readonly data: string
  staticPart(): string
  dynamicPart(): string
}

export interface SmartAccountTrx {
  readonly data: Transaction
  readonly signatures: Map<string, Signature>
  addSignature(signature: Signature): void
  encodedSignatures(): string
}

export interface Transaction {
  readonly to: string
  readonly value: string
  readonly data: string
  readonly operation: OperationType
  readonly safeTxGas: number
}

export interface FeeRefundData {
  readonly baseGas: number
  readonly gasPrice: number
  readonly gasToken: string
  readonly refundReceiver: string
}

export interface TransactionOptions {
  from?: string
  gas?: number | string
  gasLimit?: number | string
  gasPrice?: number | string
}

export interface BaseTransactionResult {
  hash: string
}

export interface TransactionResult extends BaseTransactionResult {
  promiEvent?: PromiEvent<TransactionReceipt>
  transactionResponse?: ContractTransaction
  options?: TransactionOptions
}

export interface Eip3770Address {
  prefix: string
  address: string
}

export interface UserOperation {
  sender: string
  nonce: number
  initCode: string
  callData: string
  callGas: number
  verificationGas: number
  preVerificationGas: number
  maxFeePerGas: number
  maxPriorityFeePerGas: number
  paymaster: string
  paymasterData: string
  signature: string
}
