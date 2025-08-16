import { formatDescription } from '@/app/_lib/format-description';
import type { ApiCharacter } from '@/app/_types/api';
import type { Character } from '@/app/_types/character';

export const mapApiToCharacter = (apiData: ApiCharacter): Character => ({
  id: apiData.id,
  name: apiData.name,
  description: formatDescription(apiData),
  image: apiData.image,
});
