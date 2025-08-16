'use client';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { cn } from '@/app/(server)/_lib/cn';
import { csvDownloadHandler } from '@/app/_lib/csv';
import { clearAll, toggle } from '@/app/_services/selected-characters';
import { useAppDispatch, type RootState } from '@/app/_store/store';

import { CharacterThumbnail } from './ui/character-thumbnail';

export function SelectedPanel() {
  const dispatch = useAppDispatch();
  const { ids, characters } = useSelector((state: RootState) => state.selectedCharacters);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  if (!ids.length || !characters.length) return null;

  const handleDownload = csvDownloadHandler(characters, downloadLinkRef);

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
                onRemove={() => dispatch(toggle(character))}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 pl-5 whitespace-nowrap">
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">{ids.length} selected</span>
          <div className="flex gap-3">
            <button
              onClick={() => dispatch(clearAll())}
              className={cn(
                'hover:bg-shadow hover:text-primary-light',
                'hover:border-shadow cursor-pointer',
                'rounded-xl border-2 p-1 text-sm',
                'transition-colors duration-400',
                'shadow-[0px_0px_7px_-1px]',
              )}
            >
              Unselect all
            </button>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className={cn(
            'hover:bg-shadow hover:text-primary-light',
            'hover:border-shadow cursor-pointer',
            'rounded-xl border-2 px-10 py-1 text-sm',
            'transition-colors duration-400',
            'shadow-[0px_0px_7px_-1px]',
            characters.length === 0 ? 'cursor-not-allowed opacity-50' : '',
          )}
          disabled={characters.length === 0}
        >
          Download CSV
        </button>
        <a ref={downloadLinkRef} href="about:blank" aria-hidden="true">
          download link
        </a>
      </div>
    </div>
  );
}
