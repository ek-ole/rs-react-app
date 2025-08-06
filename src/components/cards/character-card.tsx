import { useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/app/store';
import { useAppDispatch } from '@/app/store';
import { toggle } from '@/services/selected-characters';
import type { Character } from '@/types/character';
import { cn } from '@/utils/cn';

import { Checkbox } from '../ui/checkbox';

type characterProps = {
  character: Character;
  isActive?: boolean;
  onClick?: VoidFunction;
};

export function CharacterCard({ character, isActive, onClick }: characterProps) {
  const { image, name } = character;

  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useAppDispatch();
  const selectedIds = useSelector((state: RootState) => state.selectedCharacters.ids);
  const isChecked = selectedIds.includes(character.id);

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
      <div
        className={cn(
          'absolute -top-3 -right-3 transition-all duration-200',
          isHovered || isChecked
            ? 'border-input shadow-inset scale-100 rounded-full border-2 opacity-100'
            : 'scale-90 opacity-0',
        )}
      >
        <Checkbox checked={isChecked} onChange={() => dispatch(toggle(character))} />
      </div>
      {image && (
        <img
          src={image}
          alt={name}
          className="error-message mb-3 h-60 w-full rounded-lg object-cover lg:h-40"
          loading="lazy"
        />
      )}
      <h3 className="text-center text-lg font-semibold lg:text-base">{name}</h3>
    </div>
  );
}
