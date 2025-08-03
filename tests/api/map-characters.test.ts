import { vi, describe, it, expect } from 'vitest';

import { mapApiToCharacter } from '@/api/map-characters';
import type { ApiCharacter } from '@/types/api';
import type { Character } from '@/types/character';
import { formatDescription } from '@/utils/format-description';

vi.mock('@/utils/format-description', () => ({
  formatDescription: vi.fn(
    (character: ApiCharacter) =>
      `Species: ${character.species}, Status: ${character.status}\nLocation: ${character.location.name}`,
  ),
}));

describe('mapApiToCharacter', () => {
  const mockApiCharacter: ApiCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    status: 'Alive',
    location: { name: 'Earth (C-137)' },
    image: 'rick.png',
  };

  const expectedCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    description: 'Species: Human, Status: Alive\nLocation: Earth (C-137)',
    image: 'rick.png',
  };
  it('should correctly map API character to app character', () => {
    const result = mapApiToCharacter(mockApiCharacter);

    expect(formatDescription).toHaveBeenCalledWith(mockApiCharacter);
    expect(result).toEqual(expectedCharacter);
  });

  it('should include all required fields', () => {
    const result = mapApiToCharacter(mockApiCharacter);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('image');
  });
});
