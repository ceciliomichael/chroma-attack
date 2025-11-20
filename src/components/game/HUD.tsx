"use client";

import { GameState, ColorId } from '@/types/game';
import { COLORS } from '@/lib/constants';
import { Heart, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

interface HUDProps {
  state: GameState;
}

export function HUD({ state }: HUDProps) {
  const targetHex = COLORS[state.targetColor];

  return (
    <div className="fixed top-0 left-0 w-full p-2 sm:p-4 z-50 flex flex-col items-center pointer-events-none">
      {/* Top Bar: Stats */}
      <div className="w-full max-w-3xl flex justify-between items-center text-white text-base sm:text-xl font-bold drop-shadow-lg">
        <div className="flex items-center gap-2">
          {state.mode === 'survival' ? (
             <div className="flex gap-1">
               {Array.from({ length: Math.max(0, state.lives) }).map((_, i) => (
                 <Heart key={i} className="fill-disco-red text-disco-red w-5 h-5 sm:w-6 sm:h-6 animate-pulse-fast" />
               ))}
             </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2 text-disco-yellow">
              <Timer className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{state.timeLeft}s</span>
            </div>
          )}
        </div>
        
        <div className="text-xl sm:text-2xl tracking-wider sm:tracking-widest neon-text">
          {state.score.toLocaleString()}
        </div>
      </div>

      {/* Main Instruction - The "truth" */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        key={state.targetColor} // Re-animate on change
        className="mt-2 sm:mt-4 px-4 py-2 sm:px-8 sm:py-4 bg-black/60 backdrop-blur-md border-2 border-white/20 rounded-xl sm:rounded-2xl flex flex-col items-center"
      >
        <span className="text-gray-300 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-1">Target</span>
        <div 
          className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center gap-2 sm:gap-3"
          style={{ color: targetHex, textShadow: `0 0 20px ${targetHex}` }}
        >
          CLICK {state.targetColor}
        </div>
      </motion.div>
    </div>
  );
}
