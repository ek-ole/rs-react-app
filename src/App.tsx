import { Pagination } from './components/pagination';
import Results from './components/results';
import Search from './components/search';
import { Loader } from './components/ui/loader';
import { NotFound } from './components/ui/not-found';
import { useCharacters } from './hooks/use-characters';

function App() {
  const { state, currentPage, handleSearch, handlePageChange } = useCharacters();

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
