import React from 'react';

import type { ApiCharacter, Character } from '@/types';

import { mapApiToCharacter } from './api/api-characters';
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
      const response = await fetch('https://rickandmortyapi-sigma.vercel.app/api/character');
      const data = (await response.json()) as ApiCharacter[];
      const characters = data.map(mapApiToCharacter);
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
