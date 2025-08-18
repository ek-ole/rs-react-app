'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { Loader } from '@/app/(server)/_components/ui/loader';
import { cn } from '@/app/(server)/_lib/cn';
import { SEARCH_TERM_KEY } from '@/app/(server)/_lib/constants';

import useLocalStorage from '../_hooks/use-local-storage';

import { SearchInput } from './search-input';

type Props = {
  initialSearchTerm: string;
  onSearch?: (term: string) => void;
};

function Search({ initialSearchTerm }: Props) {
  const t = useTranslations('Search');
  const [inputValue, setInputValue] = useState(initialSearchTerm);
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [, setSearchTerm] = useLocalStorage(SEARCH_TERM_KEY, '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const trimmedValue = inputValue.trim();
    setSearchTerm(trimmedValue);
    const params = new URLSearchParams(searchParams);
    params.set('search', trimmedValue);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);

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
      <SearchInput value={inputValue} onChange={setInputValue} placeholder={t('placeholder')} />
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
        {isSearching ? <Loader /> : t('button')}
      </button>
    </form>
  );
}

export default Search;
