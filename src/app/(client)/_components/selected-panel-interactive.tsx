'use client';
import { useDispatch } from 'react-redux';

import { clearAll } from '@/app/(client)/_store/selected-characters';
import { cn } from '@/app/(server)/_lib/cn';
import type { Character } from '@/app/_types/character';

import { useCSVDownload } from '../_hooks/use-csv-download';

type SelectedPanelProps = {
  selectedCount: number;
  hasCharacters: boolean;
  characters: Character[];
};

export function SelectedPanelInteractive({
  selectedCount,
  hasCharacters,
  characters,
}: SelectedPanelProps) {
  const dispatch = useDispatch();
  const { downloadRef, handleDownload } = useCSVDownload(characters);

  return (
    <div className="flex flex-col gap-1 pl-5 whitespace-nowrap">
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium">{selectedCount} selected</span>
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
        disabled={!hasCharacters}
        className={cn(
          'hover:bg-shadow hover:text-primary-light',
          'hover:border-shadow cursor-pointer',
          'rounded-xl border-2 px-10 py-1 text-sm',
          'transition-colors duration-400',
          'shadow-[0px_0px_7px_-1px]',
          { 'cursor-not-allowed opacity-50': !hasCharacters },
        )}
      >
        Download CSV
      </button>
      <a ref={downloadRef} href="about:blank" aria-hidden="true" className="hidden">
        download link
      </a>
    </div>
  );
}
