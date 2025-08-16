import type { ApiCharacter } from '@/app/_types/api';

export const formatDescription = (character: ApiCharacter): string => {
  return `Species: ${character.species} \nStatus: ${character.status} \nLocation: ${character.location.name}`;
};
