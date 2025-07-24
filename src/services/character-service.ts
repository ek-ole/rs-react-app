import { mapApiToCharacter } from '@/api/map-characters';
import { fetchCharacters } from '@/api/rick-and-morty-api';

export async function loadCharacters(searchTerm = '') {
  const data = await fetchCharacters(searchTerm);
  const characters = data.results.map(mapApiToCharacter);
  return characters;
}

export const CharacterService = {
  loadCharacters,
};
