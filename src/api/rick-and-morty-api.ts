import type { ApiResponse } from '@/types';

export class RickAndMortyApi {
  static async fetchCharacters(): Promise<ApiResponse> {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json() as Promise<ApiResponse>;
  }
}
