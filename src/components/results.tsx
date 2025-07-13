import React from 'react';

import type { ResultsProps } from '@/types/components';

import { CharacterCard } from './cards/character-card';

class Results extends React.Component<ResultsProps> {
  state = {
    shouldThrow: false,
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test Error Boundary');
    }
    return (
      <div className="mx-auto mt-6 flex w-full max-w-6xl flex-col items-center rounded-xl border-4 p-4">
        <h2>Characters</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {this.props.characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
        <button
          onClick={() => this.setState({ shouldThrow: true })}
          className="hover:bg-foreground/80 hover:text-primary-light hover:border-foreground mt-8 cursor-pointer rounded-xl border-3 px-2 font-medium transition-colors duration-400 sm:border-4 sm:px-4 sm:py-2"
        >
          Break everything!
        </button>
      </div>
    );
  }
}

export default Results;
