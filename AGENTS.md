# Project Navigation for Agents

Welcome, Agent. This project, **The Mankala Arcade**, is a modular React application designed for extensibility and high-fidelity UI. Use this guide to navigate the codebase efficiently.

<details>
<summary><b>1. Core Application Logic</b></summary>

- `src/App.tsx`: Central router and state wrapper. This is where games are registered into the routing table.
- `src/main.tsx`: Entry point.
- `src/components/Layout.tsx`: The global shell. Handles theme toggling (Midnight/Linen) and layout structure.
- `src/index.css`: Critical styling file. Contains all custom Tailwind 4.0 animations and variants.

</details>

<details>
<summary><b>2. Game Registry</b></summary>

- `src/registry/games.ts`: **The Source of Truth.** If you are adding a new game, you MUST register its metadata here first.
- `src/registry/types.ts`: TypeScript interfaces for game metadata.

</details>

<details>
<summary><b>3. Individual Games (Modular)</b></summary>

Each game is self-contained. Navigate to `src/games/[game-id]/` to find:
- `UI.tsx`: The main game board.
- `Rules.tsx`: The instructions component.
- `engine.ts` / `services/`: The logic layer.

#### Quick Links:
- [Boggle](src/games/boggle/)
- [Peg Solitaire](src/games/peg-solitaire/)
- [Wordwheel Cross](src/games/word-wheel/)
- [Stretchy Cat](src/games/stretchy-cat/)
- [Mankala Runner](src/games/mankala-runner/)

</details>

<details>
<summary><b>4. Shared Libraries & Assets</b></summary>

- `src/lib/`: Shared utilities like `wordEngine.ts`.
- `public/`: Game thumbnails and branding logos.
- `server.ts`: Minimal Express server for production/dev serving.

</details>

<details>
<summary><b>5. Key Workflows</b></summary>

- **Adding a Game**:
    1. Create a folder in `src/games/`.
    2. Implement `UI.tsx` and `Rules.tsx`.
    3. Add metadata to `src/registry/games.ts`.
    4. Register the route in `src/App.tsx`.
    5. **SEO Optimization**:
        - Add `<Helmet>` tags in `App.tsx` (Title, Description, Canonical URL).
        - Add the new route to `public/sitemap.xml`.
- **Modifying Themes**:
    - Colors and tokens are defined in `src/index.css` via CSS variables.
    - Theme switching logic is in `src/components/Layout.tsx`.

</details>
