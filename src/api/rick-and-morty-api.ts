import type { ApiResponse } from '@/types/api';

import { checkResponse, logError } from './api-eror-handler';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchCharacters(name?: string): Promise<ApiResponse> {
  try {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    const url = `${BASE_URL}/character?${params.toString()}`;
    const response = await fetch(url);
    checkResponse(response);
    return response.json() as Promise<ApiResponse>;
  } catch (error) {
    const message = logError(error);
    throw new Error(`Failed to fetch characters: ${message}`);
  }
}
