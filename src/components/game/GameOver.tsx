"use client";

import { motion } from 'framer-motion';
import { RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface GameOverProps {
  score: number;
  onRestart: () => void;
  onHome?: () => void;
}

export function GameOver({ score, onRestart, onHome }: GameOverProps) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur text-white p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h2 className="text-6xl font-black text-disco-red mb-2">GAME OVER</h2>
        <div className="text-4xl font-bold mb-8 text-disco-yellow">
          {score.toLocaleString()} PTS
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onRestart}
            className="p-4 rounded-full bg-white text-black hover:scale-110 transition-transform"
          >
            <RotateCcw className="w-8 h-8" />
          </button>
          <Link href="/">
            <button
              className="p-4 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-transform"
            >
              <Home className="w-8 h-8" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
