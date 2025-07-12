import type { ApiCharacter, Character } from '@/types';

export const mapApiToCharacter = (apiData: ApiCharacter): Character => ({
  id: apiData.id,
  name: apiData.name,
  description: `Species: ${apiData.species}, Status: ${apiData.status}`,
});
