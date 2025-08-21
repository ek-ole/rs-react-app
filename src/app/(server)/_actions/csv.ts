import type { Character } from '@/app/_types/character';

export type CharacterForCSV = {
  id: number;
  name: string;
  status: string;
  location: string;
  image: string;
};

export function generateCSV(characters: Character[]) {
  if (!characters.length) return null;

  const parseDescription = (description?: string): { status: string; location: string } => {
    if (!description) return { status: 'Unknown', location: 'Unknown' };
    const lines = description.split('\n');
    return {
      status: lines[0]?.replace('Status: ', '').trim() || 'Unknown',
      location: lines[2]?.replace('Location: ', '').trim() || 'Unknown',
    };
  };

  const data = characters.map((character) => {
    const { status, location } = parseDescription(character.description);
    return {
      id: character.id,
      name: character.name,
      status,
      location,
      image: character.image,
    };
  });

  const headers = ['ID', 'Name', 'Status', 'Location', 'Image URL'];
  const rows = data.map((item) => [
    item.id,
    `"${item.name.replace(/"/g, '""')}"`,
    item.status,
    `"${item.location.replace(/"/g, '""')}"`,
    item.image,
  ]);

  const content = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  return new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
}
