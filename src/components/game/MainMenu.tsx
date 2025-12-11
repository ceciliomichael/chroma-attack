"use client";

import { motion } from 'framer-motion';
import { GameMode } from '@/types/game';
import { Zap, Clock, Trophy } from 'lucide-react';

interface MainMenuProps {
  onStart: (mode: GameMode) => void;
  highScore: number;
  onButtonClick?: () => void;
}

export function MainMenu({ onStart, highScore, onButtonClick }: MainMenuProps) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-white p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-disco-cyan via-white to-disco-pink animate-pulse">
          CHROMA<br />PANIC
        </h1>
        <p className="text-gray-400 tracking-widest uppercase text-sm md:text-base">
          Don't Panic It's Organic
        </p>
      </motion.div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <MenuButton
          icon={<Zap className="w-5 h-5" />}
          title="SURVIVAL"
          desc="3 Lives. Endless Speed."
          onClick={() => {
            onButtonClick?.();
            onStart('survival');
          }}
          color="border-disco-pink text-disco-pink hover:bg-disco-pink/10"
        />
        
        <MenuButton
          icon={<Clock className="w-5 h-5" />}
          title="TIME ATTACK"
          desc="60 Seconds. High Score."
          onClick={() => {
            onButtonClick?.();
            onStart('time');
          }}
          color="border-disco-cyan text-disco-cyan hover:bg-disco-cyan/10"
        />
      </div>

      {highScore > 0 && (
        <div className="mt-12 flex items-center gap-2 text-disco-yellow/80">
          <Trophy className="w-4 h-4" />
          <span className="font-bold tracking-wider">BEST: {highScore.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}

function MenuButton({ title, desc, onClick, color, icon }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`group relative overflow-hidden p-6 border-2 ${color} bg-black/50 backdrop-blur rounded-xl text-left transition-colors`}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold italic">{title}</h3>
          <p className="text-xs opacity-70 font-mono mt-1">{desc}</p>
        </div>
        {icon}
      </div>
    </motion.button>
  );
}
