export interface BoggleTile {
  letter: string;
  row: number;
  col: number;
  id: string;
}

export type BoardSize = 4 | 5;

export interface BoggleBoard {
  size: BoardSize;
  tiles: BoggleTile[][];
}

export interface WordPath {
  word: string;
  path: string[]; // IDs of tiles
}

export interface BoggleSession {
  gameId: string;
  roomId?: string;
  hostId: string;
  boardConfig: {
    size: BoardSize;
    minWordLength: number;
    seed: string;
  };
  board: BoggleBoard;
  startTime: number;
  duration: number; // in seconds
  players: {
    [uid: string]: {
      name: string;
      words: WordPath[];
      score: number;
    };
  };
  status: "lobby" | "playing" | "ended";
}
