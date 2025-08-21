import { SelectedPanelInteractive } from '@/app/(client)/_components/selected-panel-interactive';
import { cn } from '@/app/(server)/_lib/cn';
import type { Character } from '@/app/_types/character';

import { CharacterThumbnail } from '../../(server)/_components/character-thumbnail';

type SelectedPanelProps = {
  characters: Character[];
  selectedCount: number;
  onRemoveCharacter: (character: Character) => void;
};

export function SelectedPanel({
  characters,
  selectedCount,
  onRemoveCharacter,
}: SelectedPanelProps) {
  if (!selectedCount) return null;

  return (
    <div
      className={cn(
        'fixed bottom-2 left-1/2 w-[75vw] max-w-6xl min-w-[300px]',
        'flex -translate-x-1/2 transform justify-between',
        'bg-input shadow-shadow backdrop-blur-xl',
        'rounded-xl p-4 shadow-[0px_0px_5px_2px]',
      )}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="relative flex-1">
          <div className="flex w-full gap-2 overflow-x-auto scroll-smooth">
            {characters.map((character) => (
              <CharacterThumbnail
                key={character.id}
                character={character}
                onRemove={() => onRemoveCharacter(character)}
              />
            ))}
          </div>
        </div>
      </div>
      <SelectedPanelInteractive
        selectedCount={selectedCount}
        hasCharacters={characters.length > 0}
        characters={characters}
      />
    </div>
  );
}
