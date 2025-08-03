import type { ApiCharacter } from '@/types/api';

export const formatDescription = (character: ApiCharacter): string => {
  return `Species: ${character.species} \nStatus: ${character.status} \nLocation: ${character.location.name}`;
};
