'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#framework', label: 'Framework' },
    { href: '#apps', label: 'Apps' },
    { href: '/framework', label: 'Explore' },
    { href: '/privacy', label: 'Privacy' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        {/* Background */}
        <motion.div
          className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
          style={{ opacity: backgroundOpacity }}
        />

        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="/assets/LOGOS/FOURFLOW - MAIN LOGO.png"
                alt="FourFlowOS"
                fill
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">
              FourFlow<span className="text-gray-400">OS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#apps"
              className="px-5 py-2.5 bg-gradient-to-r from-[#FF6F61] to-[#7A4DA4] text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              Get the Apps
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-6 h-5">
              <motion.span
                className="absolute left-0 w-full h-0.5 bg-white rounded-full"
                animate={{
                  top: isMobileMenuOpen ? '50%' : '0%',
                  rotate: isMobileMenuOpen ? 45 : 0,
                  translateY: isMobileMenuOpen ? '-50%' : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-1/2 w-full h-0.5 bg-white rounded-full -translate-y-1/2"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 w-full h-0.5 bg-white rounded-full"
                animate={{
                  bottom: isMobileMenuOpen ? '50%' : '0%',
                  rotate: isMobileMenuOpen ? -45 : 0,
                  translateY: isMobileMenuOpen ? '50%' : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <motion.div
          className="absolute top-20 left-4 right-4 bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: isMobileMenuOpen ? 0 : -20,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-gray-300 transition-colors text-lg font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              <a
                href="#apps"
                className="block w-full text-center px-5 py-3 bg-gradient-to-r from-[#FF6F61] to-[#7A4DA4] text-white font-semibold rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get the Apps
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
