export type CellState = "peg" | "empty" | "invalid";

// The board is a 7x7 grid. Classic cross shape.
// Coordinates: (row, col) from 0,0 to 6,6
export const BOARD_SIZE = 7;

export const INITIAL_BOARD: CellState[][] = [
  ["invalid", "invalid", "peg", "peg", "peg", "invalid", "invalid"],
  ["invalid", "invalid", "peg", "peg", "peg", "invalid", "invalid"],
  ["peg", "peg", "peg", "peg", "peg", "peg", "peg"],
  ["peg", "peg", "peg", "empty", "peg", "peg", "peg"], // Center empty
  ["peg", "peg", "peg", "peg", "peg", "peg", "peg"],
  ["invalid", "invalid", "peg", "peg", "peg", "invalid", "invalid"],
  ["invalid", "invalid", "peg", "peg", "peg", "invalid", "invalid"],
];

export interface Position {
  r: number;
  c: number;
}

export function isValidPosition(r: number, c: number): boolean {
  return r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && INITIAL_BOARD[r][c] !== "invalid";
}

export function getLegalMoves(board: CellState[][], pos: Position): Position[] {
  if (board[pos.r][pos.c] !== "peg") return [];

  const moves: Position[] = [];
  const directions = [
    { dr: -2, dc: 0, mr: -1, mc: 0 }, // Up
    { dr: 2, dc: 0, mr: 1, mc: 0 },  // Down
    { dr: 0, dc: -2, mr: 0, mc: -1 }, // Left
    { dr: 0, dc: 2, mr: 0, mc: 1 },  // Right
  ];

  for (const { dr, dc, mr, mc } of directions) {
    const tr = pos.r + dr; // target row
    const tc = pos.c + dc; // target col
    const jr = pos.r + mr; // jumped row
    const jc = pos.c + mc; // jumped col

    if (
      isValidPosition(tr, tc) &&
      board[tr][tc] === "empty" &&
      board[jr][jc] === "peg"
    ) {
      moves.push({ r: tr, c: tc });
    }
  }

  return moves;
}

export function makeMove(board: CellState[][], from: Position, to: Position): CellState[][] {
  const newBoard = board.map(row => [...row]);
  const mr = (from.r + to.r) / 2;
  const mc = (from.c + to.c) / 2;

  newBoard[from.r][from.c] = "empty";
  newBoard[mr][mc] = "empty";
  newBoard[to.r][to.c] = "peg";

  return newBoard;
}

export function countPegs(board: CellState[][]): number {
  let count = 0;
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === "peg") count++;
    }
  }
  return count;
}

export function hasAnyLegalMoves(board: CellState[][]): boolean {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === "peg") {
        if (getLegalMoves(board, { r, c }).length > 0) return true;
      }
    }
  }
  return false;
}
