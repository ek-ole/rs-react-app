import { useSearchParams } from 'react-router';

import { getErrorMessage } from '@/api/api-error-handler';
import { useGetCharactersQuery } from '@/app/store';

export function useCharacters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isError, error, refetch } = useGetCharactersQuery({
    name: searchTerm,
    page,
  });

  return {
    appState: {
      characters: isError ? [] : data?.results || [],
      isLoading,
      error: isError ? getErrorMessage(error) : null,
      totalPages: data?.info.pages || 1,
    },
    currentPage: page,

    handleSearch: (term: string) => {
      const trimmedValue = term.trim();

      const params = new URLSearchParams(searchParams);
      params.set('search', trimmedValue);
      params.set('page', '1');
      setSearchParams(params);
    },

    handlePageChange: (page: number) => {
      searchParams.set('page', String(page));
      setSearchParams(searchParams);
    },
    refetch,
  };
}
