import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import useLocalStorage from '@/hooks/use-local-storage';
import { SEARCH_TERM_KEY } from '@/services/constants';
import { cn } from '@/utils/cn';

import { Loader } from './ui/loader';
import { SearchInput } from './ui/search-input';

type Props = {
  onSearch: (term: string) => void;
};

function Search({ onSearch }: Props) {
  const [searchTerm] = useLocalStorage(SEARCH_TERM_KEY, '');
  const [inputValue, setInputValue] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const trimmedValue = inputValue.trim();
    onSearch(trimmedValue);
    setIsSearching(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center sm:px-4">
      <div
        className={cn(
          'border-p-4 flex w-full max-w-sm items-center gap-2',
          'rounded-xl border-3 p-2 sm:my-6',
          'shadow-inset',
        )}
      >
        <SearchInput
          value={inputValue}
          onChange={(value) => setInputValue(value)}
          placeholder="Search character..."
        />
        <button
          type="submit"
          disabled={isSearching}
          className={cn(
            'hover:bg-shadow hover:text-primary-light',
            'hover:border-shadow cursor-pointer',
            'rounded-xl border-3 px-2 font-medium',
            'transition-colors duration-400 sm:px-4 sm:py-2',
          )}
        >
          {' '}
          {isSearching ? <Loader /> : 'Search'}
        </button>
      </div>
    </form>
  );
}

export default Search;
