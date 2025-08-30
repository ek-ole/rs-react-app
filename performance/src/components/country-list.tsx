import { useState } from 'react';

import { useCountries } from '@/hooks/use-countries';
import type { SortConfig } from '@/types/co2-data';
import { cn } from '@/utils/cn';

import CountryTable from './country-table';
import TableHeader from './table-header';
import TableToolbar from './table-toolbar';

function CountryList() {
  const countriesData = useCountries();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc',
  });
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const availableYears = (() => {
    const years = new Set<number>();
    Object.values(countriesData).forEach(country => {
      country.data.forEach(yearData => {
        if (yearData.year) years.add(yearData.year);
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  })();

  const filteredCountries = Object.entries(countriesData)
    .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map(([name, data]) => {
      let yearData;
      if (selectedYear) {
        yearData = data.data.find(d => d.year === selectedYear);
      } else {
        yearData = data.data[data.data.length - 1];
      }

      return {
        name,
        isoCode: data.iso_code,
        population: yearData?.population,
        year: yearData?.year,
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
      )}
    >
      <TableToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        countriesCount={sortedCountries.length}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        availableYears={availableYears}
      />

      <TableHeader sortConfig={sortConfig} onSort={handleSort} />

      <CountryTable countries={sortedCountries} />
    </div>
  );
}

export default CountryList;
