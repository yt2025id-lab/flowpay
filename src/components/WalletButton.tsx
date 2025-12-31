'use client';

import { useWallet } from '@/hooks/useWallet';
import { formatAddress } from '@/lib/wallet';
import { LogOut, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

export function WalletButton() {
  const {
    isConnected,
    address,
    isMetaMaskFlask,
    isCorrectChain,
    isMetaMaskAvailable,
    connect,
    disconnect,
    switchNetwork,
  } = useWallet();

  if (!isMetaMaskAvailable) {
    return (
      <a
        href="https://metamask.io/flask/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
      >
        <Image
          src="/images/metamask-fox.svg"
          alt="MetaMask"
          width={18}
          height={18}
          className="w-[18px] h-[18px]"
        />
        Install MetaMask
      </a>
    );
  }

  if (!isConnected) {
    return (
      <button
        onClick={connect}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
      >
        <Image
          src="/images/metamask-fox.svg"
          alt="MetaMask"
          width={18}
          height={18}
          className="w-[18px] h-[18px]"
        />
        Connect MetaMask
      </button>
    );
  }

  if (!isCorrectChain) {
    return (
      <button
        onClick={switchNetwork}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
      >
        <Image
          src="/images/metamask-fox.svg"
          alt="MetaMask"
          width={18}
          height={18}
          className="w-[18px] h-[18px]"
        />
        Connect MetaMask
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {!isMetaMaskFlask && (
        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
          <AlertTriangle className="w-3 h-3" />
          Flask required
        </div>
      )}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="font-mono text-sm">{formatAddress(address!)}</span>
        <button
          onClick={disconnect}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
          title="Disconnect"
        >
          <LogOut className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
