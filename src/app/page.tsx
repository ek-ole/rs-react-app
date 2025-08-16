'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import type { SWRResponse } from 'swr';
import useSWR from 'swr';

import { Pagination } from '@/app/_components/pagination';
import { RefreshButton } from '@/app/_components/refresh-button';
import Results from '@/app/_components/results';
import Search from '@/app/_components/search';
import { cn } from '@/app/_lib/cn';

import { useCharacters } from './(client)/_hooks/use-characters';
import { Loader } from './(server)/_components/ui/loader';
import { NotSearchFound } from './(server)/_components/ui/not-found-search';
import { fetchCharacters } from './(server)/_services/fetch-characters';
import type { ApiResponse } from './_types/api';

export default function Home() {
  const router = useRouter();
  const { handleSearch, handlePageChange, currentSearch, currentPage } = useCharacters();
  const pathname = usePathname();
  const { data, error, isLoading }: SWRResponse<ApiResponse, Error> = useSWR(
    ['characters', currentSearch, currentPage],
    () => fetchCharacters({ name: currentSearch, page: currentPage }),
  );

  const hasDetails = pathname.includes('/characters/');
  const handleSearchWithReset = (searchTerm: string) => {
    handleSearch(searchTerm);
    if (hasDetails) router.push('/');
  };

  return (
    <div className="mx-auto my-20 flex w-full flex-col items-center px-8 py-4">
      <h1 className="text-2xl font-bold">Rick & Morty</h1>
      <Search onSearch={handleSearchWithReset} />
      <Suspense fallback={<Loader />}>{isLoading && <Loader />}</Suspense>

      {error ? (
        <NotSearchFound error={error.message} onReset={() => handleSearch('')} />
      ) : (
        data && (
          <div className={cn('flex w-full', hasDetails ? 'gap-6' : '')}>
            <div className={hasDetails ? 'w-[65%]' : 'w-full'}>
              {data.results.length > 0 && (
                <>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={data.info.pages}
                    onPageChange={handlePageChange}
                  />
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
