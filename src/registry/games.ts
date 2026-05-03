import { GameMetadata } from "./types";

export const GAMES_REGISTRY: GameMetadata[] = [
  {
    id: "boggle",
    title: "Boggle",
    subtitle: "Fast Word Search",
    category: ["Word", "Fast-paced"],
    status: "playable",
    thumbnail: "https://images.unsplash.com/photo-1616628188502-413f2fe46e5e?q=80&w=1200&auto=format&fit=crop",
    description: "Hunt for hidden words in a scrambled grid. Connect adjacent letters in a race against the clock.",
    duration: "3 Min Rounds"
  },
  {
    id: "peg-solitaire",
    title: "Peg Solitaire",
    subtitle: "Classic Single-player Strategy",
    category: ["Solo", "Puzzle"],
    status: "playable",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuALnujG4YymjakJyCCIGJXupCOj2lmlMcdkupfZLyeUdgQsiqq1Xp-N4QRz6SBERULuY7ugcvGZxL9Z349T3s2QOr2UwxdXniwa2CG4JxwPsvgoL6BySqGkZ84X_3SUoYPFE44lvQJslUU2Et0j9KSYj-UKqMnZSLRkyuJxevsux7rqXopiMM9TdnbxxlGuceVNpRQv_4iLZV9JHXB6P19parlsmqIAgWEMWv3rU02qEw9L7S6P06rOvZgSXpINGeJoS6upqdSwpzE",
    description: "Clear the board by jumping pegs over one another until only one remains in the center.",
    duration: "5-10 Min"
  },
  {
    id: "rummy",
    title: "Rummy",
    subtitle: "The Library Secret",
    category: ["Cards", "2-4 Players"],
    status: "coming-soon",
    thumbnail: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=800&auto=format&fit=crop",
    description: "Classic card matching game for family gatherings.",
    players: "2-4 Players"
  }
];
