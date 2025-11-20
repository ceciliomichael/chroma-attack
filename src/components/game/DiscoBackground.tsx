"use client";

import { motion } from 'framer-motion';

export function DiscoBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-disco-bg text-white perspective-1000">
      {/* Grid Floor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 transform rotate-x-60 scale-150 origin-bottom animate-pulse-fast" />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-disco-purple/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-disco-cyan/10 to-transparent pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
