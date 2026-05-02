export type GameStatus = "playable" | "coming-soon";

export interface GameMetadata {
  id: string;
  title: string;
  subtitle: string;
  category: string[];
  status: GameStatus;
  thumbnail: string;
  description: string;
  players?: string;
  duration?: string;
}
