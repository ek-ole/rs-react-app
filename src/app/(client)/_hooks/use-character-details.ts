'use client';
import { useGetCharacterByIdQuery } from '@/app/(client)/_store/store';
import { getErrorMessage } from '@/app/(server)/_lib/api-error-handler';
import { mapApiToCharacter } from '@/app/(server)/_lib/map-characters';

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
