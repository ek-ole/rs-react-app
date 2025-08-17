'use client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

import type { Character } from '@/app/_types/character';

import { CharacterCard } from '../../../(server)/_components/data/character-card';
import type { RootState } from '../../_store/store';

type ResultsProps = {
  characters: Character[];
};

function ResultsInteractive({ characters }: ResultsProps) {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const selectedIds = useSelector((state: RootState) => state.selectedCharacters.ids);

  const handleCharacterClick = (characterId: number) => {
    const params = new URLSearchParams(searchParams);
    router.push(`/characters/${characterId}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {characters.map((character, index) => (
          <CharacterCard
            key={character.id}
            character={character}
            priority={index === 0}
            isActive={id === String(character.id)}
            onClick={() => handleCharacterClick(character.id)}
            isChecked={selectedIds.includes(character.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ResultsInteractive;
