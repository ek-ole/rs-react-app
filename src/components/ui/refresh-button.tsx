import { useSearchParams } from 'react-router';

import { useGetCharactersQuery } from '@/app/store';
import { cn } from '@/utils/cn';

export function RefreshButton() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;

  const { refetch } = useGetCharactersQuery(
    {
      name: searchTerm,
      page,
    },
    {
      skip: true,
    },
  );

  const handleRefresh = () => {
    void refetch();
  };

  return (
    <button
      onClick={handleRefresh}
      className={cn(
        'hover:bg-shadow hover:text-primary-light',
        'hover:border-shadow cursor-pointer',
        'rounded-xl border-3 px-2 font-medium',
        'transition-colors duration-400 sm:px-4 sm:py-2',
      )}
    >
      Refresh
    </button>
  );
}
