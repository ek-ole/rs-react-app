import React from 'react';

import Results from './components/results';
import Search from './components/search';
import { CharacterService } from './services/character-service';
import type { AppState } from './types/app';

class App extends React.Component<object, AppState> {
  state: AppState = {
    characters: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    void this.handleLoadCharacters();
  }

  handleLoadCharacters = async (searchTerm = '') => {
    this.setState({ isLoading: true, error: null });
    const { characters, error } = await CharacterService.loadCharacters(searchTerm);
    this.setState({
      characters: characters || [],
      error,
      isLoading: false,
    });
  };

  handleSearch = (term: string) => {
    void this.handleLoadCharacters(term.trim());
  };

  render() {
    const { characters, isLoading, error } = this.state;

    return (
      <div className="mx-auto my-6 flex flex-col items-center p-4">
        <h1>Rick & Morty</h1>
        <Search onSearch={this.handleSearch} />
        {isLoading && <div>Loading...</div>}
        {error && <div className="text-error-message">{error}</div>}
        {!isLoading && !error && <Results characters={characters} />}
      </div>
    );
  }
}

export default App;
