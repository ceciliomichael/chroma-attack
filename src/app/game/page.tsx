"use client";

import { useEffect, useState } from 'react';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useSound } from '@/hooks/useSound';
import { DiscoBackground } from '@/components/game/DiscoBackground';
import { GameBox } from '@/components/game/GameBox';
import { HUD } from '@/components/game/HUD';
import { MainMenu } from '@/components/game/MainMenu';
import { GameOver } from '@/components/game/GameOver';
import { AnimatePresence, motion } from 'framer-motion';

export default function GamePage() {
  const { playGoodMp3, playFailMp3, playClick, playBgm, stopBgm } = useSound();
  const { gameState, startGame, handleBoxClick, setGameState } = useGameLogic({
    onCorrect: playGoodMp3,
    onFail: playFailMp3,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Control BGM based on game status
  useEffect(() => {
    if (gameState.status === 'playing') {
      playBgm();
    } else {
      stopBgm();
    }
  }, [gameState.status, playBgm, stopBgm]);

  if (!mounted) return null;

  return (
    <main className="w-full h-screen overflow-hidden select-none">
      <DiscoBackground>
        <AnimatePresence mode="popLayout">
          {gameState.status === 'playing' && (
            <motion.div 
              key="game-playing"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HUD state={gameState} />
              
              {/* Game Area */}
              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence>
                  {gameState.boxes.map((box) => (
                    <GameBox 
                      key={box.id} 
                      box={box} 
                      onClick={handleBoxClick} 
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {gameState.status === 'menu' && (
            <MainMenu
              onStart={startGame}
              highScore={gameState.highScore}
              onButtonClick={playClick}
            />
          )}
          
          {gameState.status === 'gameover' && (
            <GameOver
              score={gameState.score}
              onRestart={() => startGame(gameState.mode)}
              onHome={() => setGameState(prev => ({ ...prev, status: 'menu' }))}
              onButtonClick={playClick}
            />
          )}
        </AnimatePresence>
      </DiscoBackground>
    </main>
  );
}
