import { BoggleBoard, BoardSize, BoggleTile } from "./types";

// Standard Boggle Dice (Classic and Big)
const DICE_4X4 = [
  "AAEEGN", "ELRTTY", "AOOTTW", "ABBJOO",
  "EHRTVW", "CIMOTU", "DISTTY", "EIOSST",
  "DELRVY", "ACHOPS", "HIMNQU", "EEINSU",
  "EEGHNW", "AFFKPS", "HLNNRZ", "DEILRX"
];

const DICE_5X5 = [
  "AAAFRS", "AAEEEE", "AAFIRS", "ADENNN", "AEEEEM",
  "AEEGMU", "AEGMNN", "AFIRSY", "BJKQXZ", "CCNSTW",
  "CEIILT", "CEILPT", "CEIPST", "DDLNOR", "DHHLOR",
  "DHHNOT", "DHLNOR", "EIIITT", "EMOTTT", "ENSSSU",
  "FIPRSY", "GORRVW", "HIPRRY", "NOOTUW", "OOOTTU"
];

export function generateSeed(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Simple seeded random to ensure shared boards later
class SeededRandom {
  private state: number;

  constructor(seedStr: string) {
    // A simple hash to convert string to numeric seed
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    this.state = Math.abs(hash) || 1;
  }

  // Linear Congruential Generator
  next(): number {
    this.state = (this.state * 1664525 + 1013904223) % 4294967296;
    return this.state / 4294967296;
  }
}

export function generateBoard(size: BoardSize, seed: string): BoggleBoard {
  const rng = new SeededRandom(seed);
  const diceSource = size === 5 ? [...DICE_5X5] : [...DICE_4X4];
  const dice = [...diceSource];
  
  // Shuffle dice
  for (let i = dice.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [dice[i], dice[j]] = [dice[j], dice[i]];
  }

  const tiles: BoggleTile[][] = [];
  for (let r = 0; r < size; r++) {
    tiles[r] = [];
    for (let c = 0; c < size; c++) {
      const idx = r * size + c;
      const die = dice[idx] || (size === 5 ? DICE_5X5[idx % 25] : DICE_4X4[idx % 16]);
      
      const charIdx = Math.floor(rng.next() * die.length);
      const dieLetter = die[charIdx] || "A";
      
      tiles[r][c] = {
        letter: dieLetter === "Q" ? "Qu" : dieLetter,
        row: r,
        col: c,
        id: `${r}-${c}`
      };
    }
  }

  return { size, tiles };
}

export function calculateScore(word: string | undefined, size: BoardSize, minWordLength: number): number {
  if (!word) return 0;
  const len = word.length;
  if (len < minWordLength) return 0;
  
  if (len === 3) return 1;
  if (len === 4) return 2;
  if (len === 5) return 3;
  if (len === 6) return 5;
  if (len === 7) return 8;
  return 13; // 8+
}

export function areAdjacent(row1: number, col1: number, row2: number, col2: number): boolean {
  const rowDiff = Math.abs(row1 - row2);
  const colDiff = Math.abs(col1 - col2);
  return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
}
