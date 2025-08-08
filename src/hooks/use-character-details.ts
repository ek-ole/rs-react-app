import { getErrorMessage } from '@/api/api-error-handler';
import { useGetCharacterByIdQuery } from '@/app/store';

export function useCharacterDetails(id?: string) {
  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useGetCharacterByIdQuery(id || '', {
    skip: !id,
  });

  return {
    character,
    isLoading,
    error: isError ? getErrorMessage(error) : null,
  };
}
