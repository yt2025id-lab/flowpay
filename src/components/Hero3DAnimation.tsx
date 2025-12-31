'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Floating particles component
const FloatingParticles = () => (
  <>
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
        style={{
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut",
        }}
      />
    ))}
  </>
);

// Orbiting ring component
const OrbitingRing = ({ size, duration, delay = 0, reverse = false }: { size: number; duration: number; delay?: number; reverse?: boolean }) => (
  <motion.div
    className="absolute rounded-full border border-orange-500/20"
    style={{
      width: size,
      height: size,
      left: '50%',
      top: '50%',
      marginLeft: -size / 2,
      marginTop: -size / 2,
    }}
    animate={{
      rotate: reverse ? -360 : 360,
      scale: [1, 1.05, 1],
    }}
    transition={{
      rotate: { duration, repeat: Infinity, ease: "linear" },
      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      delay,
    }}
  >
    <motion.div
      className="absolute w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg shadow-orange-500/50"
      style={{ top: -6, left: '50%', marginLeft: -6 }}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </motion.div>
);

// 3D Card wrapper with perspective
const Card3D = ({ children, isActive }: { children: React.ReactNode; isActive: boolean }) => (
  <motion.div
    className="relative preserve-3d"
    animate={{
      rotateY: isActive ? [0, 5, -5, 0] : 0,
      rotateX: isActive ? [0, -3, 3, 0] : 0,
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
  >
    {children}
  </motion.div>
);

const SLIDES = [
  {
    id: 1,
    title: 'Recurring Payments',
    description: 'Automate your subscriptions',
    gradient: 'from-orange-500/20 to-amber-500/20',
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* 3D Floating Calendar */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateY: [0, 10, 0],
            rotateX: [0, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Calendar shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black/20 rounded-full blur-md" />

          {/* Main Calendar */}
          <motion.svg
            viewBox="0 0 100 100"
            className="w-40 h-40 drop-shadow-2xl"
            animate={{ filter: ['drop-shadow(0 10px 20px rgba(249,115,22,0.3))', 'drop-shadow(0 20px 40px rgba(249,115,22,0.4))', 'drop-shadow(0 10px 20px rgba(249,115,22,0.3))'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Calendar body with gradient */}
            <defs>
              <linearGradient id="calendarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
              <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <rect x="12" y="22" width="76" height="68" rx="10" fill="url(#calendarGrad)" stroke="#f97316" strokeWidth="2"/>
            <rect x="12" y="22" width="76" height="22" rx="10" fill="url(#headerGrad)"/>
            <rect x="12" y="34" width="76" height="10" fill="url(#headerGrad)"/>
            {/* Calendar pins */}
            <rect x="26" y="14" width="6" height="18" rx="3" fill="#fbbf24"/>
            <rect x="68" y="14" width="6" height="18" rx="3" fill="#fbbf24"/>
            {/* Calendar grid - animated dots */}
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => (
                <motion.circle
                  key={`${row}-${col}`}
                  cx={28 + col * 22}
                  cy={55 + row * 14}
                  r="5"
                  fill={row === 0 && col === 2 ? "#fbbf24" : "rgba(255,255,255,0.4)"}
                  animate={row === 0 && col === 2 ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ))
            )}
          </motion.svg>

          {/* Rotating sync icon */}
          <motion.div
            className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-xl shadow-orange-500/40"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.div>

          {/* Floating notification badges */}
          <motion.div
            className="absolute -left-2 top-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
            animate={{ x: [-5, 5, -5], y: [-3, 3, -3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✓
          </motion.div>
        </motion.div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Salary Streaming',
    description: 'Pay per second, not per month',
    gradient: 'from-amber-500/20 to-yellow-500/20',
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center overflow-visible">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Shadow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-5 bg-black/20 rounded-full blur-lg" />

          {/* Main wallet with 3D effect */}
          <motion.div
            className="relative"
            animate={{ rotateY: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <svg viewBox="0 0 120 100" className="w-44 h-36 drop-shadow-2xl">
              <defs>
                <linearGradient id="walletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </linearGradient>
              </defs>
              {/* Wallet body */}
              <rect x="5" y="20" width="70" height="55" rx="10" fill="url(#walletGrad)" stroke="#f97316" strokeWidth="3"/>
              {/* Wallet flap */}
              <path d="M5 35 Q5 20 20 20 L60 20 Q75 20 75 35" fill="none" stroke="#f97316" strokeWidth="3"/>
              {/* Card slot */}
              <rect x="55" y="35" width="25" height="25" rx="5" fill="rgba(255,255,255,0.2)" stroke="#fbbf24" strokeWidth="2"/>
              {/* Coin in slot */}
              <circle cx="67" cy="47" r="8" fill="#fbbf24"/>
              <text x="67" y="51" textAnchor="middle" fill="#92400e" fontSize="8" fontWeight="bold">$</text>
            </svg>

            {/* Streaming coins animation */}
            <div className="absolute top-4 -right-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg shadow-amber-500/50 flex items-center justify-center"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{
                    x: [0, 60, 80],
                    y: [0, -10, 20],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut"
                  }}
                >
                  <span className="text-amber-900 text-xs font-bold">$</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Real-time clock */}
          <motion.div
            className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/40"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2" opacity="0.5"/>
                <motion.line
                  x1="12" y1="12" x2="12" y2="6"
                  stroke="white" strokeWidth="2" strokeLinecap="round"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '12px 12px' }}
                />
                <motion.line
                  x1="12" y1="12" x2="16" y2="12"
                  stroke="white" strokeWidth="2" strokeLinecap="round"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '12px 12px' }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Per second indicator */}
          <motion.div
            className="absolute -left-4 top-0 px-2 py-1 bg-green-500 rounded-lg text-white text-xs font-bold shadow-lg"
            animate={{ opacity: [1, 0.5, 1], y: [-2, 2, -2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            LIVE
          </motion.div>
        </motion.div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Secure Permissions',
    description: 'Full control with ERC-7715',
    gradient: 'from-green-500/20 to-emerald-500/20',
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black/20 rounded-full blur-md" />

          {/* Glowing shield */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(34,197,94,0.3)',
                '0 0 40px rgba(34,197,94,0.5)',
                '0 0 20px rgba(34,197,94,0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative rounded-full"
          >
            <svg viewBox="0 0 100 110" className="w-40 h-44 drop-shadow-2xl">
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(34,197,94,0.3)" />
                  <stop offset="100%" stopColor="rgba(16,185,129,0.2)" />
                </linearGradient>
                <linearGradient id="shieldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              {/* Outer glow */}
              <motion.path
                d="M50 5 L90 22 L90 50 Q90 85 50 102 Q10 85 10 50 L10 22 Z"
                fill="none"
                stroke="url(#shieldStroke)"
                strokeWidth="1"
                opacity="0.3"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Main shield */}
              <path
                d="M50 10 L85 25 L85 52 Q85 82 50 97 Q15 82 15 52 L15 25 Z"
                fill="url(#shieldGrad)"
                stroke="url(#shieldStroke)"
                strokeWidth="3"
              />
              {/* Inner shield */}
              <path
                d="M50 22 L75 34 L75 52 Q75 74 50 86 Q25 74 25 52 L25 34 Z"
                fill="rgba(34,197,94,0.15)"
              />
              {/* Animated checkmark */}
              <motion.path
                d="M33 52 L45 66 L70 40"
                fill="none"
                stroke="#22c55e"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
              />
            </svg>
          </motion.div>

          {/* Orbiting lock icons */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Security particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 80],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 80],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'MetaMask Wallet',
    description: 'Powered by Advanced Permissions',
    gradient: 'from-orange-500/20 to-amber-500/20',
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Orbiting rings */}
        <OrbitingRing size={280} duration={15} />
        <OrbitingRing size={240} duration={12} delay={0.5} reverse />
        <OrbitingRing size={200} duration={10} delay={1} />

        {/* MetaMask Logo with 3D effect */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateY: [0, 10, -10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-44 h-44 drop-shadow-2xl z-10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-2xl"
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <Image
            src="/images/metamask-fox.svg"
            alt="MetaMask Logo"
            fill
            className="object-contain relative z-10"
          />
        </motion.div>

        {/* Floating sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </motion.div>
        ))}

        {/* Connection lines */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[0, 72, 144, 216, 288].map((angle) => (
            <motion.div
              key={angle}
              className="absolute w-0.5 h-20 bg-gradient-to-b from-orange-500/50 to-transparent"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: 'top center',
                transform: `rotate(${angle}deg) translateY(-50px)`,
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: angle / 360 }}
            />
          ))}
        </motion.div>
      </div>
    ),
  },
];

export function Hero3DAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0">
        {/* Primary glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        {/* Secondary glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 bg-amber-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
        />
        {/* Accent glow based on active slide */}
        <motion.div
          className={`absolute top-1/2 left-1/2 w-60 h-60 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-1000 ${
            activeIndex === 2 ? 'bg-green-500/20' : 'bg-orange-400/20'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Main illustration carousel */}
      <div className="relative w-full max-w-md h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ perspective: 1000 }}
          >
            {/* 3D Illustration card */}
            <Card3D isActive={true}>
              <motion.div
                className={`relative w-72 h-72 rounded-3xl bg-gradient-to-br ${SLIDES[activeIndex].gradient} backdrop-blur-md border border-white/30 p-4 flex items-center justify-center shadow-2xl overflow-hidden`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />

                {SLIDES[activeIndex].illustration}
              </motion.div>
            </Card3D>

            {/* Title and description with animation */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.h3
                className="text-2xl font-bold text-white drop-shadow-lg"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(249,115,22,0.3)',
                    '0 0 20px rgba(249,115,22,0.5)',
                    '0 0 10px rgba(249,115,22,0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {SLIDES[activeIndex].title}
              </motion.h3>
              <p className="text-white/80 mt-2 drop-shadow-md text-lg">
                {SLIDES[activeIndex].description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced pagination dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveIndex(index)}
            className="relative group"
          >
            <motion.div
              className={`h-3 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? 'bg-gradient-to-r from-orange-400 to-amber-400 w-10'
                  : 'bg-white/30 w-3 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            {index === activeIndex && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
