import type { Character } from '@/types/character';

export type CharacterForCSV = {
  id: number;
  name: string;
  status: string;
  location: string;
  image: string;
};

export const parseDescription = (description: string): { status: string; location: string } => {
  const lines = description.split('\n');
  return {
    status: lines[0]?.replace('Status: ', '').trim() || 'Unknown',
    location: lines[2]?.replace('Location: ', '').trim() || 'Unknown',
  };
};

export const prepareCharactersForCSV = (characters: Character[]): CharacterForCSV[] => {
  return characters.map((character) => {
    const { status, location } = parseDescription(character.description);
    return {
      id: character.id,
      name: character.name,
      status,
      location,
      image: character.image,
    };
  });
};

export const generateCSVContent = (data: CharacterForCSV[]): string => {
  const headers = ['ID', 'Name', 'Status', 'Location', 'Image URL'];
  const rows = data.map((item) => [
    item.id,
    `"${item.name.replace(/"/g, '""')}"`,
    item.status,
    `"${item.location.replace(/"/g, '""')}"`,
    item.image,
  ]);
  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
};

export const downloadCSV = (content: string, filename: string): void => {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
};
