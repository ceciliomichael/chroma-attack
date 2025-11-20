export type GameMode = 'survival' | 'time';

export type ColorId = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink';

export interface GameColor {
  id: ColorId;
  label: string; // The text to display (e.g. "BLUE")
  hex: string;   // The visual color hex
}

export interface GameBox {
  id: string;
  x: number;      // Percentage 0-100
  y: number;      // Percentage 0-100
  visualColor: ColorId;
  textLabel: ColorId; // The text shown might contradict visualColor
  isTrap: boolean;    // Derived from game rule (if visual != target)
  createdAt: number;
}

export interface GameState {
  status: 'menu' | 'playing' | 'paused' | 'gameover';
  mode: GameMode;
  score: number;
  highScore: number;
  lives: number;      // For survival
  timeLeft: number;   // For time mode
  targetColor: ColorId; // The current instruction "CLICK [COLOR]"
  boxes: GameBox[];
  multiplier: number;
  difficultyLevel: number;
}
