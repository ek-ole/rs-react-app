import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getErrorMessage } from '@/api/api-error-handler';
import { loadAndProcessCharacters } from '@/services/app-service';
import { SEARCH_TERM_KEY } from '@/services/constants';
import type { AppState } from '@/types/app';

import useLocalStorage from './use-local-storage';

export function useCharacters() {
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_TERM_KEY, '');
  const [state, setState] = useState<Omit<AppState, 'searchValue'>>({
    characters: [],
    isLoading: false,
    error: null,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const loadData = async (searchTerm = '', page = 1) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const { characters, totalPages } = await loadAndProcessCharacters(searchTerm, page);
      setState((prev) => ({ ...prev, characters, totalPages }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: getErrorMessage(error),
        characters: [],
        totalPages: 1,
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSearch = (term: string) => {
    const trimmedValue = term.trim();

    const params = new URLSearchParams(searchParams);
    params.set('search', trimmedValue);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
    void loadData(searchTerm, page);
  };

  useEffect(() => {
    const searchTerm = searchParams.get('search') || '';
    const page = Number(searchParams.get('page')) || 1;

    setSearchTerm(searchTerm);
    setCurrentPage(page);
    void loadData(searchTerm, page);
  }, [searchParams, setSearchTerm]);

  return { state, currentPage, handleSearch, handlePageChange };
}
