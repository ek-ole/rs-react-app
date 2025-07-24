import { vi, describe, it, expect } from 'vitest';

import { loadCharacters } from '@/services/character-service';

vi.mock('@/api/rick-and-morty-api', () => ({
  fetchCharacters: vi.fn(() =>
    Promise.resolve({
      results: [
        {
          id: 1,
          name: 'Rick',
          species: 'Human',
          status: 'Alive',
          location: { name: 'Earth' },
          image: 'rick.png',
        },
      ],
    }),
  ),
}));

vi.mock('@/api/map-characters', () => ({
  mapApiToCharacter: vi.fn(() => ({
    id: 1,
    name: 'Rick',
    description: 'Species: Human, Status: Alive\nLocation: Earth',
    image: 'rick.png',
  })),
}));

describe('CharacterService', () => {
  it('should load characters', async () => {
    const result = await loadCharacters('Rick');

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Rick');
    expect(result[0].description).toContain('Human');
  });
});
