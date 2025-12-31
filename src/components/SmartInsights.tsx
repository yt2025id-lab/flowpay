'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';

interface Insight {
  id: string;
  type: 'saving' | 'warning' | 'tip' | 'trend';
  title: string;
  description: string;
  impact?: string;
  action?: string;
}

interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface SmartInsightsProps {
  subscriptions?: Array<{
    id: string;
    name: string;
    amount: string;
    frequency: string;
    status: string;
  }>;
}

export function SmartInsights({ subscriptions = [] }: SmartInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [categories, setCategories] = useState<SpendingCategory[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalyzed, setLastAnalyzed] = useState<Date | null>(null);

  // Generate AI insights based on subscriptions
  const generateInsights = () => {
    setIsAnalyzing(true);

    // Simulate AI analysis delay
    setTimeout(() => {
      const newInsights: Insight[] = [];

      // Analyze subscription patterns
      if (subscriptions.length === 0) {
        newInsights.push({
          id: '1',
          type: 'tip',
          title: 'Get Started with Automated Payments',
          description: 'Set up your first recurring payment to start tracking your crypto spending patterns.',
          action: 'Create your first payment',
        });
      } else {
        // Calculate total monthly spending
        const monthlyTotal = subscriptions.reduce((sum, sub) => {
          const amount = parseFloat(sub.amount) || 0;
          const multiplier = sub.frequency === 'weekly' ? 4 : sub.frequency === 'daily' ? 30 : 1;
          return sum + (amount * multiplier);
        }, 0);

        // Generate spending insights
        if (monthlyTotal > 100) {
          newInsights.push({
            id: '2',
            type: 'saving',
            title: 'Potential Savings Detected',
            description: `You're spending ${monthlyTotal.toFixed(2)} USDC monthly. Consider consolidating similar payments to reduce gas fees.`,
            impact: `Save up to ${(monthlyTotal * 0.05).toFixed(2)} USDC/month`,
            action: 'View optimization tips',
          });
        }

        // Check for duplicate-like subscriptions
        const activeCount = subscriptions.filter(s => s.status === 'active').length;
        if (activeCount > 3) {
          newInsights.push({
            id: '3',
            type: 'tip',
            title: 'Batch Payments Available',
            description: `You have ${activeCount} active payments. Batching similar payments on the same day can reduce transaction costs.`,
            action: 'Learn about batching',
          });
        }

        // Trend analysis
        newInsights.push({
          id: '4',
          type: 'trend',
          title: 'Spending Trend Analysis',
          description: 'Your recurring payments are consistent. This predictability helps with budget planning.',
          impact: 'Stable spending pattern',
        });
      }

      // Always add general tips
      newInsights.push({
        id: '5',
        type: 'tip',
        title: 'Security Reminder',
        description: 'Review your active permissions regularly in MetaMask to ensure only trusted dApps have access.',
        action: 'View permissions guide',
      });

      setInsights(newInsights);

      // Generate spending categories
      const newCategories: SpendingCategory[] = [
        { name: 'Subscriptions', amount: 45.00, percentage: 45, trend: 'stable', color: 'bg-orange-500' },
        { name: 'Streaming', amount: 30.00, percentage: 30, trend: 'up', color: 'bg-amber-500' },
        { name: 'Services', amount: 15.00, percentage: 15, trend: 'down', color: 'bg-yellow-500' },
        { name: 'Other', amount: 10.00, percentage: 10, trend: 'stable', color: 'bg-orange-300' },
      ];
      setCategories(newCategories);

      setIsAnalyzing(false);
      setLastAnalyzed(new Date());
    }, 1500);
  };

  useEffect(() => {
    generateInsights();
  }, [subscriptions.length]);

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'saving':
        return <TrendingDown className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'tip':
        return <Lightbulb className="w-5 h-5 text-blue-500" />;
      case 'trend':
        return <TrendingUp className="w-5 h-5 text-purple-500" />;
    }
  };

  const getInsightBg = (type: Insight['type']) => {
    switch (type) {
      case 'saving':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'tip':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'trend':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Smart Insights</h2>
              <p className="text-white/80 text-sm">AI-powered spending analysis</p>
            </div>
          </div>
          <button
            onClick={generateInsights}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Analyzing...' : 'Refresh'}
          </button>
        </div>
        {lastAnalyzed && (
          <p className="text-white/60 text-xs mt-3">
            Last analyzed: {lastAnalyzed.toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Spending Overview */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Spending Breakdown</h3>
          </div>

          {isAnalyzing ? (
            <div className="h-32 flex items-center justify-center">
              <div className="flex items-center gap-3 text-gray-500">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span>Analyzing your payments...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {category.amount.toFixed(2)} USDC
                      </span>
                      {category.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-red-500" />
                      ) : category.trend === 'down' ? (
                        <ArrowDownRight className="w-4 h-4 text-green-500" />
                      ) : null}
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${category.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Insights */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">AI Recommendations</h3>
          </div>

          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse"
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${getInsightBg(insight.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {insight.description}
                        </p>
                        {insight.impact && (
                          <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-2">
                            {insight.impact}
                          </p>
                        )}
                        {insight.action && (
                          <button className="flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400 font-medium mt-2 hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
                            {insight.action}
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Monthly Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                Projected Monthly Spend
              </p>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                {categories.reduce((sum, c) => sum + c.amount, 0).toFixed(2)} USDC
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">vs last month</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                <ArrowDownRight className="w-4 h-4" />
                -5.2%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
