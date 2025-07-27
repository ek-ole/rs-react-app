import type { ApiCharacter, ApiResponse } from '@/types/api';
import type { Character } from '@/types/character';

import { checkResponse, logError } from './api-error-handler';
import { mapApiToCharacter } from './map-characters';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchCharacters(name?: string, page = 1): Promise<ApiResponse> {
  try {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    params.append('page', String(page));
    const url = `${BASE_URL}/character?${params.toString()}`;
    const response = await fetch(url);
    checkResponse(response);
    return response.json() as Promise<ApiResponse>;
  } catch (error) {
    const message = logError(error);
    throw new Error(`Failed to fetch characters: ${message}`);
  }
}

export async function fetchCharacter(id: string): Promise<Character> {
  const url = `${BASE_URL}/character/${id}`;
  const response = await fetch(url);
  checkResponse(response);
  const data = (await response.json()) as ApiCharacter;
  return mapApiToCharacter(data);
}
