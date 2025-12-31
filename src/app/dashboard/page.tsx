'use client';

import Link from 'next/link';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { useWallet } from '@/hooks/useWallet';
import { SubscriptionCard, StatsCard, SmartInsights } from '@/components';
import { formatAmount } from '@/lib/wallet';
import { USDC_DECIMALS } from '@/config/constants';
import { Plus, Wallet, TrendingUp, Clock, Zap } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  const { isConnected, address } = useWallet();
  const {
    subscriptions,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    getActiveSubscriptions,
    calculateMonthlySpending,
  } = useSubscriptions();

  const activeSubscriptions = getActiveSubscriptions();
  const monthlySpending = calculateMonthlySpending();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6">
            <Image
              src="/images/metamask-fox.svg"
              alt="MetaMask"
              width={96}
              height={96}
              className="w-full h-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Connect Wallet
          </h1>
          <p className="text-orange-500 font-semibold mb-4">
            MetaMask
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Connect your MetaMask wallet to view your payments dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your recurring payments and subscriptions
            </p>
          </div>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Payment
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<Zap className="w-6 h-6" />}
            title="Active Payments"
            value={activeSubscriptions.length.toString()}
            subtitle="Currently running"
          />
          <StatsCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Monthly Spending"
            value={`${formatAmount(monthlySpending, USDC_DECIMALS)} USDC`}
            subtitle="Estimated total"
          />
          <StatsCard
            icon={<Clock className="w-6 h-6" />}
            title="Total Payments"
            value={subscriptions.length.toString()}
            subtitle="All time"
          />
          <StatsCard
            icon={<Wallet className="w-6 h-6" />}
            title="Connected Wallet"
            value={`${address?.slice(0, 6)}...${address?.slice(-4)}`}
            subtitle="Sepolia Testnet"
          />
        </div>

        {/* Subscriptions List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Payments
          </h2>

          {subscriptions.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No payments yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first automated payment to get started
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Payment
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  onPause={pauseSubscription}
                  onResume={resumeSubscription}
                  onCancel={cancelSubscription}
                />
              ))}
            </div>
          )}
        </div>

        {/* Smart Insights */}
        <div className="mb-8">
          <SmartInsights
            subscriptions={subscriptions.map((s) => ({
              id: s.id,
              name: s.name,
              amount: s.amount.toString(),
              frequency: s.frequency,
              status: s.status,
            }))}
          />
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            How FlowPay Works
          </h3>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              Create a payment with your desired amount and frequency
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              Grant permission via MetaMask Advanced Permissions (ERC-7715)
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              Payments execute automatically - no manual approval needed
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              Revoke permissions anytime from your MetaMask wallet
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
