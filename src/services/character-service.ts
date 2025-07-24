import { mapApiToCharacter } from '@/api/map-characters';
import { fetchCharacters } from '@/api/rick-and-morty-api';

export class CharacterService {
  static async loadCharacters(searchTerm = '') {
    const data = await fetchCharacters(searchTerm);
    const characters = data.results.map(mapApiToCharacter);
    return characters;
  }
}
