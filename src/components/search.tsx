import { useEffect, useState } from 'react';

import useLocalStorage from '@/hooks/use-local-storage';
import { SEARCH_TERM_KEY } from '@/services/constants';
import { cn } from '@/utils/cn';

import { SearchInput } from './ui/search-input';

type Props = {
  onSearch: (term: string) => void;
  resetDetails?: () => void;
};

function Search({ onSearch, resetDetails }: Props) {
  const [searchTerm] = useLocalStorage(SEARCH_TERM_KEY, '');
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    onSearch(trimmedValue);
    resetDetails?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center sm:px-4">
      <div
        className={cn(
          'border-p-4 flex w-full max-w-sm items-center gap-2',
          'rounded-xl border-4 p-2 sm:my-6',
        )}
      >
        <SearchInput
          value={inputValue}
          onChange={(value) => setInputValue(value)}
          placeholder="Search character..."
        />
        <button
          type="submit"
          className={cn(
            'hover:bg-foreground/80 hover:text-primary-light',
            'hover:border-foreground cursor-pointer',
            'rounded-xl border-3 px-2 font-medium',
            'transition-colors duration-400 sm:border-4 sm:px-4 sm:py-2',
          )}
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
