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
                'group relative flex flex-col items-center gap-2 p-1',
                'hover:bg-shadow/70 cursor-pointer rounded',
                'rounded-xl border-3 transition-all duration-200',
                'transition-primary-light shadow-shadow cursor-pointer shadow-sm',
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
              <X
                className={cn(
                  'absolute flex h-10 w-10 items-center justify-center',
                  'opacity-0 transition-opacity group-hover:opacity-100',
                  'items-center justify-center rounded-full transition-all',
                  'bg-primary-light/20 backdrop-blur-xs duration-150',
                )}
              />
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
