import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';

import type { SortConfig } from '@/types/co2-data';
import { cn } from '@/utils/cn';

import YearSelector from './year-selector';

type Props = {
  sortConfig: SortConfig;
  onSort: (key: SortConfig['key']) => void;
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  availableYears: number[];
  columns: string[];
};

function TableHeader({ sortConfig, onSort, selectedYear, onYearChange, availableYears, columns }: Props) {
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <ArrowDownUp className="mx-2 h-5 w-5" />;
    return sortConfig.direction === 'asc' ? (
      <ArrowUpWideNarrow className="mx-2 h-5 w-5" />
    ) : (
      <ArrowDownWideNarrow className="mx-2 h-5 w-5" />
    );
  };

  const getHeaderTitle = (columnKey: string) => {
    const titles: Record<string, string> = {
      name: 'Country',
      isoCode: 'ISO Code',
      year: 'Year',
      population: 'Population',
      co2: 'CO2',
      co2_per_capita: 'CO2 per capita',
    };

    return (
      titles[columnKey] || columnKey.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

  return (
    <div
      className={cn(
        'bg-input border-shadow/20 dynamic-grid w-full px-5',
        'items-end border-b font-semibold sm:gap-4',
      )}
    >
      {columns.map((columnKey) => {
        if (columnKey === 'name' || columnKey === 'isoCode' || columnKey === 'population') {
          return (
            <button
              key={columnKey}
              onClick={() => onSort(columnKey)}
              className="hover:bg-input/30 cursor-pointer py-1 text-left font-bold duration-300 hover:scale-103 sm:flex"
            >
              {getHeaderTitle(columnKey)} {getSortIcon(columnKey)}
            </button>
          );
        }

        if (columnKey === 'year') {
          return (
            <div
              key={columnKey}
              className="hover:bg-input/30 cursor-pointer py-1 text-left font-bold duration-300 hover:scale-103 sm:flex"
            >
              <YearSelector
                selectedYear={selectedYear}
                onYearChange={onYearChange}
                availableYears={availableYears}
              />
            </div>
          );
        }

        return (
          <div key={columnKey} className="py-1 text-left font-bold">
            {getHeaderTitle(columnKey)}
          </div>
        );
      })}
    </div>
  );
}

export default TableHeader;