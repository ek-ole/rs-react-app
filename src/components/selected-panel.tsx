import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/app/store';
import { clearAll } from '@/services/selected-characters';
import { cn } from '@/utils/cn';

export function SelectedPanel() {
  const dispatch = useDispatch();
  const selectedIds = useSelector((state: RootState) => state.selectedCharacters.ids);

  if (selectedIds.length === 0) return null;

  return (
    <div
      className={cn(
        'fixed bottom-2 left-1/2',
        '-translate-x-1/2 transform',
        'bg-background xl shadow-shadow rounded p-4 shadow-[0px_0px_5px_2px]',
      )}
    >
      <div className="flex items-center gap-4">
        <span>{selectedIds.length} selected</span>
        <button onClick={() => dispatch(clearAll())} className="bg-shadow rounded px-3 py-1">
          Unselect all
        </button>
      </div>
    </div>
  );
}
