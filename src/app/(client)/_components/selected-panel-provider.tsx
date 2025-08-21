'use client';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/app/(client)/_store/store';
import { SelectedPanel } from '@/app/(server)/_components/selected-panel';
import type { Character } from '@/app/_types/character';

import { toggle } from '../_store/selected-characters';

export function SelectedPanelProvider() {
  const dispatch = useDispatch();
  const { ids, characters } = useSelector((state: RootState) => state.selectedCharacters);
  const handleRemoveCharacter = (character: Character) => {
    dispatch(toggle(character));
  };

  return (
    <SelectedPanel
      characters={characters}
      selectedCount={ids.length}
      onRemoveCharacter={handleRemoveCharacter}
    />
  );
}
