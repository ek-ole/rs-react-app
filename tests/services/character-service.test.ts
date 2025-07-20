import { CharacterService } from '@/services/character-service';
import type { ApiCharacter } from '@/types/api';
import type { Character } from '@/types/character';

const mockMappedCharacters = [
  { id: 1, name: 'Rick', description: 'Species: Human, Status: Alive', image: '' },
  { id: 2, name: 'Morty', description: 'Species: Human, Status: Alive', image: '' },
];

const mockFetchCharacters = vi.fn();
const mockMapApiToCharacter = vi.fn(
  (char: ApiCharacter): Character => ({
    id: char.id,
    name: char.name,
    description: `Species: ${char.species}, Status: ${char.status}`,
    image: '',
  }),
);

vi.mock('@/api/rick-and-morty-api', () => ({
  RickAndMortyApi: {
    fetchCharacters: mockFetchCharacters,
  },
}));

vi.mock('@/api/map-characters', () => ({
  mapApiToCharacter: mockMapApiToCharacter,
}));

describe('CharacterService', () => {
  it('should load and map characters', async () => {
    const result = await CharacterService.loadCharacters('Rick');

    expect(mockFetchCharacters).toHaveBeenCalledWith('Rick');
    expect(mockMapApiToCharacter).toHaveBeenCalledTimes(2);
    expect(result).toEqual(mockMappedCharacters);
  });
});
