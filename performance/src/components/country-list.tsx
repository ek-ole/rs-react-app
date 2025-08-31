import { useState } from 'react';

import { useCountries } from '@/hooks/use-countries';
import type { CountryItem, SortConfig } from '@/types/co2-data';
import { cn } from '@/utils/cn';

import ColumnSelector from './column-selector';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]); 

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const availableYears = (() => {
    const years = new Set<number>();
    Object.values(countriesData).forEach((country) => {
      country.data.forEach((yearData) => {
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
        yearData = data.data.find((d) => d.year === selectedYear);
      } else {
        yearData = data.data[data.data.length - 1];
      }

      const countryItem: CountryItem = {
        name,
        isoCode: data.iso_code,
        population: yearData?.population,
        year: yearData?.year,
        co2: yearData?.co2,
        co2_per_capita: yearData?.co2_per_capita,
      };
      
      selectedColumns.forEach((column) => {
        countryItem[column] = yearData?.[column] ?? null;
      });

      return countryItem;
    });

    const availableColumns = (() => {
      const columns = new Set<string>();
      Object.values(countriesData).forEach((country) => {
        country.data.forEach((yearData) => {
          Object.keys(yearData).forEach((key) => {
            if (!['year', 'population', 'co2', 'co2_per_capita'].includes(key)) {
              columns.add(key);
            }
          });
        });
      });
      return Array.from(columns);
    })();

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

    if (sortConfig.key === 'isoCode') {
      const aValue = a.isoCode || '';
      const bValue = b.isoCode || '';
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const baseColumns = ['name', 'isoCode', 'year', 'population', 'co2', 'co2_per_capita'];
  const allColumns = [...baseColumns, ...selectedColumns];

  return (
    <div
      className={cn(
        'flex w-full items-center',
        'flex-col rounded-xl border-3',
        'shadow-inset',
        'max-h-[80vh] min-h-[200px]',
      )}
    >
      <TableToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        countriesCount={sortedCountries.length}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        availableYears={availableYears}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <div className="custom-scrollbar w-full overflow-x-auto">
        <TableHeader
          sortConfig={sortConfig}
          onSort={handleSort}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          availableYears={availableYears}
          columns={allColumns}
        />

        <CountryTable countries={sortedCountries} columns={allColumns} />
      </div>

      <ColumnSelector
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedColumns={selectedColumns}
        availableColumns={availableColumns}
        onColumnsChange={setSelectedColumns}
      />
    </div>
  );
}

export default CountryList;
