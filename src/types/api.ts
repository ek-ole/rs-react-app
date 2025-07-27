import type { Character } from './character';

export type ApiCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: { name: string };
};

export type ApiResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ApiCharacter[];
};

export const mapApiToCharacter = (apiData: ApiCharacter): Character => ({
  id: apiData.id,
  name: apiData.name,
  image: apiData.image,
  description: `${apiData.status} - ${apiData.species} from ${apiData.location.name}`,
});
