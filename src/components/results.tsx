import React from 'react';

import type { Character } from '@/types';

type ResultsProps = {
  characters: Character[];
};

class Results extends React.Component<ResultsProps> {
  render() {
    const { characters } = this.props;
    return (
      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center">
        <h2>Characters</h2>
        {characters.map((character) => (
          <div
            key={character.id}
            className="my-2 flex w-full items-center gap-2 rounded-xl border-4 p-4"
          >
            <h3>{character.name}</h3>
            <p>{character.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
