'use client';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { Loader } from '@/app/(server)/_components/ui/loader';
import { SearchInput } from '@/app/(server)/_components/ui/search-input';
import { cn } from '@/app/(server)/_lib/cn';
import { SEARCH_TERM_KEY } from '@/app/(server)/_lib/constants';

import useLocalStorage from '../_hooks/use-local-storage';

type Props = {
  initialSearchTerm: string;
  onSearch?: (term: string) => void;
};

function SearchInteractive({ initialSearchTerm }: Props) {
  const [inputValue, setInputValue] = useState(initialSearchTerm);
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  const [, setSearchTerm] = useLocalStorage(SEARCH_TERM_KEY, '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const trimmedValue = inputValue.trim();
    setSearchTerm(trimmedValue);
    router.push(`/?search=${encodeURIComponent(trimmedValue)}&page=1`);
    setIsSearching(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
        {isSearching ? <Loader /> : 'Search'}
      </button>
    </form>
  );
}

export default SearchInteractive;
