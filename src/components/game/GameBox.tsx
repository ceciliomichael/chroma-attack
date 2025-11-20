"use client";

import { motion } from 'framer-motion';
import { GameBox as BoxType } from '@/types/game';
import { COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface GameBoxProps {
  box: BoxType;
  onClick: (id: string) => void;
}

export function GameBox({ box, onClick }: GameBoxProps) {
  // Determine colors
  const visualHex = COLORS[box.visualColor];
  // The text color should contrast? Or be white?
  // The prompt says "A red box says 'Blue'".
  // So the box background/border is Red (visualHex).
  // The text is "BLUE" (box.textLabel).
  
  return (
    <motion.button
      layoutId={box.id}
      initial={{ scale: 0, opacity: 0, rotateX: 90 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        rotateX: 0,
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={cn(
        "absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center border-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]",
        "backdrop-blur-sm bg-black/40 font-black text-xs sm:text-sm md:text-base tracking-wider uppercase rounded-lg cursor-pointer touch-manipulation"
      )}
      style={{
        left: `${box.x}%`,
        top: `${box.y}%`,
        borderColor: visualHex,
        color: 'white', // Always white text? Or colored text?
        // Let's try colored glow
        boxShadow: `0 0 20px ${visualHex}40, inset 0 0 10px ${visualHex}20`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={() => onClick(box.id)}
    >
      {/* Inner Text */}
      <span className="drop-shadow-md select-none" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
        {box.textLabel}
      </span>
    </motion.button>
  );
}
