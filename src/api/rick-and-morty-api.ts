import type { ApiResponse } from '@/types/api';

import { ApiErrorHandler } from './api-eror-handler';

const BASE_URL = 'https://rickandmortyapi.com/api';

export class RickAndMortyApi {
  static async fetchCharacters(name?: string): Promise<ApiResponse> {
    try {
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      const url = `${BASE_URL}/character?${params.toString()}`;
      const response = await fetch(url);
      ApiErrorHandler.checkResponse(response);
      return response.json() as Promise<ApiResponse>;
    } catch (error) {
      const message = ApiErrorHandler.logError(error);
      throw new Error(`Failed to fetch characters: ${message}`);
    }
  }
}
