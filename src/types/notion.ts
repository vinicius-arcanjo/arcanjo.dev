import { NotionContent } from './notion-api';

export interface DevlogEntry extends NotionContent {
  date: string;
  summary: string;
  tags: string[];
}

export interface Game extends NotionContent {
  releaseDate: string;
  description: string;
  genres: string[];
  platforms: string[];
  image?: string;
  rating: number;
  completed: boolean;
  playAgain: boolean;
  played: boolean;
}

export interface Movie extends NotionContent {
  releaseDate: string;
  description: string;
  genres: string[];
  director: string;
  image: string | null;
  rating: number;
  watched: boolean;
  wouldWatchAgain: boolean;
}

export interface Series extends NotionContent {
  releaseDate: string;
  description: string;
  genres: string[];
  creator: string;
  image: string | null;
  rating: number;
  watched: boolean;
  completed: boolean;
  seasons: number;
}

export interface Anime extends NotionContent {
  releaseDate: string;
  description: string;
  genres: string[];
  studio: string;
  image: string | null;
  rating: number;
  watched: boolean;
  completed: boolean;
  seasons: number;
}
