import type { ApiCharacter } from '@/types/api';
import type { Character } from '@/types/character';
import { formatDescription } from '@/utils/format-description';

export const mapApiToCharacter = (apiData: ApiCharacter): Character => ({
  id: apiData.id,
  name: apiData.name,
  description: formatDescription(apiData),
  image: apiData.image,
});
