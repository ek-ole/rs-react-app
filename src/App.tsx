import React from 'react';

import Results from './components/results';
import Search from './components/search';
import { Loader } from './components/ui/loader';
import { CharacterService } from './services/character-service';
import { LocalStorageService } from './services/storage';
import type { AppState } from './types/app';

class App extends React.Component<object, AppState> {
  state: AppState = {
    characters: [],
    isLoading: false,
    error: null,
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
        error: error instanceof Error ? error.message : 'Character not found',
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
        {error && <div className="text-error-message">{error}</div>}

        {!isLoading && !error && <Results characters={characters} />}
      </div>
    );
  }
}

export default App;
