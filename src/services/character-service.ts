import { mapApiToCharacter } from '@/api/map-characters';
import { RickAndMortyApi } from '@/api/rick-and-morty-api';

export class CharacterService {
  static async loadCharacters(searchTerm = '') {
    const data = await RickAndMortyApi.fetchCharacters(searchTerm);
    const characters = data.results.map(mapApiToCharacter);
    return characters;
  }
}
