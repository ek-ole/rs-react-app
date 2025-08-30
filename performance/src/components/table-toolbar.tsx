import SearchInput from './search-input';
import YearSelector from './year-selector';

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  countriesCount: number;
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  availableYears: number[];
};

function TableToolbar({
  searchTerm,
  onSearchChange,
  countriesCount,
  selectedYear,
  onYearChange,
  availableYears,
}: Props) {
  return (
    <div className="bg-input flex w-full items-center justify-between px-2 py-2">
      <h2 className="justify-center px-3 pt-2 text-center text-lg font-semibold">
        Countries ({countriesCount})
      </h2>
      <div className='flex'>
        <YearSelector
          selectedYear={selectedYear}
          onYearChange={onYearChange}
          availableYears={availableYears}
        />
        <SearchInput value={searchTerm} onChange={onSearchChange} placeholder="Search country..." />
      </div>
    </div>
  );
}

export default TableToolbar;
