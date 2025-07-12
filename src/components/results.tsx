import React from 'react';

import type { Character } from '@/types';

type ResultsProps = {
  characters: Character[];
};

class Results extends React.Component<ResultsProps> {
  render() {
    const { characters } = this.props;
    return (
      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center rounded-xl border-4 p-4">
        <h2>Characters</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => (
            <div
              key={character.id}
              className="shadow-foreground/50 my-2 items-center gap-2 rounded-xl border-4 p-4 shadow-lg transition-shadow hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold">{character.name}</h3>
              <p className="text-sm">{character.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Results;
