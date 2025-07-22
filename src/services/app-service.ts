import { ApiErrorHandler } from '@/api/api-eror-handler';

import { CharacterService } from './character-service';
import { LocalStorageService } from './storage';

export class AppService {
  static async loadCharacters(searchTerm: string) {
    try {
      return await CharacterService.loadCharacters(searchTerm);
    } catch (error) {
      throw new Error(ApiErrorHandler.getErrorMessage(error));
    }
  }

  static getInitialSearchTerm() {
    return LocalStorageService.getSearchTerm();
  }

  static saveSearchTerm(term: string) {
    LocalStorageService.setSearchTerm(term);
  }
}
