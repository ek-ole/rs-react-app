import { useEffect, useState } from 'react';

import { getErrorMessage } from './api/api-eror-handler';
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
  });

  const loadData = async (searchTerm = '') => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const characters = await loadAndProcessCharacters(searchTerm);
      setState((prev) => ({ ...prev, characters }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: getErrorMessage(error),
        characters: [],
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSearch = (term: string) => {
    const trimmedValue = term.trim();
    setSearchTerm(trimmedValue);
    void loadData(trimmedValue);
  };

  useEffect(() => {
    void loadData(searchTerm);
  }, [searchTerm]);

  return (
    <div className="mx-auto my-6 flex w-full flex-col items-center px-8 py-4">
      <h1>Rick & Morty</h1>
      <Search onSearch={handleSearch} />
      {state.isLoading && <Loader />}
      {state.error && <NotFound error={state.error} onReset={() => handleSearch('')} />}
      {!state.isLoading && !state.error && <Results characters={state.characters} />}
    </div>
  );
}

export default App;
