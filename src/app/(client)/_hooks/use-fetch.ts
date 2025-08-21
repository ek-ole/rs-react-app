'use client';
import useSWR from 'swr';

import { fetchCharacters } from '@/_server/_services/fetch-characters';

export function useFetch(search: string, page: number) {
  return useSWR(['characters', search, page], () => fetchCharacters({ name: search, page }));
}
