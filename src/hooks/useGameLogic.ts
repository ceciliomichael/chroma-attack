"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GameState, GameMode, GameBox, ColorId } from '@/types/game';
import { COLORS, COLOR_IDS, GAME_CONFIG } from '@/lib/constants';

interface UseGameLogicOptions {
  onCorrect?: () => void;
  onFail?: () => void;
}

export function useGameLogic(options: UseGameLogicOptions = {}) {
  const { onCorrect, onFail } = options;
  const [gameState, setGameState] = useState<GameState>({
    status: 'menu',
    mode: 'survival',
    score: 0,
    highScore: 0,
    lives: 3,
    timeLeft: 60,
    targetColor: 'blue',
    boxes: [],
    multiplier: 1,
    difficultyLevel: 1,
  });

  // Refs for loop management to avoid dependency stale closures
  const stateRef = useRef(gameState);
  const requestRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const spawnRateRef = useRef<number>(GAME_CONFIG.survival.baseSpawnRate);

  // Sync ref
  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  const startGame = (mode: GameMode) => {
    const initialTarget = COLOR_IDS[Math.floor(Math.random() * COLOR_IDS.length)];
    setGameState({
      status: 'playing',
      mode,
      score: 0,
      highScore: stateRef.current.highScore,
      lives: GAME_CONFIG.survival.initialLives,
      timeLeft: GAME_CONFIG.time.initialTime,
      targetColor: initialTarget,
      boxes: [],
      multiplier: 1,
      difficultyLevel: 1,
    });
    lastSpawnRef.current = 0;
    spawnRateRef.current = GAME_CONFIG.survival.baseSpawnRate;
  };

  const spawnBox = useCallback(() => {
    const { targetColor, difficultyLevel } = stateRef.current;
    
    // Decide if this box should be a "correct" one or a "trap"
    // As difficulty increases, traps become more frequent
    // But we must ensure at least SOME correct boxes appear
    const isTarget = Math.random() > 0.6; // 40% chance to be the target visual color
    
    let visualColor: ColorId;
    if (isTarget) {
      visualColor = targetColor;
    } else {
      // Pick a random color that IS NOT the target
      const others = COLOR_IDS.filter(c => c !== targetColor);
      visualColor = others[Math.floor(Math.random() * others.length)];
    }

    // Text Label Logic (Stroop Effect)
    // 50% chance text matches color (Easy) -> lower chance as difficulty up
    const textMatchesVisual = Math.random() > (0.3 + (difficultyLevel * 0.05));
    let textLabel: ColorId;
    
    if (textMatchesVisual) {
      textLabel = visualColor;
    } else {
      const allColors = COLOR_IDS;
      textLabel = allColors[Math.floor(Math.random() * allColors.length)];
    }

    // Safer boundaries for mobile - boxes are centered with transform translate(-50%, -50%)
    // So we need to keep them between 15% and 85% to prevent overflow
    const newBox: GameBox = {
      id: uuidv4(),
      x: Math.random() * 70 + 15, // 15% to 85%
      y: Math.random() * 50 + 30, // 30% to 80% (keep top clear for HUD, bottom safe)
      visualColor,
      textLabel,
      isTrap: visualColor !== targetColor, // If visual color != target, DO NOT CLICK
      createdAt: Date.now(),
    };

    setGameState(prev => ({
      ...prev,
      boxes: [...prev.boxes, newBox]
    }));
  }, []);

  const gameLoop = useCallback((time: number) => {
    const { status, mode, timeLeft, lives } = stateRef.current;

    if (status !== 'playing') return;

    // Initialize on first frame
    if (lastSpawnRef.current === 0) {
      lastSpawnRef.current = time;
    }

    // Check Game Over
    if (mode === 'survival' && lives <= 0) {
      setGameState(prev => ({ ...prev, status: 'gameover' }));
      return;
    }
    if (mode === 'time' && timeLeft <= 0) {
      setGameState(prev => ({ ...prev, status: 'gameover' }));
      return;
    }

    // Auto-cleanup old boxes (remove after 3 seconds)
    const now = Date.now();
    const activeBoxes = stateRef.current.boxes.filter(box => now - box.createdAt < 3000);
    if (activeBoxes.length !== stateRef.current.boxes.length) {
      setGameState(prev => ({
        ...prev,
        boxes: activeBoxes
      }));
    }

    // Spawning - only if we don't have too many boxes
    if (time - lastSpawnRef.current > spawnRateRef.current && activeBoxes.length < 8) {
      spawnBox();
      lastSpawnRef.current = time;
      
      // Speed up
      spawnRateRef.current = Math.max(
        GAME_CONFIG.survival.minSpawnRate,
        spawnRateRef.current * 0.98
      );
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [spawnBox]);

  useEffect(() => {
    if (gameState.status === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState.status, gameLoop]);

  // Timer for Time Mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState.status === 'playing' && gameState.mode === 'time') {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: Math.max(0, prev.timeLeft - 1)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.status, gameState.mode]);

  const handleBoxClick = (boxId: string) => {
    if (gameState.status !== 'playing') return;

    const box = gameState.boxes.find(b => b.id === boxId);
    if (!box) return;

    const isCorrect = !box.isTrap; // Correct if Visual Color == Target

    if (isCorrect) {
      // Success - change target color every 3-5 correct clicks
      onCorrect?.();
      setGameState(prev => {
        const shouldChangeColor = Math.random() > 0.6; // 40% chance to change
        const newTarget = shouldChangeColor
          ? COLOR_IDS[Math.floor(Math.random() * COLOR_IDS.length)]
          : prev.targetColor;
        
        return {
          ...prev,
          score: prev.score + (100 * prev.multiplier),
          boxes: prev.boxes.filter(b => b.id !== boxId),
          difficultyLevel: prev.difficultyLevel + 0.1,
          targetColor: newTarget,
          multiplier: shouldChangeColor ? 1 : Math.min(prev.multiplier + 0.5, 3),
          timeLeft: prev.mode === 'time' ? Math.min(prev.timeLeft + GAME_CONFIG.time.timeBonus, 60) : prev.timeLeft
        };
      });
    } else {
      // Fail
      onFail?.();
      if (gameState.mode === 'survival') {
        setGameState(prev => ({
          ...prev,
          lives: prev.lives - 1,
          boxes: prev.boxes.filter(b => b.id !== boxId),
          multiplier: 1 // Reset combo
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          timeLeft: Math.max(0, prev.timeLeft - GAME_CONFIG.time.timePenalty),
          boxes: prev.boxes.filter(b => b.id !== boxId),
          multiplier: 1
        }));
      }
    }
  };

  return {
    gameState,
    startGame,
    handleBoxClick,
    setGameState
  };
}
