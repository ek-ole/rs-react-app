import { X } from 'lucide-react';

import type { Character } from '@/types/character';
import { cn } from '@/utils/cn';

export function CharacterThumbnail({
  character,
  onRemove,
}: {
  character: Character;
  onRemove: VoidFunction;
}) {
  return (
    <button
      type="button"
      key={character.id}
      className={cn(
        'group relative flex flex-col items-center gap-2 p-1',
        'hover:bg-shadow/70 cursor-pointer rounded',
        'rounded-xl border-2 transition-all duration-200',
        'transition-primary-light cursor-pointer shadow-sm',
        'shadow-[0px_0px_7px_-1px]',
      )}
      onClick={onRemove}
    >
      <div className="relative h-12 w-12">
        <img
          src={character.image}
          alt={character.image}
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded-full object-cover"
        />
        <X
          className={cn(
            'absolute inset-0 flex h-full w-full items-center justify-center',
            'opacity-0 transition-opacity group-hover:opacity-100',
            'items-center justify-center rounded-full transition-all',
            'bg-primary-light/20 backdrop-blur-xs duration-150',
          )}
        />
      </div>
    </button>
  );
}
