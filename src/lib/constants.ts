import { ColorId } from "@/types/game";

export const COLORS: Record<ColorId, string> = {
  red: '#ff003c',
  blue: '#00f3ff',
  green: '#0aff68',
  yellow: '#ffe600',
  purple: '#bc13fe',
  pink: '#ff00ff',
};

export const COLOR_IDS: ColorId[] = ['red', 'blue', 'green', 'yellow', 'purple', 'pink'];

export const GAME_CONFIG = {
  survival: {
    initialLives: 3,
    baseSpawnRate: 1500,
    minSpawnRate: 400,
  },
  time: {
    initialTime: 60,
    timeBonus: 2,
    timePenalty: 5,
  },
  boxSize: 80, // px
  mobileBoxSize: 60, // px
};
