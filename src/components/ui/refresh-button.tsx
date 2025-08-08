import { useSearchParams } from 'react-router';

import { useGetCharactersQuery } from '@/app/store';
import { cn } from '@/utils/cn';

import { Loader } from './loader';

export function RefreshButton() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;

  const { refetch, isFetching } = useGetCharactersQuery({
    name: searchTerm,
    page,
  });

  const handleRefresh = () => {
    refetch()
      .then(() => console.log('Data refreshed'))
      .catch((error) => console.error('Refresh failed:', error));
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isFetching}
      className={cn(
        'hover:bg-shadow hover:text-primary-light',
        'hover:border-shadow cursor-pointer',
        'w-30 items-center rounded-xl border-3 font-medium',
        'transition-colors duration-400 sm:px-4 sm:py-2',
      )}
    >
      {isFetching ? (
        <>
          <Loader />
          <span>Refreshing...</span>
        </>
      ) : (
        'Refresh'
      )}
    </button>
  );
}
