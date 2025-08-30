import { useState } from 'react';

import { useCountries } from '@/hooks/use-countries';
import type { SortConfig } from '@/types/co2-data';
import { cn } from '@/utils/cn';

import { CountryTable } from './country-table';
import { TableHeader } from './table-header';
import { TableToolbar } from './table-toolbar';

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
      <TableToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        countriesCount={sortedCountries.length}
      />

      <TableHeader sortConfig={sortConfig} onSort={handleSort} />

      <CountryTable countries={sortedCountries} />
    </div>
  );
}

export default CountryList;
