# Peg Solitaire

A premium implementation of the classic English Peg Solitaire (Noble Game).

## Architecture

### Logic Layer (`engine.ts`)
The game state is managed as a 2D array of `CellState`:
- `peg`: An active peg.
- `empty`: A hole without a peg.
- `invalid`: Areas outside the cross shape.

**Key Functions:**
- `getLegalMoves`: Calculates valid jumps (moving 2 spaces over a peg into an empty hole).
- `makeMove`: Updates the board state by removing the jumped peg and the source peg, and placing a peg in the target hole.
- `countPegs`: Used to determine win/loss conditions.

### UI Layer (`UI.tsx`)
- Uses `motion` for tactile feedback when selecting and moving pegs.
- Implements a selection-first workflow: Click a peg to see available moves, then click a target to jump.
- Supports both Midnight and Linen themes via global layout context.

## How it Works
1. The game initializes with a central empty hole.
2. Players select a peg. The engine highlights valid target cells.
3. Upon a valid move, the jumped peg is "removed" (set to `empty`).
4. The game ends when no more legal moves exist.
5. Goal: Leave exactly one peg in the center of the board.
