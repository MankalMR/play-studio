# Wordwheel Cross

A sophisticated hybrid of word-search and crossword puzzles with a premium tactile interface.

## Architecture

### Data Layer (`data/puzzles.ts`)
Contains a collection of pre-defined puzzles. Each puzzle includes:
- `id`: Unique identifier.
- `letters`: The pool of letters available on the wheel.
- `grid`: The layout of the crossword.
- `words`: The set of words to be found.

### Service Layer (`services/geminiService.ts`)
While currently configured to pull from the local `puzzles.ts` library, the service is architected to allow for AI-generated puzzles. It manages:
- Puzzle selection logic.
- Difficulty scaling.

### Component Architecture
The game is split into distinct interactive zones:
- **`WordWheel.tsx`**: The letter selection interface. Features a rotating circular wheel with smooth path-drawing for word selection.
- **`CrosswordGrid.tsx`**: The puzzle grid. Dynamically renders based on the selected puzzle's word intersections.
- **`infoDialog.tsx`**: A polished modal system for level completion and instructions.

### Hooks & Audio (`hooks/useAudio.ts`)
- Manages game-wide sound effects (tactile clicks, success fanfares, incorrect word feedback).
- Implements background music management with volume control.

## How it Works
1. A puzzle is selected from the library (or generated).
2. Letters are arranged on a circular wheel.
3. Players spin the wheel and drag through letters to form words.
4. Valid words are automatically populated into the crossword grid if they match the puzzle's layout.
5. The level is complete when all words in the grid are discovered.
6. Features advanced animations like "rainbow-borders" for the victory state, defined in the root `index.css`.
