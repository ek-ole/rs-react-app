import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getErrorMessage } from './api/api-eror-handler';
import { Pagination } from './components/pagination';
import Results from './components/results';
import Search from './components/search';
import { Loader } from './components/ui/loader';
import { NotFound } from './components/ui/not-found';
import useLocalStorage from './hooks/useLocalStorage';
import { loadAndProcessCharacters } from './services/app-service';
import { SEARCH_TERM_KEY } from './services/constants';
import type { AppState } from './types/app';

function App() {
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
    setSearchTerm(trimmedValue);
    setCurrentPage(1);
    void loadData(trimmedValue, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
    void loadData(searchTerm, page);
  };

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    setCurrentPage(page);
    void loadData(searchTerm, page);
  }, [searchTerm]);

  return (
    <div className="mx-auto my-6 flex w-full flex-col items-center px-8 py-4">
      <h1>Rick & Morty</h1>
      <Search onSearch={handleSearch} />
      {state.isLoading && <Loader />}
      {state.error && <NotFound error={state.error} onReset={() => handleSearch('')} />}
      {!state.isLoading && !state.error && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={state.totalPages}
            onPageChange={handlePageChange}
          />
          <Results characters={state.characters} />
        </>
      )}
    </div>
  );
}

export default App;
