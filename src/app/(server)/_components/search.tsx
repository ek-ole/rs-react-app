import SearchInteractive from '@/app/(client)/_components/search-interactive';

type Props = {
  onSearch: (term: string) => void;
  initialSearchTerm?: string;
};

function Search({ onSearch, initialSearchTerm = '' }: Props) {
  return (
    <div className="flex w-full flex-col items-center sm:px-4">
      <SearchInteractive onSearch={onSearch} initialSearchTerm={initialSearchTerm} />
    </div>
  );
}

export default Search;
