'use client';

import Link from 'next/link';
import { useWallet } from '@/hooks/useWallet';
import { Hero3DAnimation, HowItWorks, WhyFlowPay, UseCases, HeroBackground, Footer } from '@/components';
import {
  Zap,
  ArrowRight,
  Shield,
  Wallet,
  CheckCircle,
} from 'lucide-react';

export default function HomePage() {
  const { isConnected, connect } = useWallet();

  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Animation */}
      <section className="relative overflow-hidden py-12 sm:py-20 min-h-[90vh]">
        {/* Animated Background Illustrations */}
        <HeroBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-orange-300 text-sm font-medium mb-6 border border-orange-500/30">
                <Zap className="w-4 h-4" />
                Powered by MetaMask Advanced Permissions (ERC-7715)
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Automated Crypto Payments,{' '}
                <span className="text-orange-400">
                  Simplified
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/90 mb-8 drop-shadow-md">
                Set up recurring payments, subscriptions, and salary streaming with a single approval.
                Your funds, your control.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {isConnected ? (
                  <Link
                    href="/create"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Create Payment
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <button
                    onClick={connect}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <Wallet className="w-5 h-5" />
                    Connect Wallet to Start
                  </button>
                )}
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all hover:scale-105"
                >
                  View Dashboard
                </Link>
              </div>
            </div>

            {/* Right: 3D Animation */}
            <div className="hidden lg:block">
              <Hero3DAnimation />
            </div>
          </div>

          {/* Mobile: Show animation below */}
          <div className="lg:hidden mt-12">
            <Hero3DAnimation />
          </div>
        </div>
      </section>

      {/* How It Works - Interactive Component */}
      <HowItWorks />

      {/* Why FlowPay - New Animated Features */}
      <WhyFlowPay />

      {/* Use Cases */}
      <UseCases />

      {/* Technical Info */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-600" />
              Built on Secure Standards
            </h2>

            <div className="space-y-4">
              {[
                { title: 'ERC-7715', desc: 'Advanced Permissions standard for wallet-granted permissions' },
                { title: 'EIP-7702', desc: 'Account abstraction enabling smart account capabilities for EOAs' },
                { title: 'Session Accounts', desc: 'Temporary accounts that execute on your behalf with limited permissions' },
                { title: 'Sepolia Testnet', desc: 'Currently deployed on Sepolia for testing (EIP-7702 compatible)' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">{item.title}:</span>{' '}
                    <span className="text-gray-600 dark:text-gray-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> This application requires MetaMask Flask 13.5.0+ which supports ERC-7715 Advanced Permissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
