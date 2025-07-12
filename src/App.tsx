import React from 'react';

import type { Character } from '@/types';

import { mapApiToCharacter } from './api/map-characters';
import { RickAndMortyApi } from './api/rick-and-morty-api';
import Results from './components/results';
import Search from './components/search';

class App extends React.Component {
  state = {
    characters: [] as Character[],
  };

  componentDidMount() {
    void this.loadCharacters();
  }

  async loadCharacters() {
    try {
      const data = await RickAndMortyApi.fetchCharacters();
      const characters = data.results.map(mapApiToCharacter);
      this.setState({ characters });
    } catch (error) {
      console.error('Loading error:', error);
      this.setState({ error: 'Failed to load characters' });
    }
  }

  render() {
    return (
      <div className="mx-auto my-6 flex flex-col items-center p-4">
        <h1>Rick & Morty</h1>
        <Search />
        <Results characters={this.state.characters} />
      </div>
    );
  }
}

export default App;
