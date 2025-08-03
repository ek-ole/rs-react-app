import { describe, it, expect } from 'vitest';

import type { Character } from '@/types/character';
import { parseDescription, prepareCharactersForCSV, generateCSVContent } from '@/utils/csv';

describe('parseDescription', () => {
  it('parses status and location from description', () => {
    const description = 'Status: Alive\nSpecies: Human\nLocation: Earth (C-137)';
    const result = parseDescription(description);

    expect(result).toEqual({
      status: 'Alive',
      location: 'Earth (C-137)',
    });
  });

  it('returns "Unknown" if fields are missing', () => {
    const description = 'Something else\nNo info\nWhatever';
    const result = parseDescription(description);

    expect(result).toEqual({
      status: 'Something else',
      location: 'Whatever',
    });
  });

  it('handles empty description safely', () => {
    const result = parseDescription('');
    expect(result).toEqual({ status: 'Unknown', location: 'Unknown' });
  });
});

describe('prepareCharactersForCSV', () => {
  it('prepares array of characters with CSV-ready fields', () => {
    const characters: Character[] = [
      {
        id: 1,
        name: 'Rick',
        image: 'rick.png',
        description: 'Status: Alive\nSpecies: Human\nLocation: Earth',
      },
    ];

    const result = prepareCharactersForCSV(characters);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Rick',
        status: 'Alive',
        location: 'Earth',
        image: 'rick.png',
      },
    ]);
  });
});

describe('generateCSVContent', () => {
  it('generates correct CSV content string', () => {
    const data = [
      {
        id: 1,
        name: 'Rick',
        status: 'Alive',
        location: 'Earth',
        image: 'rick.png',
      },
      {
        id: 2,
        name: 'Morty',
        status: 'Alive',
        location: 'Earth',
        image: 'morty.png',
      },
    ];

    const csv = generateCSVContent(data);

    expect(csv).toMatchInlineSnapshot(`
      "ID,Name,Status,Location,Image URL
      1,"Rick",Alive,"Earth",rick.png
      2,"Morty",Alive,"Earth",morty.png"
    `);
  });
});
