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
  private seed: number;
  constructor(seedStr: string) {
    let t = 0;
    for (let i = 0; i < seedStr.length; i++) t = (t << 5) - t + seedStr.charCodeAt(i);
    this.seed = t;
  }
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

export function generateBoard(size: BoardSize, seed: string): BoggleBoard {
  const rng = new SeededRandom(seed);
  const dice = size === 5 ? [...DICE_5X5] : [...DICE_4X4];
  
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
      const die = dice[idx] || "AAAAAA";
      const letter = die[Math.floor(rng.next() * die.length)];
      tiles[r][c] = {
        letter: letter === "Q" ? "Qu" : letter,
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
  
  if (size === 4) {
    if (len === 3 || len === 4) return 1;
    if (len === 5) return 2;
    if (len === 6) return 3;
    if (len === 7) return 5;
    return 11;
  } else {
    // Big Boggle Scoring typically ignores 3-letter words by default, 
    // but we'll allow 1pt for 3-letters if user chose minLen 3
    if (len === 3) return 1; 
    if (len === 4) return 1;
    if (len === 5) return 2;
    if (len === 6) return 3;
    if (len === 7) return 5;
    return 11;
  }
}

export function areAdjacent(row1: number, col1: number, row2: number, col2: number): boolean {
  const rowDiff = Math.abs(row1 - row2);
  const colDiff = Math.abs(col1 - col2);
  return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
}
