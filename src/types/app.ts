import type { Character } from './character';

export type AppState = {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
};
