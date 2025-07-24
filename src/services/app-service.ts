import { ApiErrorHandler } from '@/api/api-eror-handler';

import { CharacterService } from './character-service';
import { LocalStorageService } from './storage';

export async function loadCharacters(searchTerm: string) {
  try {
    return await CharacterService.loadCharacters(searchTerm);
  } catch (error) {
    throw new Error(ApiErrorHandler.getErrorMessage(error));
  }
}

export function getInitialSearchTerm() {
  return LocalStorageService.getSearchTerm();
}

export function saveSearchTerm(term: string) {
  LocalStorageService.setSearchTerm(term);
}

export const AppService = {
  loadCharacters,
  getInitialSearchTerm,
  saveSearchTerm,
};
