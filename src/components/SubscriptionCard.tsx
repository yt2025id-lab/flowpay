'use client';

import { Subscription } from '@/types';
import { formatAmount, formatAddress } from '@/lib/wallet';
import { CATEGORIES, PERIODS, USDC_DECIMALS } from '@/config/constants';
import { Pause, Play, X, Clock, Wallet, ArrowRight } from 'lucide-react';

interface SubscriptionCardProps {
  subscription: Subscription;
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export function SubscriptionCard({
  subscription,
  onPause,
  onResume,
  onCancel,
}: SubscriptionCardProps) {
  const category = CATEGORIES.find((c) => c.id === subscription.category);
  const isActive = subscription.status === 'active';
  const isPaused = subscription.status === 'paused';

  const getPeriodLabel = (seconds: number) => {
    if (seconds === PERIODS.HOURLY) return 'per hour';
    if (seconds === PERIODS.DAILY) return 'per day';
    if (seconds === PERIODS.WEEKLY) return 'per week';
    if (seconds === PERIODS.MONTHLY) return 'per month';
    if (seconds === PERIODS.YEARLY) return 'per year';
    return `every ${seconds}s`;
  };

  const getStatusColor = () => {
    switch (subscription.status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const expiryDate = new Date(subscription.expiry * 1000);
  const daysUntilExpiry = Math.ceil(
    (subscription.expiry - Math.floor(Date.now() / 1000)) / 86400
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category?.icon || '💳'}</span>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {subscription.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category?.name || subscription.category}
              </p>
            </div>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
          >
            {subscription.status}
          </span>
        </div>

        {subscription.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {subscription.description}
          </p>
        )}

        <div className="space-y-3">
          {/* Payment Info */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Wallet className="w-4 h-4" />
              <span className="text-sm">Amount</span>
            </div>
            <div className="text-right">
              {subscription.paymentType === 'periodic' ? (
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {formatAmount(subscription.periodAmount || BigInt(0))} USDC{' '}
                  {getPeriodLabel(subscription.periodDuration || PERIODS.MONTHLY)}
                </span>
              ) : (
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {formatAmount(subscription.amountPerSecond || BigInt(0))} USDC/sec
                </span>
              )}
            </div>
          </div>

          {/* Recipient */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <ArrowRight className="w-4 h-4" />
              <span className="text-sm">To</span>
            </div>
            <span className="font-mono text-sm text-gray-900 dark:text-white">
              {formatAddress(subscription.recipient)}
            </span>
          </div>

          {/* Expiry */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Expires</span>
            </div>
            <span className="text-sm text-gray-900 dark:text-white">
              {expiryDate.toLocaleDateString()} ({daysUntilExpiry}d left)
            </span>
          </div>
        </div>

        {/* Actions */}
        {(isActive || isPaused) && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {isActive && onPause && (
              <button
                onClick={() => onPause(subscription.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                <Pause className="w-4 h-4" />
                Pause
              </button>
            )}
            {isPaused && onResume && (
              <button
                onClick={() => onResume(subscription.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Play className="w-4 h-4" />
                Resume
              </button>
            )}
            {onCancel && (
              <button
                onClick={() => onCancel(subscription.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
