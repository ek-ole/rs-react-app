'use client';
import { getErrorMessage } from '@/app/_lib/api-error-handler';
import { mapApiToCharacter } from '@/app/_lib/map-characters';
import { useGetCharacterByIdQuery } from '@/app/_store/store';

export function useCharacterDetails(id?: string) {
  const {
    data: apiCharacter,
    isLoading,
    isError,
    error,
  } = useGetCharacterByIdQuery(id || '', {
    skip: !id,
  });

  const character = apiCharacter ? mapApiToCharacter(apiCharacter) : undefined;

  return {
    character,
    isLoading,
    error: isError ? getErrorMessage(error) : null,
  };
}
