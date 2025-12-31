'use client';

import { useCallback } from 'react';
import { Hex, parseUnits } from 'viem';
import { useWalletStore } from '@/stores/walletStore';
import { useWallet } from './useWallet';
import { buildPermissionRequest, requestPermissions } from '@/lib/wallet';
import { CreateSubscriptionParams, Subscription, SubscriptionCategory } from '@/types';
import { USDC_DECIMALS } from '@/config/constants';

export function useSubscriptions() {
  const { subscriptions, addSubscription, updateSubscription, removeSubscription, addGrantedPermission } =
    useWalletStore();
  const { sessionAccount, initSessionAccount } = useWallet();

  // Create a new subscription
  const createSubscription = useCallback(
    async (params: CreateSubscriptionParams): Promise<Subscription> => {
      // Ensure session account exists
      const account = sessionAccount || initSessionAccount();

      // Build permission request
      const permissionGrant = buildPermissionRequest(params, account.address);

      // Request permission from MetaMask
      const { context, expiry } = await requestPermissions(permissionGrant);

      // Create subscription object
      const subscription: Subscription = {
        id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        name: params.name,
        description: params.description,
        category: params.category,
        recipient: params.recipient,
        tokenAddress: params.tokenAddress,
        paymentType: params.paymentType,
        periodAmount:
          params.paymentType === 'periodic'
            ? parseUnits(params.periodAmount || '0', USDC_DECIMALS)
            : undefined,
        periodDuration: params.periodDuration,
        amountPerSecond:
          params.paymentType === 'stream'
            ? parseUnits(params.amountPerSecond || '0', USDC_DECIMALS)
            : undefined,
        initialAmount:
          params.paymentType === 'stream'
            ? parseUnits(params.initialAmount || '0', USDC_DECIMALS)
            : undefined,
        maxAmount:
          params.paymentType === 'stream'
            ? parseUnits(params.maxAmount || '0', USDC_DECIMALS)
            : undefined,
        startTime: Math.floor(Date.now() / 1000),
        expiry,
        createdAt: Math.floor(Date.now() / 1000),
        status: 'active',
        permissionContext: context,
        totalPaid: BigInt(0),
      };

      // Store subscription
      addSubscription(subscription);

      // Store granted permission
      addGrantedPermission({
        context,
        expiry,
        permissions: [permissionGrant],
      });

      return subscription;
    },
    [sessionAccount, initSessionAccount, addSubscription, addGrantedPermission]
  );

  // Pause a subscription
  const pauseSubscription = useCallback(
    (subscriptionId: string) => {
      updateSubscription(subscriptionId, { status: 'paused' });
    },
    [updateSubscription]
  );

  // Resume a subscription
  const resumeSubscription = useCallback(
    (subscriptionId: string) => {
      updateSubscription(subscriptionId, { status: 'active' });
    },
    [updateSubscription]
  );

  // Cancel a subscription
  const cancelSubscription = useCallback(
    (subscriptionId: string) => {
      updateSubscription(subscriptionId, { status: 'cancelled' });
    },
    [updateSubscription]
  );

  // Get subscriptions by category
  const getSubscriptionsByCategory = useCallback(
    (category: SubscriptionCategory) => {
      return subscriptions.filter((sub) => sub.category === category);
    },
    [subscriptions]
  );

  // Get active subscriptions
  const getActiveSubscriptions = useCallback(() => {
    return subscriptions.filter((sub) => sub.status === 'active');
  }, [subscriptions]);

  // Calculate total monthly spending
  const calculateMonthlySpending = useCallback(() => {
    return subscriptions
      .filter((sub) => sub.status === 'active')
      .reduce((total, sub) => {
        if (sub.paymentType === 'periodic' && sub.periodAmount && sub.periodDuration) {
          // Calculate monthly equivalent
          const periodsPerMonth = 2592000 / sub.periodDuration; // 30 days in seconds
          return total + sub.periodAmount * BigInt(Math.floor(periodsPerMonth));
        } else if (sub.paymentType === 'stream' && sub.amountPerSecond) {
          // Monthly streaming amount
          return total + sub.amountPerSecond * BigInt(2592000);
        }
        return total;
      }, BigInt(0));
  }, [subscriptions]);

  return {
    subscriptions,
    createSubscription,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    removeSubscription,
    getSubscriptionsByCategory,
    getActiveSubscriptions,
    calculateMonthlySpending,
  };
}
