import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';

import type { SortConfig } from '@/types/co2-data';
import { cn } from '@/utils/cn';

type Props = {
  sortConfig: SortConfig;
  onSort: (key: SortConfig['key']) => void;
}

export function TableHeader({ sortConfig, onSort }: Props) {  
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <ArrowDownUp className="mx-2 h-5 w-5" />;
    return sortConfig.direction === 'asc' ? (
      <ArrowUpWideNarrow className="mx-2 h-5 w-5" />
    ) : (
      <ArrowDownWideNarrow className="mx-2 h-5 w-5" />
    );
  };
  return (
    <div
      className={cn(
        'bg-input border-shadow/20 w-full',
        'grid grid-cols-[2fr_1fr_1fr_1fr]',
        'border-b font-semibold sm:gap-4',
      )}
    >
      <button
        onClick={() => onSort('name')}
        className="hover:bg-input/30 px-5 py-1 text-left font-bold duration-300 hover:scale-103 sm:flex"
      >
        Country {getSortIcon('name')}
      </button>
      <button
        onClick={() => onSort('isoCode')}
        className="hover:bg-input/30 px-5 py-1 text-left font-bold whitespace-nowrap duration-300 hover:scale-103 sm:flex"
      >
        ISO Code {getSortIcon('isoCode')}
      </button>
      <button
        onClick={() => onSort('year')}
        className="hover:bg-input/30 px-5 py-1 text-left font-bold duration-300 hover:scale-103 sm:flex"
      >
        Year {getSortIcon('year')}
      </button>
      <button
        onClick={() => onSort('population')}
        className="hover:bg-input/30 px-5 py-1 text-left font-bold duration-300 hover:scale-103 sm:flex"
      >
        Population {getSortIcon('population')}
      </button>
    </div>
  );
};
