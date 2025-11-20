"use client";

import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-disco-bg">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" 
           style={{ backgroundSize: '50px 50px' }} />
      
      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-disco-cyan/20 rounded-full blur-[100px] animate-pulse-fast" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-disco-pink/20 rounded-full blur-[100px] animate-pulse-fast" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-4xl"
      >
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6"
        >
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-disco-cyan via-disco-pink to-disco-yellow animate-pulse-fast">
            CHROMA
          </span>
          <span className="block text-white mt-2">
            PANIC
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase mb-12"
        >
          Don't Click The Wrong Color
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/game">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-disco-cyan text-black font-bold text-xl rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,243,255,0.5)] hover:shadow-[0_0_50px_rgba(0,243,255,0.8)] transition-all w-full sm:w-auto min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Play className="w-6 h-6 fill-current" />
                PLAY NOW
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.button>
          </Link>

          <Link href="/how-to-play">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 border-2 border-white/20 text-white font-bold text-xl rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all w-full sm:w-auto min-w-[200px]"
            >
              <span className="flex items-center justify-center gap-2">
                <Info className="w-6 h-6" />
                HOW TO PLAY
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-3 text-sm"
        >
          {['STROOP EFFECT', 'REACTION GAME', 'COLOR CHAOS'].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400 tracking-wider"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
