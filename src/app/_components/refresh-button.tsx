'use client';
import { RefreshCw } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';

import { cn } from '@/app/(server)/_lib/cn';
import { useGetCharacterByIdQuery, useGetCharactersQuery } from '@/app/_store/store';

export function RefreshButton() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const { id } = useParams<{ id: string }>();

  const { refetch: refetchList, isFetching } = useGetCharactersQuery({
    name: searchTerm,
    page,
  });

  const { refetch: refetchDetails } = useGetCharacterByIdQuery(id || '', {
    skip: !id,
  });

  const handleRefresh = () => {
    void refetchList();
    if (id) void refetchDetails();
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
