import SearchInteractive from '@/app/(client)/_components/search-interactive';

type Props = {
  initialSearchTerm?: string;
};

function Search({ initialSearchTerm = '' }: Props) {
  return (
    <div className="flex w-full flex-col items-center sm:px-4">
      <SearchInteractive initialSearchTerm={initialSearchTerm} />
    </div>
  );
}

export default Search;
