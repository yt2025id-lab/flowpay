'use client';

import { useCallback, useEffect } from 'react';
import { Address } from 'viem';
import { useWalletStore } from '@/stores/walletStore';
import {
  isMetaMaskAvailable,
  checkIsMetaMaskFlask,
  connectWallet,
  switchToSepolia,
  createSessionAccount,
} from '@/lib/wallet';
import { DEFAULT_CHAIN } from '@/config/constants';

export function useWallet() {
  const {
    isConnected,
    address,
    chainId,
    isMetaMaskFlask,
    sessionAccount,
    setConnected,
    setAddress,
    setChainId,
    setIsMetaMaskFlask,
    setSessionAccount,
    reset,
  } = useWalletStore();

  // Check connection status on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (!isMetaMaskAvailable()) return;

      try {
        const accounts = (await window.ethereum!.request({
          method: 'eth_accounts',
        })) as Address[];

        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setConnected(true);

          const currentChainId = (await window.ethereum!.request({
            method: 'eth_chainId',
          })) as string;
          setChainId(parseInt(currentChainId, 16));

          const isFlask = await checkIsMetaMaskFlask();
          setIsMetaMaskFlask(isFlask);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    };

    checkConnection();
  }, [setAddress, setConnected, setChainId, setIsMetaMaskFlask]);

  // Listen for account/chain changes
  useEffect(() => {
    if (!isMetaMaskAvailable()) return;

    const handleAccountsChanged = (accounts: unknown) => {
      const accountList = accounts as Address[];
      if (accountList.length === 0) {
        reset();
      } else {
        setAddress(accountList[0]);
        setConnected(true);
      }
    };

    const handleChainChanged = (newChainId: unknown) => {
      setChainId(parseInt(newChainId as string, 16));
    };

    window.ethereum!.on('accountsChanged', handleAccountsChanged);
    window.ethereum!.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum!.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum!.removeListener('chainChanged', handleChainChanged);
    };
  }, [reset, setAddress, setConnected, setChainId]);

  // Connect wallet
  const connect = useCallback(async () => {
    try {
      const { address: connectedAddress, chainId: connectedChainId } =
        await connectWallet();

      setAddress(connectedAddress);
      setChainId(connectedChainId);
      setConnected(true);

      const isFlask = await checkIsMetaMaskFlask();
      setIsMetaMaskFlask(isFlask);

      // Switch to Sepolia if not already
      if (connectedChainId !== DEFAULT_CHAIN.id) {
        await switchToSepolia();
        setChainId(DEFAULT_CHAIN.id);
      }

      return { address: connectedAddress, chainId: connectedChainId };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }, [setAddress, setChainId, setConnected, setIsMetaMaskFlask]);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    reset();
  }, [reset]);

  // Initialize or get session account
  const initSessionAccount = useCallback(() => {
    if (sessionAccount) return sessionAccount;

    const newAccount = createSessionAccount();
    setSessionAccount(newAccount);
    return newAccount;
  }, [sessionAccount, setSessionAccount]);

  // Check if on correct chain
  const isCorrectChain = chainId === DEFAULT_CHAIN.id;

  // Switch network
  const switchNetwork = useCallback(async () => {
    await switchToSepolia();
    setChainId(DEFAULT_CHAIN.id);
  }, [setChainId]);

  return {
    isConnected,
    address,
    chainId,
    isMetaMaskFlask,
    sessionAccount,
    isCorrectChain,
    isMetaMaskAvailable: isMetaMaskAvailable(),
    connect,
    disconnect,
    initSessionAccount,
    switchNetwork,
  };
}
