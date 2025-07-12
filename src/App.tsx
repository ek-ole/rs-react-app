import React from 'react';

import { mapApiToCharacter } from './api/map-characters';
import { RickAndMortyApi } from './api/rick-and-morty-api';
import Results from './components/results';
import Search from './components/search';
import type { AppState } from './types';

class App extends React.Component<object, AppState> {
  state: AppState = {
    characters: [],
    searchTerm: '',
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    void this.loadCharacters();
  }

  loadCharacters = async (searchTerm = '') => {
    this.setState({ isLoading: true, error: null });

    try {
      const data = await RickAndMortyApi.fetchCharacters(searchTerm);
      const characters = data.results.map(mapApiToCharacter);
      this.setState({ characters, searchTerm });
    } catch (error) {
      this.setState({ error: error instanceof Error ? error.message : 'Search failed' });
    }
  };

  handleSearch = (term: string) => {
    void this.loadCharacters(term);
  };

  render() {
    return (
      <div className="mx-auto my-6 flex flex-col items-center p-4">
        <h1>Rick & Morty</h1>
        <Search onSearch={this.handleSearch} />
        <Results characters={this.state.characters} />
      </div>
    );
  }
}

export default App;
