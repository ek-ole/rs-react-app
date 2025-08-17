'use client';
import { useSelector } from 'react-redux';

import { cn } from '@/app/(server)/_lib/cn';
import { toggle } from '@/app/_services/selected-characters';
import type { RootState } from '@/app/_store/store';
import { useAppDispatch } from '@/app/_store/store';
import type { Character } from '@/app/_types/character';

import { Checkbox } from '../interactive/checkbox';

type Props = {
  character: Character;
  isChecked?: boolean;
};

export function CharacterCardInteractive({ character, isChecked: initialChecked }: Props) {
  const dispatch = useAppDispatch();
  const selectedIds = useSelector((state: RootState) => state.selectedCharacters.ids);
  const isChecked = initialChecked ?? selectedIds.includes(character.id);

  return (
    <div
      className={cn(
        'absolute -top-3 -right-3 transition-all duration-200',
        'group-hover:border-input group-hover:bg-input',
        'group-hover:rounded-full group-hover:border-4 group-hover:opacity-100',
        isChecked
          ? 'border-input shadow-inset scale-100 rounded-full border-2 opacity-100'
          : 'scale-90 opacity-0',
      )}
    >
      <Checkbox checked={isChecked} onChange={() => dispatch(toggle(character))} />
    </div>
  );
}
