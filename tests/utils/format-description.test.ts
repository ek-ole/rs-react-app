import { describe, it, expect } from 'vitest';

import type { ApiCharacter } from '@/types/api';
import { formatDescription } from '@/utils/format-description';

describe('formatDescription', () => {
  it('should format description correctly with valid data', () => {
    const mockCharacter: ApiCharacter = {
      species: 'Human',
      status: 'Alive',
      location: { name: 'Earth' },
    } as ApiCharacter;

    const result = formatDescription(mockCharacter);
    expect(result).toBe('Species: Human \nStatus: Alive \nLocation: Earth');
  });
});
