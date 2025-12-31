import { createWalletClient, custom, parseUnits, Address, Hex } from 'viem';
import { sepolia } from 'viem/chains';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { SessionAccount, CreateSubscriptionParams, PermissionGrant } from '@/types';
import { USDC_ADDRESS, USDC_DECIMALS, DEFAULT_CHAIN } from '@/config/constants';

// Check if MetaMask is available
export const isMetaMaskAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

// Check if MetaMask Flask (supports ERC-7715)
export const checkIsMetaMaskFlask = async (): Promise<boolean> => {
  if (!isMetaMaskAvailable()) return false;

  try {
    const clientVersion = await window.ethereum?.request({
      method: 'web3_clientVersion',
    });
    return typeof clientVersion === 'string' && clientVersion.includes('flask');
  } catch {
    return false;
  }
};

// Connect wallet
export const connectWallet = async (): Promise<{ address: Address; chainId: number }> => {
  if (!isMetaMaskAvailable()) {
    throw new Error('MetaMask is not installed');
  }

  const accounts = await window.ethereum!.request({
    method: 'eth_requestAccounts',
  }) as Address[];

  const chainId = await window.ethereum!.request({
    method: 'eth_chainId',
  }) as string;

  return {
    address: accounts[0],
    chainId: parseInt(chainId, 16),
  };
};

// Switch to Sepolia
export const switchToSepolia = async (): Promise<void> => {
  if (!isMetaMaskAvailable()) return;

  try {
    await window.ethereum!.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xaa36a7' }], // Sepolia chainId
    });
  } catch (error: unknown) {
    // If chain doesn't exist, add it
    if (error && typeof error === 'object' && 'code' in error && error.code === 4902) {
      await window.ethereum!.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0xaa36a7',
            chainName: 'Sepolia',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: ['https://sepolia.infura.io/v3/'],
            blockExplorerUrls: ['https://sepolia.etherscan.io'],
          },
        ],
      });
    }
  }
};

// Create a new session account for ERC-7715
export const createSessionAccount = (): SessionAccount => {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);

  return {
    address: account.address,
    privateKey,
    createdAt: Math.floor(Date.now() / 1000),
  };
};

// Build permission request for subscription
export const buildPermissionRequest = (
  params: CreateSubscriptionParams,
  sessionAccountAddress: Address
): PermissionGrant => {
  const currentTime = Math.floor(Date.now() / 1000);
  const expiry = currentTime + params.durationDays * 86400;

  const baseGrant = {
    chainId: DEFAULT_CHAIN.id,
    expiry,
    signer: {
      type: 'account' as const,
      data: {
        address: sessionAccountAddress,
      },
    },
    isAdjustmentAllowed: true,
  };

  if (params.paymentType === 'periodic') {
    return {
      ...baseGrant,
      permission: {
        type: 'erc20-token-periodic' as const,
        data: {
          tokenAddress: params.tokenAddress,
          periodAmount: parseUnits(params.periodAmount || '0', USDC_DECIMALS),
          periodDuration: params.periodDuration || 86400,
          justification: `FlowPay: ${params.name} - ${params.description || 'Recurring payment'}`,
        },
      },
    };
  } else {
    return {
      ...baseGrant,
      permission: {
        type: 'erc20-token-stream' as const,
        data: {
          tokenAddress: params.tokenAddress,
          amountPerSecond: parseUnits(params.amountPerSecond || '0', USDC_DECIMALS),
          initialAmount: parseUnits(params.initialAmount || '0', USDC_DECIMALS),
          maxAmount: parseUnits(params.maxAmount || '0', USDC_DECIMALS),
          startTime: currentTime,
          justification: `FlowPay: ${params.name} - ${params.description || 'Streaming payment'}`,
        },
      },
    };
  }
};

// Request permissions from MetaMask (ERC-7715)
export const requestPermissions = async (
  permissionGrant: PermissionGrant
): Promise<{ context: Hex; expiry: number }> => {
  if (!isMetaMaskAvailable()) {
    throw new Error('MetaMask is not installed');
  }

  // Using wallet_grantPermissions (ERC-7715)
  const result = await window.ethereum!.request({
    method: 'wallet_grantPermissions',
    params: [permissionGrant],
  });

  return result as { context: Hex; expiry: number };
};

// Get wallet client with ERC-7715 support
export const getWalletClient = () => {
  if (!isMetaMaskAvailable()) {
    throw new Error('MetaMask is not installed');
  }

  return createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum!),
  });
};

// Format address for display
export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format amount with decimals
export const formatAmount = (amount: bigint, decimals: number = USDC_DECIMALS): string => {
  const divisor = BigInt(10 ** decimals);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0').slice(0, 2);
  return `${integerPart}.${fractionalStr}`;
};

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
}
