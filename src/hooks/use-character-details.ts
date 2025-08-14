import { getErrorMessage } from '@/api/api-error-handler';
import { mapApiToCharacter } from '@/api/map-characters';
import { useGetCharacterByIdQuery } from '@/store/store';

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
