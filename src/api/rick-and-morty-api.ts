import type { ApiResponse } from '@/types';

export class RickAndMortyApi {
  static async fetchCharacters(name?: string): Promise<ApiResponse> {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    const url = `https://rickandmortyapi.com/api/character?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json() as Promise<ApiResponse>;
  }
}
