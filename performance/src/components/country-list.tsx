import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';
import { useState } from 'react';

import { useCountries } from '@/hooks/use-countries';
import type { SortConfig } from '@/types/co2-data';
import { cn } from '@/utils/cn';

import SearchInput from './search-input';

function CountryList() {
  const countriesData = useCountries();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc',
  });

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <ArrowDownUp className='mx-2 w-5 h-5'/>;
    return sortConfig.direction === 'asc' ? (
      <ArrowUpWideNarrow className="mx-2 h-5 w-5" />
    ) : (
      <ArrowDownWideNarrow className="mx-2 h-5 w-5" />
    );
  };

  const filteredCountries = Object.entries(countriesData)
    .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(([name, data]) => {
      const latestYearData = data.data[data.data.length - 1];
      const latestYear = latestYearData?.year;

      return {
        name,
        isoCode: data.iso_code,
        population: latestYearData?.population,
        year: latestYear,
      };
    });

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    if (sortConfig.key === 'name') {
      return sortConfig.direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    if (sortConfig.key === 'population') {
      const aValue = a.population || 0;
      const bValue = b.population || 0;
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (sortConfig.key === 'year') {
      const aValue = a.year || 0;
      const bValue = b.year || 0;
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (sortConfig.key === 'isoCode') {
      const aValue = a.isoCode || '';
      const bValue = b.isoCode || '';
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return (
    <div
      className={cn(
        'flex w-full items-center',
        'flex-col rounded-xl border-3 sm:my-4',
        'shadow-inset',
        'max-h-[50vh] min-h-[200px]',
        'custom-scrollbar overflow-y-auto',
      )}
    >
      <div className="bg-input flex w-full items-center justify-between px-2 py-2">
        <h2 className="justify-center px-3 pt-2 text-center text-lg font-semibold">
          Countries ({sortedCountries.length})
        </h2>
        <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search country..." />
      </div>
      <div
        className={cn(
          'bg-input border-shadow/20',
          'grid w-full grid-cols-[2fr_1fr_1fr_1fr]',
          'gap-4 border-b font-semibold',
        )}
      >
        <button
          onClick={() => handleSort('name')}
          className="flex hover:bg-input/30 px-5 py-1 text-left font-bold duration-300 hover:scale-103"
        >
          Country {getSortIcon('name')}
        </button>
        <button
          onClick={() => handleSort('isoCode')}
          className="flex hover:bg-input/30 px-5 py-1 text-left font-bold duration-300 hover:scale-103"
        >
          ISO Code {getSortIcon('isoCode')}
        </button>
        <button
          onClick={() => handleSort('year')}
          className="flex hover:bg-input/30 px-5 py-1 text-left font-bold duration-300 hover:scale-103"
        >
          Year {getSortIcon('year')}
        </button>
        <button
          onClick={() => handleSort('population')}
          className="flex hover:bg-input/30 px-5 py-1 text-left font-bold duration-300 hover:scale-103"
        >
          Population {getSortIcon('population')}
        </button>
      </div>
      <div className="custom-scrollbar flex w-full flex-col overflow-y-auto">
        {sortedCountries.map((country) => (
          <div
            key={country.name}
            className={cn(
              'even:bg-input/20',
              'grid grid-cols-[2fr_1fr_1fr_1fr]',
              'gap-4 px-3 py-2 odd:bg-transparent',
            )}
          >
            <div className="font-medium">{country.name}</div>
            <div className="px-7">{country.isoCode || 'N/A'}</div>
            <div className="px-7">{country.year || 'N/A'}</div>
            <div className="px-7">
              {country.population ? country.population.toLocaleString() : 'N/A'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
