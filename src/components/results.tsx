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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {characters.map((character) => (
            <div
              key={character.id}
              className="shadow-foreground/50 my-2 flex flex-col items-center gap-2 rounded-xl border-4 p-4 shadow-lg transition-shadow hover:shadow-md lg:p-3"
            >
              {character.image && (
                <img
                  src={character.image}
                  alt={character.name}
                  className="mb-3 h-40 w-full rounded-lg object-cover lg:h-30"
                />
              )}
              <h3 className="mb-2 text-lg font-semibold lg:text-base">{character.name}</h3>
              <p className="text-sm whitespace-pre-line">{character.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Results;
