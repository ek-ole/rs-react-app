'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function useCharacters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = (term: string) => {
    const trimmedValue = term.trim();
    router.push(`${pathname}?search=${encodeURIComponent(trimmedValue)}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    const currentSearch = searchParams.get('search') || '';
    router.push(`${pathname}?search=${currentSearch}&page=${newPage}`);
  };

  return {
    handleSearch,
    handlePageChange,
    currentSearch: searchParams.get('search') || '',
    currentPage: Number(searchParams.get('page')) || 1,
  };
}
