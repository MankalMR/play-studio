# Word Wheel Integration Guide

This game has been modularized to make it easy to add to your `play-studio` repository.

## Structure
The entire game is contained within `src/games/word-wheel`. 

- `src/games/word-wheel/WordWheelGame.tsx`: The main game component.
- `src/games/word-wheel/index.ts`: The entry point for the module.
- `src/games/word-wheel/components/`: Game-specific UI components.
- `src/games/word-wheel/hooks/`: Game-specific logic hooks.
- `src/games/word-wheel/data/`: Static puzzle data.

## Integration Steps

1. **Copy the Folder**: 
   Copy the `src/games/word-wheel` directory into your target repository's `src/games/` folder (or equivalent).

2. **Register the Game**:
   Import the `WordWheelGame` component where you manage your game list:
   ```tsx
   import { WordWheelGame } from './games/word-wheel';
   ```

3. **Global Styles**:
   The game requires Tailwind CSS. Ensure your project's global CSS includes the animations and theme variables found in `src/index.css`.

4. **Dependencies**:
   Ensure your main `package.json` includes the following dependencies:
   - `lucide-react`
   - `@google/genai` (if using AI generation)
   - `motion` (framer-motion)

## Current Configuration
The game uses a static puzzle set located in `src/games/word-wheel/data/puzzles.ts`. AI generation logic is abstracted in `src/games/word-wheel/services/geminiService.ts`.
