import type { Character } from '@/types/character';
import { cn } from '@/utils/cn';

export function CharacterCard(character: Character) {
  const { image, name, description } = character;

  return (
    <div
      className={cn(
        'shadow-foreground/50 my-2 flex flex-col',
        'items-center gap-2 rounded-xl border-4 p-4',
        'shadow-lg transition-shadow hover:shadow-md lg:p-3',
      )}
    >
      {image && (
        <img
          src={image}
          alt={name}
          className="error-message mb-3 h-60 w-full rounded-lg object-cover lg:h-40"
          loading="lazy"
        />
      )}
      <h3 className="text-lg font-semibold lg:text-base">{name}</h3>
      <p className="text-center text-sm whitespace-pre-line">{description}</p>
    </div>
  );
}
