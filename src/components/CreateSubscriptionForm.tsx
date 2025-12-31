'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Address } from 'viem';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { useWallet } from '@/hooks/useWallet';
import { CATEGORIES, PERIODS, USDC_ADDRESS } from '@/config/constants';
import { CreateSubscriptionParams, SubscriptionCategory, PaymentType } from '@/types';
import { Loader2, CheckCircle, ArrowLeft, Zap } from 'lucide-react';

const PERIOD_OPTIONS = [
  { value: PERIODS.HOURLY, label: 'Hourly' },
  { value: PERIODS.DAILY, label: 'Daily' },
  { value: PERIODS.WEEKLY, label: 'Weekly' },
  { value: PERIODS.MONTHLY, label: 'Monthly' },
];

const DURATION_OPTIONS = [
  { value: 7, label: '7 days' },
  { value: 30, label: '30 days' },
  { value: 90, label: '90 days' },
  { value: 365, label: '1 year' },
];

export function CreateSubscriptionForm() {
  const router = useRouter();
  const { isConnected, isMetaMaskFlask } = useWallet();
  const { createSubscription } = useSubscriptions();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'subscription' as SubscriptionCategory,
    recipient: '' as Address | '',
    paymentType: 'periodic' as PaymentType,
    periodAmount: '',
    periodDuration: PERIODS.MONTHLY as number,
    amountPerSecond: '',
    initialAmount: '0',
    maxAmount: '',
    durationDays: 30,
  });

  const handleCategorySelect = (category: SubscriptionCategory) => {
    setFormData((prev) => ({ ...prev, category }));
    // Auto-suggest payment type based on category
    if (category === 'salary') {
      setFormData((prev) => ({ ...prev, paymentType: 'stream' }));
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!isMetaMaskFlask) {
      setError('MetaMask Flask is required for Advanced Permissions');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const params: CreateSubscriptionParams = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        recipient: formData.recipient as Address,
        tokenAddress: USDC_ADDRESS,
        paymentType: formData.paymentType,
        periodAmount: formData.periodAmount,
        periodDuration: formData.periodDuration,
        amountPerSecond: formData.amountPerSecond,
        initialAmount: formData.initialAmount,
        maxAmount: formData.maxAmount,
        durationDays: formData.durationDays,
      };

      await createSubscription(params);
      setIsSuccess(true);

      // Redirect after success
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error creating subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to create subscription');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Created!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your recurring payment has been set up successfully.
        </p>
        <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-1 rounded ${
                  step > s ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Category */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            What type of payment?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id as SubscriptionCategory)}
                className={`p-6 rounded-xl border-2 text-left transition-all hover:border-purple-500 hover:shadow-lg ${
                  formData.category === cat.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <span className="text-4xl mb-3 block">{cat.icon}</span>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {cat.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Payment Details */}
      {step === 2 && (
        <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Payment Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Netflix Subscription"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Add a description..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                value={formData.recipient}
                onChange={(e) => setFormData((prev) => ({ ...prev, recipient: e.target.value as Address }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0x..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, paymentType: 'periodic' }))}
                  className={`p-4 rounded-lg border-2 text-left ${
                    formData.paymentType === 'periodic'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="font-medium">Periodic</div>
                  <div className="text-sm text-gray-500">Fixed amount at intervals</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, paymentType: 'stream' }))}
                  className={`p-4 rounded-lg border-2 text-left ${
                    formData.paymentType === 'stream'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="font-medium">Stream</div>
                  <div className="text-sm text-gray-500">Continuous flow per second</div>
                </button>
              </div>
            </div>

            {formData.paymentType === 'periodic' ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount (USDC)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.periodAmount}
                    onChange={(e) => setFormData((prev) => ({ ...prev, periodAmount: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="10.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Frequency
                  </label>
                  <select
                    value={formData.periodDuration}
                    onChange={(e) => setFormData((prev) => ({ ...prev, periodDuration: Number(e.target.value) }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {PERIOD_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount per Second (USDC)
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.amountPerSecond}
                    onChange={(e) => setFormData((prev) => ({ ...prev, amountPerSecond: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.000001"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Total Amount (USDC)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.maxAmount}
                    onChange={(e) => setFormData((prev) => ({ ...prev, maxAmount: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="1000.00"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
            >
              Continue
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Confirm & Grant Permission */}
      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Confirm & Authorize
          </h2>

          {/* Summary Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">
                {CATEGORIES.find((c) => c.id === formData.category)?.icon}
              </span>
              <div>
                <h3 className="font-semibold text-lg">{formData.name}</h3>
                <p className="text-sm text-gray-500">{formData.description}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Recipient</span>
                <span className="font-mono">{formData.recipient.slice(0, 10)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment</span>
                <span className="font-semibold text-purple-600">
                  {formData.paymentType === 'periodic'
                    ? `${formData.periodAmount} USDC / ${PERIOD_OPTIONS.find((p) => p.value === formData.periodDuration)?.label}`
                    : `${formData.amountPerSecond} USDC/sec`}
                </span>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Permission Duration
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, durationDays: opt.value }))}
                  className={`py-3 px-4 rounded-lg border-2 text-sm font-medium ${
                    formData.durationDays === opt.value
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                  Powered by MetaMask Advanced Permissions
                </p>
                <p className="text-blue-600 dark:text-blue-400">
                  You will grant permission for automatic payments. You can revoke
                  this permission at any time from your MetaMask wallet.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !isConnected}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Requesting Permission...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Grant Permission & Create
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
