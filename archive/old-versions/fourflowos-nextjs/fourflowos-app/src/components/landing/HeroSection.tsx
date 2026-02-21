'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, #FF6F61 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, #6BA292 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, #5B84B1 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, #7A4DA4 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, #FF6F61 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: '#FF6F61' }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-0 top-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: '#7A4DA4' }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/4 bottom-0 w-72 h-72 rounded-full blur-3xl opacity-15"
          style={{ background: '#6BA292' }}
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Animated logo */}
        <motion.div
          className="relative w-40 h-40 md:w-56 md:h-56 mx-auto mb-8"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            duration: 1.5,
          }}
        >
          {/* Glowing ring behind logo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #FF6F61, #6BA292, #5B84B1, #7A4DA4, #FF6F61)',
              filter: 'blur(20px)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Logo image */}
          <div className="absolute inset-4 rounded-full overflow-hidden bg-[#0a0a0a]">
            <Image
              src="/assets/LOGOS/FOURFLOW - MAIN LOGO.png"
              alt="FourFlowOS"
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        </motion.div>

        {/* Title with gradient text */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-[#FF6F61] via-[#6BA292] via-[#5B84B1] to-[#7A4DA4] bg-clip-text text-transparent">
            FourFlowOS
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          The Operating System for Flow States
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Stop forcing focus. Start aligning the four dimensions that create it naturally.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <a
            href="#framework"
            className="px-8 py-4 bg-gradient-to-r from-[#FF6F61] to-[#7A4DA4] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            Discover the Framework
          </a>
          <a
            href="#apps"
            className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-full hover:bg-white/5 hover:border-gray-400 transition-all duration-300"
          >
            Explore Our Apps
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-3 bg-gray-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
