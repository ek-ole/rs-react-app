import { RefreshCw } from 'lucide-react';
import { useSearchParams } from 'react-router';

import { useGetCharactersQuery } from '@/app/store';
import { cn } from '@/utils/cn';

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
        'fixed top-22 right-4 z-50',
        'hover:bg-shadow hover:text-primary-light',
        'hover:border-shadow cursor-pointer',
        'items-center rounded-xl border-3 font-medium',
        'px-4 py-2 transition-colors duration-400',
        isFetching && 'cursor-not-allowed',
      )}
      aria-label="Refresh data"
    >
      <RefreshCw
        className={cn('h-6 w-6 transition-transform duration-300', isFetching && 'animate-spin')}
      />
    </button>
  );
}
