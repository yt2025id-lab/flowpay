import { Address, Hex } from 'viem';

export type SubscriptionCategory = 'subscription' | 'salary' | 'dca' | 'donation' | 'savings';

export type PaymentType = 'periodic' | 'stream';

export interface Subscription {
  id: string;
  name: string;
  description?: string;
  category: SubscriptionCategory;
  recipient: Address;
  tokenAddress: Address;
  paymentType: PaymentType;
  // For periodic payments
  periodAmount?: bigint;
  periodDuration?: number; // in seconds
  // For streaming payments
  amountPerSecond?: bigint;
  initialAmount?: bigint;
  maxAmount?: bigint;
  // Common fields
  startTime: number;
  expiry: number;
  createdAt: number;
  status: 'active' | 'paused' | 'expired' | 'cancelled';
  permissionContext?: Hex;
  totalPaid?: bigint;
  lastPayment?: number;
}

export interface CreateSubscriptionParams {
  name: string;
  description?: string;
  category: SubscriptionCategory;
  recipient: Address;
  tokenAddress: Address;
  paymentType: PaymentType;
  // For periodic
  periodAmount?: string; // Human readable amount
  periodDuration?: number;
  // For stream
  amountPerSecond?: string;
  initialAmount?: string;
  maxAmount?: string;
  // Duration
  durationDays: number;
}

export interface PermissionGrant {
  chainId: number;
  expiry: number;
  signer: {
    type: 'account';
    data: {
      address: Address;
    };
  };
  permission: PeriodicPermission | StreamPermission;
  isAdjustmentAllowed: boolean;
}

export interface PeriodicPermission {
  type: 'erc20-token-periodic';
  data: {
    tokenAddress: Address;
    periodAmount: bigint;
    periodDuration: number;
    justification?: string;
  };
}

export interface StreamPermission {
  type: 'erc20-token-stream';
  data: {
    tokenAddress: Address;
    amountPerSecond: bigint;
    initialAmount: bigint;
    maxAmount: bigint;
    startTime: number;
    justification?: string;
  };
}

export interface SessionAccount {
  address: Address;
  privateKey: Hex;
  createdAt: number;
}

export interface WalletState {
  isConnected: boolean;
  address?: Address;
  chainId?: number;
  isMetaMaskFlask: boolean;
  sessionAccount?: SessionAccount;
}

export interface GrantedPermission {
  context: Hex;
  expiry: number;
  permissions: PermissionGrant[];
}
