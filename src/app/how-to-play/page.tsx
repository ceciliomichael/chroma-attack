"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Target, Zap, Brain, Timer } from 'lucide-react';
import Link from 'next/link';

export default function HowToPlayPage() {
  return (
    <main className="min-h-screen bg-disco-bg text-white overflow-y-auto py-12 px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" 
           style={{ backgroundSize: '50px 50px' }} />
      
      <div className="relative max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="mb-8 flex items-center gap-2 text-disco-cyan hover:text-disco-pink transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">BACK TO HOME</span>
          </motion.button>
        </Link>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-disco-cyan to-disco-pink"
        >
          HOW TO PLAY
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-xl mb-12"
        >
          Master the chaos. Beat your high score.
        </motion.p>

        {/* Game Modes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Zap className="w-8 h-8 text-disco-yellow" />
            Game Modes
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 border border-disco-pink/30 rounded-xl backdrop-blur">
              <h3 className="text-2xl font-bold text-disco-pink mb-2">SURVIVAL</h3>
              <p className="text-gray-300">Start with 3 lives. Speed increases endlessly. How long can you survive?</p>
            </div>
            
            <div className="p-6 bg-white/5 border border-disco-cyan/30 rounded-xl backdrop-blur">
              <h3 className="text-2xl font-bold text-disco-cyan mb-2">TIME ATTACK</h3>
              <p className="text-gray-300">60 seconds on the clock. Correct clicks add time. Wrong clicks remove time.</p>
            </div>
          </div>
        </motion.section>

        {/* The Core Mechanic */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Target className="w-8 h-8 text-disco-pink" />
            The Stroop Effect
          </h2>
          
          <div className="p-6 bg-gradient-to-br from-disco-purple/10 to-disco-cyan/10 border border-white/10 rounded-xl backdrop-blur">
            <p className="text-lg text-gray-200 mb-4">
              The game instruction tells you: <span className="font-bold text-disco-cyan">"CLICK BLUE"</span>
            </p>
            <p className="text-lg text-gray-200 mb-4">
              But here's the twist:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-disco-green font-bold mt-1">✓</span>
                <span>A box that is <strong className="text-disco-cyan">visually BLUE</strong> (border color) = CORRECT, even if the text says "RED"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-disco-red font-bold mt-1">✗</span>
                <span>A box that is <strong className="text-disco-red">visually RED</strong> but says "BLUE" = WRONG (it's a trap!)</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-black/30 rounded-lg border-l-4 border-disco-yellow">
              <p className="text-disco-yellow font-bold">
                💡 TIP: Trust the BORDER COLOR, not the text!
              </p>
            </div>
          </div>
        </motion.section>

        {/* Rules */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Brain className="w-8 h-8 text-disco-green" />
            Game Mechanics
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg border-l-4 border-disco-cyan">
              <h4 className="font-bold text-disco-cyan mb-1">Dynamic Target</h4>
              <p className="text-gray-300">The target color changes randomly after correct clicks to keep you on your toes.</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg border-l-4 border-disco-pink">
              <h4 className="font-bold text-disco-pink mb-1">Auto-Cleanup</h4>
              <p className="text-gray-300">Boxes disappear after 3 seconds. Maximum 8 boxes on screen at once.</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg border-l-4 border-disco-yellow">
              <h4 className="font-bold text-disco-yellow mb-1">Combo Multiplier</h4>
              <p className="text-gray-300">Chain correct clicks to build a score multiplier up to 3x!</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg border-l-4 border-disco-purple">
              <h4 className="font-bold text-disco-purple mb-1">Increasing Difficulty</h4>
              <p className="text-gray-300">Box spawn rate accelerates as you progress.</p>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link href="/game">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-disco-pink text-white font-black text-2xl rounded-xl shadow-[0_0_30px_rgba(188,19,254,0.5)] hover:shadow-[0_0_50px_rgba(188,19,254,0.8)] transition-all"
            >
              START PLAYING
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
