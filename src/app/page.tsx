import { Suspense } from 'react';

import CharacterDetails from './(client)/_components/character-details';
import { RefreshButton } from './(client)/_components/interactive/refresh-button';
import Search from './(client)/_components/search';
import Results from './(server)/_components/data/results';
import { Pagination } from './(server)/_components/pagination';
import { Loader } from './(server)/_components/ui/loader';
import { NotSearchFound } from './(server)/_components/ui/not-found-search';
import { cn } from './(server)/_lib/cn';
import { fetchCharacters } from './(server)/_services/fetch-characters';
import type { ApiResponse } from './_types/api';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string; detailsId?: string }>;
}) {
  const params = await searchParams;
  const currentSearch = params.search || '';
  const currentPage = Number(params.page) || 1;
  const detailsId = params.detailsId;

  let data: ApiResponse | null = null;
  let error: string | null = null;

  try {
    data = await fetchCharacters({ name: currentSearch, page: currentPage });
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  const hasDetails = !!detailsId;

  return (
    <div className="mx-auto my-20 flex w-full flex-col items-center px-8 py-4">
      <h1 className="text-2xl font-bold">Rick & Morty</h1>
      <Suspense fallback={<Loader />}>
        <Search initialSearchTerm={currentSearch} />
      </Suspense>

      {error ? (
        <NotSearchFound error={error} onReset={() => {}} />
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
            {hasDetails && (
              <Suspense fallback={<Loader />}>
                <CharacterDetails id={detailsId} />
              </Suspense>
            )}
          </div>
        )
      )}
    </div>
  );
}
