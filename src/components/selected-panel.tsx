import { X } from 'lucide-react';
import { useSelector } from 'react-redux';

import { useAppDispatch, type RootState } from '@/app/store';
import { clearAll, toggle } from '@/services/selected-characters';
import { cn } from '@/utils/cn';

export function SelectedPanel() {
  const dispatch = useAppDispatch();
  const { ids, characters } = useSelector((state: RootState) => state.selectedCharacters);

  if (!ids.length || !characters.length) return null;

  return (
    <div
      className={cn(
        'fixed bottom-2 left-1/2',
        '-translate-x-1/2 transform',
        'bg-background xl shadow-inset shadow-shadow',
        'rounded p-4 shadow-[0px_0px_5px_2px]',
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="ma-h-[100px] flex flex-wrap gap-2 overflow-y-auto">
          {characters.map((character) => (
            <button
              type="button"
              key={character.id}
              className={cn(
                'flex items-center gap-2 p-1',
                'bg-primary-light hover:bg-shadow cursor-pointer rounded',
              )}
              onClick={() => dispatch(toggle(character))}
            >
              <img
                src={character.image}
                alt={character.image}
                loading="lazy"
                decoding="async"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-xs">{character.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span>{ids.length} selected</span>
        <button
          onClick={() => dispatch(clearAll())}
          className={cn(
            'hover:bg-shadow hover:text-primary-light',
            'hover:border-shadow cursor-pointer',
            'rounded-xl border-3 p-1 font-medium',
            'transition-colors duration-400',
          )}
        >
          Unselect all
        </button>
      </div>
    </div>
  );
}
