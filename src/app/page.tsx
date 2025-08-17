'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import type { SWRResponse } from 'swr';
import useSWR from 'swr';

import { RefreshButton } from './(client)/_components/interactive/refresh-button';
import { useCharacters } from './(client)/_hooks/use-characters';
import useLocalStorage from './(client)/_hooks/use-local-storage';
import Results from './(server)/_components/data/results';
import { Pagination } from './(server)/_components/pagination';
import Search from './(server)/_components/search';
import { Loader } from './(server)/_components/ui/loader';
import { NotSearchFound } from './(server)/_components/ui/not-found-search';
import { cn } from './(server)/_lib/cn';
import { SEARCH_TERM_KEY } from './(server)/_lib/constants';
import { fetchCharacters } from './(server)/_services/fetch-characters';
import type { ApiResponse } from './_types/api';

export default function Home() {
  const router = useRouter();
  const { handleSearch, currentSearch, currentPage } = useCharacters();
  const pathname = usePathname();
  const { data, error, isLoading }: SWRResponse<ApiResponse, Error> = useSWR(
    ['characters', currentSearch, currentPage],
    () => fetchCharacters({ name: currentSearch, page: currentPage }),
  );
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_TERM_KEY, '');
  const hasDetails = pathname.includes('/characters/');
  const handleSearchWithReset = (searchTerm: string) => {
    handleSearch(searchTerm);
    setSearchTerm(searchTerm);
    if (hasDetails) router.push('/');
  };

  return (
    <div className="mx-auto my-20 flex w-full flex-col items-center px-8 py-4">
      <h1 className="text-2xl font-bold">Rick & Morty</h1>
      <Search onSearch={handleSearchWithReset} initialSearchTerm={searchTerm} />
      <Suspense fallback={<Loader />}>{isLoading && <Loader />}</Suspense>

      {error ? (
        <NotSearchFound error={error.message} onReset={() => handleSearch('')} />
      ) : (
        data && (
          <div className={cn('flex w-full', hasDetails ? 'gap-6' : '')}>
            <div className={hasDetails ? 'w-[65%]' : 'w-full'}>
              {data.results.length > 0 && (
                <>
                  <Pagination currentPage={currentPage} totalPages={data.info.pages} />
                  <Results characters={data.results} />
                  <RefreshButton />
                </>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
