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
    showContent: true,
  };

  componentDidMount() {
    const initialSearchTerm = LocalStorageService.getSearchTerm();
    void this.handleLoadCharacters(initialSearchTerm);
  }

  handleLoadCharacters = async (searchTerm = '') => {
    this.setState({ showContent: false, isLoading: true, error: null });

    try {
      const characters = await CharacterService.loadCharacters(searchTerm);
      this.setState({
        characters: characters,
        showContent: true,
      });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Search failed',
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
    const { characters, isLoading, error, showContent } = this.state;

    return (
      <div className="mx-auto my-6 flex flex-col items-center p-4">
        <h1>Rick & Morty</h1>
        <Search onSearch={this.handleSearch} />
        {isLoading && <Loader />}
        {error && <div className="text-error-message">{error}</div>}
        <div
          className={`w-full transition-opacity duration-300 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {!isLoading && !error && <Results characters={characters} />}
        </div>
      </div>
    );
  }
}

export default App;
