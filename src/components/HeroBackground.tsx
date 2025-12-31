'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Aesthetic photos from Unsplash - crypto/finance themed
const BACKGROUND_IMAGES = [
  {
    id: 'crypto-gold',
    src: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1920&q=80',
    alt: 'Golden Bitcoin cryptocurrency',
    overlay: 'from-orange-950/85 via-amber-950/70 to-orange-900/85',
  },
  {
    id: 'blockchain',
    src: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80',
    alt: 'Ethereum blockchain',
    overlay: 'from-amber-950/85 via-orange-950/70 to-yellow-950/85',
  },
  {
    id: 'finance',
    src: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1920&q=80',
    alt: 'Cryptocurrency trading',
    overlay: 'from-orange-900/85 via-amber-900/70 to-orange-950/85',
  },
  {
    id: 'digital',
    src: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1920&q=80',
    alt: 'Digital currency',
    overlay: 'from-yellow-950/85 via-orange-950/70 to-amber-950/85',
  },
];

// Transition variants for images
const imageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    scale: 1.1,
    x: direction > 0 ? 100 : -100,
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: 'easeInOut' as const,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 1.05,
    x: direction < 0 ? 100 : -100,
    transition: {
      duration: 0.8,
      ease: 'easeInOut' as const,
    },
  }),
};

// Floating particles overlay - MetaMask orange themed
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-orange-400/50 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -35, 0],
          opacity: [0, 0.8, 0],
          scale: [0, 1.2, 0],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          delay: Math.random() * 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

// Glowing orbs - MetaMask orange/amber themed
const GlowingOrbs = () => (
  <>
    <motion.div
      className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-[100px]"
      animate={{
        x: [0, 50, 0],
        y: [0, 30, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-amber-500/20 rounded-full blur-[100px]"
      animate={{
        x: [0, -50, 0],
        y: [0, -30, 0],
        scale: [1, 1.3, 1],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
  </>
);

export function HeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentImage = BACKGROUND_IMAGES[currentIndex];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Background images with transitions */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Image */}
          <div className="absolute inset-0">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>

          {/* Gradient overlay - MetaMask orange themed */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentImage.overlay}`} />

          {/* Additional overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Animated overlays */}
      <GlowingOrbs />
      <FloatingParticles />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent" />

      {/* Animated lines - orange themed */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        {[...Array(4)].map((_, i) => (
          <motion.line
            key={i}
            x1="0%"
            y1={`${25 + i * 15}%`}
            x2="100%"
            y2={`${30 + i * 15}%`}
            stroke="url(#orangeLineGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
        <defs>
          <linearGradient id="orangeLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pagination dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {BACKGROUND_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Glow effect for active */}
            {index === currentIndex && (
              <motion.div
                layoutId="activeDot"
                className="absolute -inset-1 bg-orange-500/50 rounded-full blur-sm"
              />
            )}
            <div
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-orange-400 scale-100'
                  : 'bg-white/40 scale-75 hover:bg-white/60 hover:scale-90'
              }`}
            />
            {/* Progress bar for active slide */}
            {index === currentIndex && (
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-orange-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 6, ease: 'linear' }}
                key={`progress-${currentIndex}`}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
