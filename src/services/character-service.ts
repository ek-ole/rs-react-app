import { fetchCharacters } from '@/api/rick-and-morty-api';

export async function loadCharacters(searchTerm = '', page = 1) {
  const data = await fetchCharacters(searchTerm, page);
  return data;
}
