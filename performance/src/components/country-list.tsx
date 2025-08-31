import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
  const [cellChanges, setCellChanges] = useState<Record<string, Set<string>>>({});

  const prevYearRef = useRef<number | null>(null);
  const prevDataRef = useRef<CountryItem[]>([]);

  const handleSort = useCallback((key: SortConfig['key']) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    Object.values(countriesData).forEach((country) => {
      country.data.forEach((yearData) => {
        if (yearData.year) years.add(yearData.year);
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [countriesData]);

  const getCountriesForYear = useCallback(
    (year: number | null) => {
      return Object.entries(countriesData)
        .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(([name, data]) => {
          let yearData;
          if (year) {
            yearData = data.data.find((d) => d.year === year);
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
    },
    [countriesData, searchTerm, selectedColumns],
  );

  const sortCountries = useCallback(
    (data: CountryItem[]) => {
      return [...data].sort((a, b) => {
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
    },
    [sortConfig],
  );

  const filteredCountries = useMemo(() => {
    const data = getCountriesForYear(selectedYear);
    return sortCountries(data);
  }, [getCountriesForYear, selectedYear, sortCountries]);

  const availableColumns = useMemo(() => {
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
  }, [countriesData]);

  const findChangedCells = useCallback(
    (oldData: CountryItem[], newData: CountryItem[]) => {
      const changes: Record<string, Set<string>> = {};

      newData.forEach((newCountry) => {
        const oldCountry = oldData.find((c) => c.name === newCountry.name);
        if (!oldCountry) return;

        const changedFields = new Set<string>();
        const fieldsToCompare = ['population', 'co2', 'co2_per_capita', ...selectedColumns];

        for (const field of fieldsToCompare) {
          const oldValue = oldCountry[field];
          const newValue = newCountry[field];

          if (oldValue !== newValue) {
            changedFields.add(field);
          }
        }

        if (changedFields.size > 0) {
          changes[newCountry.name] = changedFields;
        }
      });

      return changes;
    },
    [selectedColumns],
  );

  useEffect(() => {
    if (prevDataRef.current.length === 0 && filteredCountries.length > 0) {
      prevDataRef.current = filteredCountries;
      prevYearRef.current = selectedYear;
    }
  }, [filteredCountries, selectedYear]);

  useEffect(() => {
    if (availableYears.length === 0 || prevDataRef.current.length === 0) return;

    const prevYear = prevYearRef.current;
    const currentYear = selectedYear;

    if (prevYear !== currentYear) {
      const oldData = prevDataRef.current;
      const newData = filteredCountries;

      const changes = findChangedCells(oldData, newData);

      setCellChanges(changes);

      prevYearRef.current = currentYear;
      prevDataRef.current = newData;

      setTimeout(() => {
        setCellChanges({});
      }, 2000);
    }
  }, [selectedYear, availableYears, findChangedCells, filteredCountries]);

  const handleYearChange = useCallback((year: number | null) => {
    setSelectedYear(year);
  }, []);

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
        countriesCount={filteredCountries.length}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <div className="custom-scrollbar flex w-full flex-col overflow-x-auto">
        <TableHeader
          sortConfig={sortConfig}
          onSort={handleSort}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
          availableYears={availableYears}
          columns={allColumns}
        />

        <CountryTable
          countries={filteredCountries}
          columns={allColumns}
          cellChanges={cellChanges}
        />
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
