import { useNavigate, useParams, useSearchParams } from 'react-router';

import type { Character } from '@/types/character';
import { cn } from '@/utils/cn';

import { CharacterCard } from './cards/character-card';

type ResultsProps = {
  characters: Character[];
};

function Results({ characters }: ResultsProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const handleCharacterClick = (characterId: number) => {
    const params = new URLSearchParams(searchParams);
    void navigate(`/characters/${characterId}?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        'mx-auto mt-6 flex w-full max-w-6xl',
        'flex-col items-center rounded-xl border-4 p-4',
        'shadow-glow',
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
