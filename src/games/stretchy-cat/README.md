# Stretchy Cat

A tactile path-finding puzzle where you stretch a feline across the board to fill every space.

## Architecture

### Logic Layer (`logic/levelGenerator.ts`)
The game uses a level generator that defines the grid layout, start/end positions, and target counts.

**Core Mechanics:**
- **Stretching**: The cat "stretches" as you move, filling the path behind it.
- **Valid Moves**: Adjacent cells (up, down, left, right) that are not blocked by furniture (Couch, Plant, Box).
- **Water Hazard**: Stepping on water resets the level.
- **Collection**: Gathering Fish (extra time) and Stars (extra points).
- **Victory Condition**: All non-blocked spaces must be filled, and the cat must end at the Saucer (finish flag).

### UI Layer (`UI.tsx`)
- Uses `motion` for smooth path animations and level transitions.
- Implements a drag-to-stretch interaction model.
- Features "Midnight Mode" optimization with a pure black background and vibrant neon path.

### Audio System (`services/audioService.ts`)
- Modular audio hook supporting background music and foreground SFX.
- **Note**: Audio files are currently missing. To enable audio, place the following `.mp3` files in `public/media/audio/sfx/stretchycat/`:
    - `backspace.mp3`
    - `stretchspace.mp3`
    - `YarnReward.mp3`
    - `FishReward.mp3`
    - `goal.mp3`
    - `win.mp3` (in `/global/`)

## Integration Notes
- Registered in `src/registry/games.ts`.
- Uses a custom Archive-style thumbnail: `/stretchy-cat-thumb.png`.
- Route: `/:gameId` (where gameId is `stretchy-cat`).
