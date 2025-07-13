import React from 'react';

import { ApiErrorHandler } from './api/api-eror-handler';
import Results from './components/results';
import Search from './components/search';
import { Loader } from './components/ui/loader';
import { NotFound } from './components/ui/not-found';
import { CharacterService } from './services/character-service';
import { LocalStorageService } from './services/storage';
import type { AppState } from './types/app';

class App extends React.Component<object, AppState> {
  state: AppState = {
    characters: [],
    isLoading: false,
    error: null,
    inputValue: LocalStorageService.getSearchTerm(),
  };

  componentDidMount() {
    const initialSearchTerm = LocalStorageService.getSearchTerm();
    void this.handleLoadCharacters(initialSearchTerm);
  }

  handleLoadCharacters = async (searchTerm = '') => {
    this.setState({ isLoading: true, error: null });

    try {
      const characters = await CharacterService.loadCharacters(searchTerm);
      this.setState({
        characters: characters,
      });
    } catch (error) {
      this.setState({
        error: ApiErrorHandler.getErrorMessage(error),
        characters: [],
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = (term: string) => {
    void this.handleLoadCharacters(term.trim());
  };

  render() {
    const { characters, isLoading, error } = this.state;

    return (
      <div className="mx-auto my-6 flex w-full flex-col items-center px-8 py-4">
        <h1>Rick & Morty</h1>
        <Search onSearch={this.handleSearch} />
        {isLoading && <Loader />}
        {error && (
          <NotFound
            error={error}
            onReset={() => {
              this.setState({ inputValue: '' });
              void this.handleLoadCharacters('');
            }}
          />
        )}

        {!isLoading && !error && <Results characters={characters} />}
      </div>
    );
  }
}

export default App;
