'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

// 3D Tilt Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating particles in background
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(135deg, ${
              ['#f97316', '#fbbf24', '#22c55e', '#3b82f6'][Math.floor(Math.random() * 4)]
            }, transparent)`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Glowing orb component
function GlowingOrb({ color, size, position, delay }: { color: string; size: number; position: { x: string; y: string }; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
        background: color,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

const FEATURES = [
  {
    id: 1,
    title: 'Automated Payments',
    description: 'Set up recurring payments that execute automatically without manual approval each time.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop',
    color: 'from-orange-500 to-amber-500',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    stats: { value: '100%', label: 'Automated' },
  },
  {
    id: 2,
    title: 'Secure Permissions',
    description: 'Powered by ERC-7715 with fine-grained controls. Revoke access anytime from MetaMask.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop',
    color: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    stats: { value: 'ERC-7715', label: 'Standard' },
  },
  {
    id: 3,
    title: 'Flexible Scheduling',
    description: 'Choose hourly, daily, weekly, or monthly payments. Or stream funds per second.',
    image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&h=400&fit=crop',
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    stats: { value: '24/7', label: 'Running' },
  },
  {
    id: 4,
    title: 'Spending Limits',
    description: 'Set maximum amounts per period. You control how much can be spent automatically.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop',
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    stats: { value: 'Full', label: 'Control' },
  },
];

// Feature card with 3D effects
function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="perspective-1000"
    >
      <TiltCard className="h-full">
        <motion.div
          className="relative h-full bg-white/10 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/50 overflow-hidden cursor-pointer"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${feature.glowColor}, transparent, ${feature.glowColor})`,
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          />

          {/* Inner content */}
          <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
            {/* Floating image */}
            <motion.div
              className={`relative w-20 h-20 rounded-2xl overflow-hidden shadow-2xl mb-6`}
              animate={isHovered ? {
                y: [-5, 5, -5],
                rotateZ: [-5, 5, -5],
              } : { y: 0, rotateZ: 0 }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
              style={{
                boxShadow: isHovered ? `0 20px 40px ${feature.glowColor}` : 'none',
              }}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-30`} />
            </motion.div>

            {/* Title with gradient */}
            <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed mb-6">
              {feature.description}
            </p>

            {/* Stats badge */}
            <motion.div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.color} bg-opacity-20`}
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            >
              <span className="text-white font-bold text-lg">{feature.stats.value}</span>
              <span className="text-white/70 text-sm">{feature.stats.label}</span>
            </motion.div>
          </div>

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? `0 0 60px ${feature.glowColor}, inset 0 0 60px ${feature.glowColor}`
                : '0 0 0px transparent',
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Corner sparkles */}
          {isHovered && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white"
                  style={{
                    top: i < 2 ? '10%' : '90%',
                    left: i % 2 === 0 ? '10%' : '90%',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

// Central showcase with MetaMask
function CentralShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center justify-center py-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Rotating rings */}
      {[300, 350, 400].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-dashed"
          style={{
            width: size,
            height: size,
            borderColor: `rgba(249, 115, 22, ${0.3 - i * 0.1})`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Orbiting images */}
      {FEATURES.map((feature, i) => (
        <motion.div
          key={feature.id}
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: i * 3.75 }}
          style={{ width: 350, height: 350 }}
        >
          <motion.div
            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-xl overflow-hidden shadow-xl`}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: i * 3.75 }}
            whileHover={{ scale: 1.2 }}
          >
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-40`} />
          </motion.div>
        </motion.div>
      ))}

      {/* Central MetaMask logo */}
      <motion.div
        className="relative w-32 h-32 z-10"
        animate={{
          y: [0, -10, 0],
          rotateY: [0, 360],
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
        }}
      >
        {/* Glow behind logo */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Image
          src="/images/metamask-fox.svg"
          alt="MetaMask"
          fill
          className="object-contain relative z-10"
        />
      </motion.div>

      {/* Pulsing rings around center */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full border-2 border-orange-500/30"
          style={{ width: 150 + i * 40, height: 150 + i * 40 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.div>
  );
}

// Animated counter
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/\D/g, ''));
      if (!isNaN(numericValue)) {
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            setDisplayValue(value);
            clearInterval(timer);
          } else {
            setDisplayValue(Math.floor(current).toString() + (value.includes('%') ? '%' : value.includes('+') ? '+' : ''));
          }
        }, 30);
        return () => clearInterval(timer);
      } else {
        setDisplayValue(value);
      }
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
    >
      <motion.div
        className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"
        animate={{ scale: isInView ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.5 }}
      >
        {displayValue}
      </motion.div>
      <div className="text-gray-400 mt-2">{label}</div>
    </motion.div>
  );
}

export function WhyFlowPay() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black"
    >
      {/* Animated background */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: backgroundY }}>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Glowing orbs */}
        <GlowingOrb color="rgba(249, 115, 22, 0.3)" size={400} position={{ x: '10%', y: '20%' }} delay={0} />
        <GlowingOrb color="rgba(34, 197, 94, 0.2)" size={300} position={{ x: '80%', y: '60%' }} delay={1} />
        <GlowingOrb color="rgba(59, 130, 246, 0.2)" size={350} position={{ x: '60%', y: '10%' }} delay={2} />
        <GlowingOrb color="rgba(168, 85, 247, 0.2)" size={250} position={{ x: '20%', y: '70%' }} delay={3} />
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with dramatic entrance */}
        <motion.div
          className="text-center mb-20"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Glowing badge */}
            <motion.span
              className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium mb-6"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(249, 115, 22, 0.3)',
                  '0 0 40px rgba(249, 115, 22, 0.5)',
                  '0 0 20px rgba(249, 115, 22, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                ⚡
              </motion.span>
              Powerful Features
            </motion.span>

            {/* Main title with reveal effect */}
            <motion.h2
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Why{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  FlowPay
                </span>
                {/* Underline animation */}
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </span>
              ?
            </motion.h2>

            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience the future of automated crypto payments with powerful features designed for you.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Central showcase */}
        <CentralShowcase />

        {/* Features grid with 3D cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 py-12 border-t border-b border-gray-800"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <AnimatedCounter value="100%" label="Automated" />
          <AnimatedCounter value="24/7" label="Uptime" />
          <AnimatedCounter value="0" label="Gas Approvals" />
          <AnimatedCounter value="∞" label="Possibilities" />
        </motion.div>

        {/* Bottom CTA with glow */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            className="relative px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-lg font-bold rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10 flex items-center gap-3">
              Start Automating Now
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          {/* Glow effect under button */}
          <motion.div
            className="mx-auto mt-4 w-64 h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-xl"
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
