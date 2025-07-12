import React from 'react';

import type { ResultsProps } from '@/types/components';

import { CharacterCard } from './cards/character-card';

class Results extends React.Component<ResultsProps> {
  render() {
    return (
      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center rounded-xl border-4 p-4">
        <h2>Characters</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {this.props.characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    );
  }
}

export default Results;
