import type { ApiCharacter } from '@/types/api';

export const formatDescription = (character: ApiCharacter): string => {
  return `Species: ${character.species}, Status: ${character.status} \nLocation: ${character.location.name}`;
};
