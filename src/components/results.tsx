import { useNavigate, useParams } from 'react-router-dom';

import type { Character } from '@/types/character';
import { cn } from '@/utils/cn';

import { CharacterCard } from './cards/character-card';

type ResultsProps = {
  characters: Character[];
};

function Results({ characters }: ResultsProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCharacterClick = (characterId: number) => {
    void navigate(`/characters/${characterId}`);
  };

  return (
    <div
      className={cn(
        'mx-auto mt-6 flex w-full max-w-6xl',
        'flex-col items-center rounded-xl border-4 p-4',
      )}
    >
      <h2>Characters</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isActive={id === String(character.id)}
            onClick={() => handleCharacterClick(character.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Results;
