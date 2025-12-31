import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Address, Hex } from 'viem';
import { SessionAccount, Subscription, GrantedPermission } from '@/types';

interface WalletStore {
  // Connection state
  isConnected: boolean;
  address: Address | undefined;
  chainId: number | undefined;
  isMetaMaskFlask: boolean;

  // Session account for ERC-7715
  sessionAccount: SessionAccount | undefined;

  // Granted permissions
  grantedPermissions: GrantedPermission[];

  // Subscriptions
  subscriptions: Subscription[];

  // Actions
  setConnected: (connected: boolean) => void;
  setAddress: (address: Address | undefined) => void;
  setChainId: (chainId: number | undefined) => void;
  setIsMetaMaskFlask: (isFlask: boolean) => void;
  setSessionAccount: (account: SessionAccount | undefined) => void;
  addGrantedPermission: (permission: GrantedPermission) => void;
  removeGrantedPermission: (context: Hex) => void;
  addSubscription: (subscription: Subscription) => void;
  updateSubscription: (id: string, updates: Partial<Subscription>) => void;
  removeSubscription: (id: string) => void;
  reset: () => void;
}

const initialState = {
  isConnected: false,
  address: undefined,
  chainId: undefined,
  isMetaMaskFlask: false,
  sessionAccount: undefined,
  grantedPermissions: [],
  subscriptions: [],
};

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      ...initialState,

      setConnected: (connected) => set({ isConnected: connected }),

      setAddress: (address) => set({ address }),

      setChainId: (chainId) => set({ chainId }),

      setIsMetaMaskFlask: (isFlask) => set({ isMetaMaskFlask: isFlask }),

      setSessionAccount: (account) => set({ sessionAccount: account }),

      addGrantedPermission: (permission) =>
        set((state) => ({
          grantedPermissions: [...state.grantedPermissions, permission],
        })),

      removeGrantedPermission: (context) =>
        set((state) => ({
          grantedPermissions: state.grantedPermissions.filter(
            (p) => p.context !== context
          ),
        })),

      addSubscription: (subscription) =>
        set((state) => ({
          subscriptions: [...state.subscriptions, subscription],
        })),

      updateSubscription: (id, updates) =>
        set((state) => ({
          subscriptions: state.subscriptions.map((sub) =>
            sub.id === id ? { ...sub, ...updates } : sub
          ),
        })),

      removeSubscription: (id) =>
        set((state) => ({
          subscriptions: state.subscriptions.filter((sub) => sub.id !== id),
        })),

      reset: () => set(initialState),
    }),
    {
      name: 'flowpay-wallet-storage',
      partialize: (state) => ({
        sessionAccount: state.sessionAccount,
        grantedPermissions: state.grantedPermissions,
        subscriptions: state.subscriptions,
      }),
    }
  )
);
