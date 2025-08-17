import Image from 'next/image';

import { CharacterCardInteractive } from '@/app/(client)/_components/data/character-card-interactive';
import { cn } from '@/app/(server)/_lib/cn';
import type { Character } from '@/app/_types/character';

type characterProps = {
  character: Character;
  isActive?: boolean;
  onClick?: VoidFunction;
  isChecked?: boolean;
};

export function CharacterCard({ character, isActive, onClick, isChecked }: characterProps) {
  const { image, name } = character;

  return (
    <div className="group relative">
      <div
        tabIndex={0}
        role="button"
        aria-label={`View details for ${character.name}`}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        className={cn(
          'shadow-shadow my-2 flex flex-col',
          'items-center gap-2 rounded-xl border-4 p-4',
          'transition-primary-light cursor-pointer shadow-lg hover:shadow-md lg:p-3',
          isActive ? 'border-primary-light' : '',
        )}
      >
        {image && (
          <Image
            src={image}
            alt={name}
            width={240}
            height={240}
            className="error-message mb-3 h-60 w-full rounded-lg object-cover lg:h-40"
            loading="lazy"
          />
        )}
        <h3 className="text-center text-lg font-semibold lg:text-base">{name}</h3>
      </div>
      <CharacterCardInteractive character={character} isChecked={isChecked} />
    </div>
  );
}
