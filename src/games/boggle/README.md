# Boggle

A fast-paced word discovery game with seeded board generation.

## Architecture

### Logic Layer (`engine.ts`)
The core engine handles board generation using authentic Boggle dice distributions.

**Features:**
- **Deterministic Generation**: Uses a `SeededRandom` (Linear Congruential Generator) to ensure that a given seed string always produces the same board.
- **Dice Sets**:
    - `DICE_4X4`: Classic 16-dice set.
    - `DICE_5X5`: "Big Boggle" 25-dice set.
- **Scoring**: Standard Boggle point system based on word length.
- **Adjacency Validation**: Logic to ensure selected letters are contiguous (horizontally, vertically, or diagonally).

### UI Layer
- `Setup.tsx`: Handles pre-game configuration (Board Size, Game Duration).
- `UI.tsx`: The active game interface.
    - Implements a drag-and-connect interaction model for word selection.
    - Maintains a list of found words and checks against a local dictionary (via `wordEngine`).

### Shared Library Integration
- Integrates with `src/lib/wordEngine.ts` to validate discovered words against a standard dictionary.

## How it Works
1. Players choose a board size and time limit.
2. The engine generates a board by shuffling the selected dice set and picking a random face for each die.
3. Players connect adjacent letters to form words.
4. "Qu" is handled as a single tile but scores as two letters.
5. Score is calculated automatically at the end of the round.
