import SearchInput from './search-input';

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  countriesCount: number;
}

export function TableToolbar({ searchTerm, onSearchChange, countriesCount }: Props) {
  return (
  <div className="bg-input flex w-full items-center justify-between px-2 py-2">
    <h2 className="justify-center px-3 pt-2 text-center text-lg font-semibold">
      Countries ({countriesCount})
    </h2>
    <SearchInput value={searchTerm} onChange={onSearchChange} placeholder="Search country..." />
  </div>
  )
};
