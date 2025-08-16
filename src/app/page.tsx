'use client';
import { usePathname, useRouter } from 'next/navigation';

import { Loader } from '@/app/(server)/_components/ui/loader';
import { Pagination } from '@/app/_components/pagination';
import { RefreshButton } from '@/app/_components/refresh-button';
import Results from '@/app/_components/results';
import Search from '@/app/_components/search';
import { NotFound } from '@/app/_components/ui/not-found-search';
import { cn } from '@/app/_lib/cn';
import { useCharacters } from '@/app/_lib/hooks/use-characters';

export default function Home() {
  const router = useRouter();
  const { appState, currentPage, handleSearch, handlePageChange } = useCharacters();
  const pathname = usePathname();

  const hasDetails = pathname.includes('/characters/');
  const handleSearchWithReset = (searchTerm: string) => {
    handleSearch(searchTerm);
    if (hasDetails) router.push('/');
  };

  const handleReset = () => {
    handleSearch('');
    if (hasDetails) router.push('/');
  };

  return (
    <div className="mx-auto my-20 flex w-full flex-col items-center px-8 py-4">
      <h1 className="text-2xl font-bold">Rick & Morty</h1>
      <Search onSearch={handleSearchWithReset} />
      {appState.isLoading && <Loader />}
      {appState.error && <NotFound error={appState.error} onReset={handleReset} />}
      <div className={cn('flex w-full', hasDetails ? 'gap-6' : '')}>
        <div className={hasDetails ? 'w-[65%]' : 'w-full'}>
          {appState.characters.length > 0 && (
            <>
              <Pagination
                currentPage={currentPage}
                totalPages={appState.totalPages}
                onPageChange={handlePageChange}
              />
              <Results characters={appState.characters} />
              <RefreshButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
