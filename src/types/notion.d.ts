export interface DevlogEntry {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  slug: string;
}

export interface Game {
  id: string;
  title: string;
  releaseDate: string;
  description: string;
  content: string;
  genres: string[];
  platforms: string[];
  image: string;
  slug: string;
  rating: number;
  completed: boolean
  playAgain: boolean
  played: boolean
}
