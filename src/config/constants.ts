import { sepolia } from 'viem/chains';

// Supported Networks (EIP-7702 compatible)
export const SUPPORTED_CHAINS = [sepolia] as const;

export const DEFAULT_CHAIN = sepolia;

// USDC on Sepolia
export const USDC_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238' as const;
export const USDC_DECIMALS = 6;

// Permission Types
export const PERMISSION_TYPES = {
  PERIODIC: 'erc20-token-periodic',
  STREAM: 'erc20-token-stream',
} as const;

// Common subscription periods (in seconds)
export const PERIODS = {
  HOURLY: 3600,
  DAILY: 86400,
  WEEKLY: 604800,
  MONTHLY: 2592000, // 30 days
  YEARLY: 31536000, // 365 days
} as const;

// FlowPay Subscription Categories
export const CATEGORIES = [
  { id: 'subscription', name: 'Subscription', icon: '📺', description: 'Netflix, Spotify, SaaS' },
  { id: 'salary', name: 'Salary Stream', icon: '💰', description: 'Pay employees per second' },
  { id: 'dca', name: 'DCA Investment', icon: '📈', description: 'Auto-buy crypto periodically' },
  { id: 'donation', name: 'Recurring Donation', icon: '❤️', description: 'Support creators/charities' },
  { id: 'savings', name: 'Auto Savings', icon: '🏦', description: 'Automatic savings deposits' },
] as const;

// Default permission expiry (7 days)
export const DEFAULT_EXPIRY_SECONDS = 604800;

// Pimlico API (for bundler/paymaster - get your own key at pimlico.io)
export const PIMLICO_API_KEY = process.env.NEXT_PUBLIC_PIMLICO_API_KEY || '';

// App Info
export const APP_NAME = 'FlowPay';
export const APP_DESCRIPTION = 'Automated crypto payments powered by MetaMask Advanced Permissions';
