'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// Background images for each use case
const BACKGROUND_IMAGES = {
  subscriptions: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&h=1080&fit=crop',
  salary: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&h=1080&fit=crop',
  dca: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&h=1080&fit=crop',
  donations: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=1080&fit=crop',
};

// Animated SVG Illustrations for each use case
const SubscriptionIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    {/* TV/Monitor */}
    <motion.rect
      x="20"
      y="25"
      width="80"
      height="55"
      rx="4"
      fill="#1e1b4b"
      stroke="#8b5cf6"
      strokeWidth="2"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    />
    {/* Screen */}
    <motion.rect
      x="26"
      y="31"
      width="68"
      height="43"
      rx="2"
      fill="#4c1d95"
    />
    {/* Play button */}
    <motion.path
      d="M52 45 L52 65 L72 55 Z"
      fill="#a78bfa"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
    />
    {/* Stand */}
    <rect x="50" y="80" width="20" height="6" fill="#6d28d9" rx="1" />
    <rect x="40" y="86" width="40" height="4" fill="#5b21b6" rx="2" />

    {/* Streaming waves */}
    {[0, 1, 2].map((i) => (
      <motion.path
        key={i}
        d={`M${85 + i * 8} 40 Q${90 + i * 8} 52 ${85 + i * 8} 64`}
        stroke="#a78bfa"
        strokeWidth="2"
        fill="none"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: [0, 1, 0], pathLength: [0, 1, 1] }}
        transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
      />
    ))}

    {/* Coins flowing */}
    {[0, 1, 2].map((i) => (
      <motion.g key={`coin-${i}`}>
        <motion.circle
          cx="15"
          cy="100"
          r="6"
          fill="#fbbf24"
          stroke="#f59e0b"
          strokeWidth="1"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: 45, y: -60, opacity: [1, 1, 0] }}
          transition={{ duration: 2, delay: i * 0.7, repeat: Infinity }}
        />
        <motion.text
          x="15"
          y="103"
          textAnchor="middle"
          fontSize="6"
          fill="#92400e"
          fontWeight="bold"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: 45, y: -60, opacity: [1, 1, 0] }}
          transition={{ duration: 2, delay: i * 0.7, repeat: Infinity }}
        >
          $
        </motion.text>
      </motion.g>
    ))}
  </svg>
);

const SalaryStreamIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    {/* Company building */}
    <motion.rect
      x="10"
      y="35"
      width="35"
      height="50"
      fill="#1e40af"
      rx="2"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
    {/* Building windows */}
    {[0, 1, 2].map((row) =>
      [0, 1].map((col) => (
        <motion.rect
          key={`window-${row}-${col}`}
          x={16 + col * 14}
          y={42 + row * 14}
          width="8"
          height="8"
          fill="#60a5fa"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, delay: (row + col) * 0.2, repeat: Infinity }}
        />
      ))
    )}

    {/* Clock on building */}
    <motion.circle cx="27" cy="25" r="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
    <motion.line
      x1="27"
      y1="25"
      x2="27"
      y2="20"
      stroke="#1e40af"
      strokeWidth="2"
      strokeLinecap="round"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '27px 25px' }}
    />
    <motion.line
      x1="27"
      y1="25"
      x2="31"
      y2="25"
      stroke="#1e40af"
      strokeWidth="2"
      strokeLinecap="round"
      animate={{ rotate: 360 }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: '27px 25px' }}
    />

    {/* Employee figures */}
    {[0, 1, 2].map((i) => (
      <motion.g key={`employee-${i}`}>
        {/* Head */}
        <motion.circle
          cx={85}
          cy={30 + i * 30}
          r="8"
          fill="#fcd34d"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.2 }}
        />
        {/* Body */}
        <motion.rect
          x={79}
          y={40 + i * 30}
          width="12"
          height="15"
          fill="#3b82f6"
          rx="3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.2 + 0.1 }}
        />
        {/* Wallet receiving */}
        <motion.rect
          x={100}
          y={35 + i * 30}
          width="14"
          height="12"
          fill="#10b981"
          rx="2"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.1, 1] }}
          transition={{ duration: 1, delay: i * 0.3, repeat: Infinity, repeatDelay: 1 }}
        />
      </motion.g>
    ))}

    {/* Streaming coins */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <motion.circle
        key={`stream-${i}`}
        cx="45"
        cy="60"
        r="4"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1"
        initial={{ x: 0, opacity: 0 }}
        animate={{
          x: [0, 35],
          y: [(i % 3) * 30 - 30, (i % 3) * 30 - 30],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 1.5,
          delay: i * 0.25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}

    {/* "Per Second" indicator */}
    <motion.text
      x="60"
      y="110"
      textAnchor="middle"
      fontSize="8"
      fill="#a78bfa"
      fontWeight="bold"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      /second
    </motion.text>
  </svg>
);

const DCAIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    {/* Graph background */}
    <rect x="15" y="20" width="90" height="70" fill="#1e1b4b" rx="4" />

    {/* Grid lines */}
    {[0, 1, 2, 3].map((i) => (
      <line
        key={`grid-h-${i}`}
        x1="20"
        y1={30 + i * 15}
        x2="100"
        y2={30 + i * 15}
        stroke="#4c1d95"
        strokeWidth="0.5"
      />
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <line
        key={`grid-v-${i}`}
        x1={25 + i * 18}
        y1="25"
        x2={25 + i * 18}
        y2="85"
        stroke="#4c1d95"
        strokeWidth="0.5"
      />
    ))}

    {/* Rising chart line */}
    <motion.path
      d="M25 75 L40 65 L55 70 L70 50 L85 55 L100 35"
      fill="none"
      stroke="#10b981"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
    />

    {/* Chart area fill */}
    <motion.path
      d="M25 75 L40 65 L55 70 L70 50 L85 55 L100 35 L100 85 L25 85 Z"
      fill="url(#chartGradient)"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.5, 0.5, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    <defs>
      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Buy points */}
    {[
      { x: 25, y: 75 },
      { x: 40, y: 65 },
      { x: 55, y: 70 },
      { x: 70, y: 50 },
      { x: 85, y: 55 },
    ].map((point, i) => (
      <motion.g key={`point-${i}`}>
        <motion.circle
          cx={point.x}
          cy={point.y}
          r="5"
          fill="#22c55e"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.5, delay: i * 0.4 + 0.5, repeat: Infinity, repeatDelay: 2.5 }}
        />
        {/* Coin dropping into point */}
        <motion.circle
          cx={point.x}
          cy={point.y - 30}
          r="4"
          fill="#fbbf24"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 30, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.5, delay: i * 0.4, repeat: Infinity, repeatDelay: 2.5 }}
        />
      </motion.g>
    ))}

    {/* Calendar indicator */}
    <motion.g>
      <rect x="75" y="95" width="30" height="20" fill="#6d28d9" rx="3" />
      <rect x="75" y="95" width="30" height="6" fill="#8b5cf6" rx="3" />
      <text x="90" y="111" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">
        AUTO
      </text>
      {/* Repeat arrow */}
      <motion.path
        d="M108 105 A8 8 0 1 1 108 103"
        stroke="#a78bfa"
        strokeWidth="2"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '108px 105px' }}
      />
    </motion.g>
  </svg>
);

const DonationIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    {/* Heart container */}
    <motion.path
      d="M60 95 C20 65 20 35 45 25 C55 20 60 30 60 30 C60 30 65 20 75 25 C100 35 100 65 60 95"
      fill="#ec4899"
      initial={{ scale: 0.9 }}
      animate={{ scale: [0.9, 1, 0.9] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{ transformOrigin: '60px 60px' }}
    />

    {/* Heart glow */}
    <motion.path
      d="M60 95 C20 65 20 35 45 25 C55 20 60 30 60 30 C60 30 65 20 75 25 C100 35 100 65 60 95"
      fill="none"
      stroke="#f472b6"
      strokeWidth="3"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{ transformOrigin: '60px 60px' }}
    />

    {/* Creator avatar */}
    <motion.circle
      cx="60"
      cy="55"
      r="15"
      fill="#fbbf24"
      stroke="white"
      strokeWidth="2"
    />
    <motion.circle cx="55" cy="52" r="2" fill="#1e1b4b" />
    <motion.circle cx="65" cy="52" r="2" fill="#1e1b4b" />
    <motion.path
      d="M55 60 Q60 65 65 60"
      stroke="#1e1b4b"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />

    {/* Coins flowing to heart */}
    {[0, 1, 2, 3].map((i) => {
      const angle = (i * 90 + 45) * (Math.PI / 180);
      const startX = 60 + Math.cos(angle) * 55;
      const startY = 55 + Math.sin(angle) * 55;
      return (
        <motion.g key={`donation-${i}`}>
          <motion.circle
            cx={startX}
            cy={startY}
            r="6"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="1"
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{
              x: 60 - startX,
              y: 55 - startY,
              scale: [1, 1, 0]
            }}
            transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity }}
          />
          <motion.text
            x={startX}
            y={startY + 3}
            textAnchor="middle"
            fontSize="6"
            fill="#92400e"
            fontWeight="bold"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: 60 - startX,
              y: 55 - startY,
              opacity: [1, 1, 0]
            }}
            transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity }}
          >
            $
          </motion.text>
        </motion.g>
      );
    })}

    {/* Continuous flow indicator */}
    <motion.g>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`flow-dot-${i}`}
          cx={30 + i * 10}
          cy="105"
          r="3"
          fill="#a78bfa"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
      <text x="75" y="108" fontSize="8" fill="#a78bfa" fontWeight="bold">
        Continuous
      </text>
    </motion.g>

    {/* Sparkles around heart */}
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const angle = (i * 60) * (Math.PI / 180);
      const distance = 45;
      return (
        <motion.path
          key={`sparkle-${i}`}
          d={`M${60 + Math.cos(angle) * distance} ${55 + Math.sin(angle) * distance} l2 -4 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 z`}
          fill="#fbbf24"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
        />
      );
    })}
  </svg>
);

const USE_CASES = [
  {
    id: 'subscriptions',
    title: 'Subscriptions',
    desc: 'Netflix, Spotify, SaaS in crypto',
    illustration: SubscriptionIllustration,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'salary',
    title: 'Salary Streaming',
    desc: 'Pay employees per second',
    illustration: SalaryStreamIllustration,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'dca',
    title: 'DCA Investment',
    desc: 'Auto-buy crypto periodically',
    illustration: DCAIllustration,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'donations',
    title: 'Donations',
    desc: 'Support creators continuously',
    illustration: DonationIllustration,
    color: 'from-pink-500 to-rose-500',
  },
];

export function UseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeBackground, setActiveBackground] = useState<string>('subscriptions');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Auto-rotate backgrounds when no card is hovered
  useEffect(() => {
    if (hoveredCard) {
      setActiveBackground(hoveredCard);
      return;
    }

    const backgrounds = Object.keys(BACKGROUND_IMAGES);
    let currentIndex = backgrounds.indexOf(activeBackground);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % backgrounds.length;
      setActiveBackground(backgrounds[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [hoveredCard, activeBackground]);

  // Track mouse position for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBackground}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              x: { duration: 0.1, ease: 'linear' },
              y: { duration: 0.1, ease: 'linear' },
            }}
          >
            <Image
              src={BACKGROUND_IMAGES[activeBackground as keyof typeof BACKGROUND_IMAGES]}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-900/85 to-blue-900/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        {/* Animated mesh overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
            }}
            animate={{
              y: [-30, 30],
              x: [-10, 10],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Background indicator with labels */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        {USE_CASES.map((useCase) => (
          <motion.button
            key={useCase.id}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
              activeBackground === useCase.id
                ? 'bg-white/20 backdrop-blur-sm'
                : 'bg-transparent hover:bg-white/10'
            }`}
            onClick={() => setActiveBackground(useCase.id)}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeBackground === useCase.id ? 'bg-white' : 'bg-white/40'
              }`}
              animate={activeBackground === useCase.id ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span
              className={`text-xs font-medium transition-all duration-300 ${
                activeBackground === useCase.id ? 'text-white' : 'text-white/50'
              }`}
            >
              {useCase.title}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              ⚡
            </motion.span>
            Automate Everything
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What Can You Automate?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            From subscriptions to salaries, FlowPay handles all your recurring crypto payments
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredCard(useCase.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 overflow-hidden cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -5,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                />

                {/* Illustration container */}
                <div className="relative h-32 mb-4">
                  <motion.div
                    animate={hoveredCard === useCase.id ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-full h-full"
                  >
                    <useCase.illustration />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative text-center">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors">
                    {useCase.desc}
                  </p>
                </div>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={hoveredCard === useCase.id ? { translateX: '200%' } : {}}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>

              {/* Glow effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${useCase.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10`}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 text-sm">
            And many more use cases waiting to be explored...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
