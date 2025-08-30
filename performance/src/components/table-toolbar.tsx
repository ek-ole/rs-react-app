import SearchInput from './search-input';

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  countriesCount: number;
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  availableYears: number[];
  onOpenModal: VoidFunction;
};

function TableToolbar({
  searchTerm,
  onSearchChange,
  countriesCount,
  onOpenModal,
}: Props) {
  return (
    <div className="bg-input flex w-full items-center justify-between px-2 py-2">
      
      <h2 className="justify-center px-3 pt-2 text-center text-lg font-semibold">
        Countries ({countriesCount})
      </h2>
      <div className="flex gap-2 justify-center items-center">
        <div className=''>
          <button onClick={onOpenModal} className="custom-button">
           Columns
        </button>
        </div>
        <SearchInput value={searchTerm} onChange={onSearchChange} placeholder="Search country..." />
      </div>
    </div>
  );
}

export default TableToolbar;
