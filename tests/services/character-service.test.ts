import { vi, describe, it, expect } from 'vitest';

import { fetchCharacters } from '@/api/rick-and-morty-api';
import { loadCharacters } from '@/services/character-service';

vi.mock('@/api/rick-and-morty-api', () => ({
  fetchCharacters: vi.fn().mockResolvedValue({
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
}));

describe('CharacterService', () => {
  it('should proxy call to fetchCharacters', async () => {
    const result = await loadCharacters('Rick', 2);

    expect(fetchCharacters).toHaveBeenCalledWith('Rick', 2);
    expect(result).toEqual({
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
    });
  });
});
