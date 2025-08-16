'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { getErrorMessage } from '@/app/_lib/api-error-handler';
import { useGetCharactersQuery } from '@/app/_store/store';

export function useCharacters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchTerm = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isError, error, refetch } = useGetCharactersQuery({
    name: searchTerm,
    page,
  });

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    appState: {
      characters: isError ? [] : data?.results || [],
      isLoading,
      error: isError ? getErrorMessage(error) : null,
      totalPages: data?.info.pages || 1,
    },
    currentPage: page,

    handleSearch: (term: string) => {
      const trimmedValue = term.trim();

      updateParams({ search: trimmedValue, page: '1' });
    },

    handlePageChange: (newPage: number) => {
      updateParams({ page: String(newPage) });
    },
    refetch,
  };
}
