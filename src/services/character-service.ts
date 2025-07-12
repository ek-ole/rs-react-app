import { mapApiToCharacter } from '@/api/map-characters';
import { RickAndMortyApi } from '@/api/rick-and-morty-api';

export class CharacterService {
  static async loadCharacters(searchTerm = '') {
    try {
      const data = await RickAndMortyApi.fetchCharacters(searchTerm);
      const characters = data.results.map(mapApiToCharacter);
      return { characters, error: null };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Search failed',
      };
    }
  }
}
