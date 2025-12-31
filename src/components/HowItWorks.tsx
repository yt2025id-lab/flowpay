'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const STEPS = [
  {
    step: 1,
    title: 'Connect Wallet',
    subtitle: 'MetaMask',
    description: 'Connect your MetaMask Flask wallet to get started with FlowPay',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    illustration: (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* MetaMask Logo */}
        <motion.div
          className="relative w-32 h-32"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/metamask-fox.svg"
            alt="MetaMask"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* MetaMask text */}
        <motion.p
          className="mt-4 text-xl font-bold text-orange-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          MetaMask
        </motion.p>

        {/* Connection waves */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="wallet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="100"
              cy="90"
              r={45 + i * 18}
              fill="none"
              stroke="url(#wallet-grad)"
              strokeWidth="2"
              strokeDasharray="10 5"
              opacity={0.3 - i * 0.1}
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          {/* Sparkles */}
          <motion.circle cx="35" cy="35" r="4" fill="#fbbf24" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <motion.circle cx="165" cy="45" r="3" fill="#fbbf24" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
          <motion.circle cx="155" cy="145" r="3" fill="#fbbf24" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} />
          <motion.circle cx="40" cy="150" r="4" fill="#fbbf24" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }} />
        </svg>

        {/* Click indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-8 h-8 rounded-full bg-white border-3 border-orange-500 flex items-center justify-center shadow-lg">
            <motion.div
              className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    step: 2,
    title: 'Set Up Payment',
    description: 'Choose payment type, amount, frequency and recipient address',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    illustration: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="setup-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {/* Form/Card */}
        <motion.rect
          x="30" y="30" width="140" height="140" rx="16"
          fill="white" stroke="url(#setup-grad)" strokeWidth="3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Form fields */}
        <motion.g
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Amount field */}
          <rect x="45" y="50" width="110" height="25" rx="6" fill="#e0f2fe"/>
          <text x="55" y="67" fill="#0369a1" fontSize="12" fontWeight="500">Amount: 10 USDC</text>
          {/* Frequency field */}
          <rect x="45" y="85" width="110" height="25" rx="6" fill="#e0f2fe"/>
          <text x="55" y="102" fill="#0369a1" fontSize="12" fontWeight="500">Every: Monthly</text>
          {/* Recipient field */}
          <rect x="45" y="120" width="110" height="25" rx="6" fill="#e0f2fe"/>
          <text x="55" y="137" fill="#0369a1" fontSize="12" fontWeight="500">To: 0x1234...</text>
        </motion.g>
        {/* Floating dollar signs */}
        <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <circle cx="25" cy="80" r="12" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
          <text x="25" y="85" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">$</text>
        </motion.g>
        <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
          <circle cx="175" cy="60" r="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
          <text x="175" y="64" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">$</text>
        </motion.g>
        {/* Checkmark animation on form */}
        <motion.circle
          cx="155" cy="155" r="12"
          fill="url(#setup-grad)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        <motion.path
          d="M150 155 L153 158 L162 150"
          fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        />
      </svg>
    ),
  },
  {
    step: 3,
    title: 'Grant Permission',
    description: 'One-time approval via MetaMask, then payments run automatically',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    illustration: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="grant-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        {/* Shield */}
        <motion.path
          d="M100 20 L155 45 L155 100 Q155 155 100 180 Q45 155 45 100 L45 45 Z"
          fill="white" stroke="url(#grant-grad)" strokeWidth="4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        {/* Inner shield glow */}
        <motion.path
          d="M100 35 L145 55 L145 100 Q145 145 100 165 Q55 145 55 100 L55 55 Z"
          fill="url(#grant-grad)" opacity="0.1"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Checkmark */}
        <motion.path
          d="M70 100 L90 120 L135 70"
          fill="none" stroke="url(#grant-grad)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        {/* Permission granted text effect */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <rect x="55" y="140" width="90" height="20" rx="10" fill="url(#grant-grad)"/>
          <text x="100" y="154" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">APPROVED</text>
        </motion.g>
        {/* Sparkle effects */}
        {[
          { cx: 30, cy: 60, delay: 0 },
          { cx: 170, cy: 50, delay: 0.3 },
          { cx: 25, cy: 130, delay: 0.6 },
          { cx: 175, cy: 120, delay: 0.9 },
        ].map((spark, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={spark.cx} cy={spark.cy} r="4"
              fill="#fbbf24"
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: spark.delay }}
            />
            <motion.path
              d={`M${spark.cx - 8} ${spark.cy} L${spark.cx + 8} ${spark.cy} M${spark.cx} ${spark.cy - 8} L${spark.cx} ${spark.cy + 8}`}
              stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: spark.delay }}
            />
          </motion.g>
        ))}
      </svg>
    ),
  },
];

// Animated connection line between steps
function ConnectionLine({ isActive, color }: { isActive: boolean; color: string }) {
  return (
    <div className="hidden md:flex items-center justify-center w-24 lg:w-32">
      <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: '0%' }}
          animate={{ width: isActive ? '100%' : '0%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Animated dot */}
        {isActive && (
          <motion.div
            className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${color}`}
            initial={{ left: '0%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  // Auto-advance steps when in view
  useEffect(() => {
    if (!isInView || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, isAutoPlaying]);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Simple 3-Step Process
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Set up automated payments in just three simple steps. No complex configurations needed.
          </p>
        </motion.div>

        {/* Main illustration area */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative w-full max-w-lg mx-auto aspect-square">
            {/* Background glow */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${STEPS[activeStep].color} opacity-20 blur-3xl`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Illustration card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                className={`relative w-full h-full rounded-3xl bg-gradient-to-br ${STEPS[activeStep].color} p-1`}
                initial={{ opacity: 0, rotateY: -30, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 30, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-3xl p-8 flex items-center justify-center">
                  {STEPS[activeStep].illustration}
                </div>

                {/* Step indicator badge */}
                <motion.div
                  className={`absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${STEPS[activeStep].color} flex items-center justify-center text-white text-2xl font-bold shadow-xl`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  {STEPS[activeStep].step}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Title and description overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${activeStep}`}
                className="absolute -bottom-20 left-0 right-0 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${STEPS[activeStep].color} bg-clip-text text-transparent mb-2`}>
                  {STEPS[activeStep].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {STEPS[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Step navigation */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mt-28"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {STEPS.map((step, index) => (
            <div key={step.step} className="flex items-center">
              {/* Step button */}
              <motion.button
                onClick={() => {
                  setActiveStep(index);
                  setIsAutoPlaying(false);
                }}
                className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  activeStep === index
                    ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-105`
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
                whileHover={{ scale: activeStep === index ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                  activeStep === index
                    ? 'bg-white/20'
                    : `bg-gradient-to-r ${step.color} text-white`
                }`}>
                  {step.step}
                </span>
                <span className="font-semibold">{step.title}</span>

                {/* Active indicator */}
                {activeStep === index && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>

              {/* Connection line */}
              {index < STEPS.length - 1 && (
                <ConnectionLine
                  isActive={activeStep > index}
                  color={STEPS[index + 1].color}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="mt-12 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <div className="flex gap-2">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                className="flex-1 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden cursor-pointer"
                onClick={() => {
                  setActiveStep(index);
                  setIsAutoPlaying(false);
                }}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${step.color}`}
                  initial={{ width: '0%' }}
                  animate={{
                    width: activeStep === index ? '100%' : activeStep > index ? '100%' : '0%'
                  }}
                  transition={{ duration: activeStep === index && isAutoPlaying ? 3 : 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
