import { getErrorMessage } from '@/api/api-eror-handler';
import useLocalStorage from '@/hooks/useLocalStorage';

import { loadCharacters } from './character-service';
import { SEARCH_TERM_KEY } from './constants';

function useSearchStorage() {
  return useLocalStorage(SEARCH_TERM_KEY, '');
}

export async function loadAndProcessCharacters(searchTerm: string) {
  try {
    return await loadCharacters(searchTerm);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export function useSearchTerm() {
  const [searchTerm] = useSearchStorage();
  return searchTerm;
}

export function useSaveSearchTerm() {
  const [, setSearchTerm] = useSearchStorage();
  return (term: string) => setSearchTerm(term.trim());
}
