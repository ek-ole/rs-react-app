import { Check } from 'lucide-react';
import { useState } from 'react';

import type { Character } from '@/types/character';
import { cn } from '@/utils/cn';

type characterProps = {
  character: Character;
  isActive?: boolean;
  onClick?: () => void;
};

export function CharacterCard({ character, isActive, onClick }: characterProps) {
  const { image, name, description } = character;

  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
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
        'shadow-shadow relative my-2 flex flex-col',
        'items-center gap-2 rounded-xl border-4 p-4',
        'transition-primary-light cursor-pointer shadow-lg hover:shadow-md lg:p-3',
        isActive ? 'border-primary-light' : '',
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        onClick={(e) => {
          e.stopPropagation();
          setIsChecked(!isChecked);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        className={cn(
          'absolute top-2 right-2 flex h-6 w-6',
          'items-center justify-center rounded-full',
          'bg-primary-light/20 backdrop-blur-sm',
          'cursor-pointer transition-all duration-200',
          'focus:ring-primary-light outline-none focus:ring-2',
          isHovered || isChecked ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
        )}
      >
        {isChecked && <Check className="text-foreground h-4 w-4 stroke-[3px]" />}
      </button>
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
