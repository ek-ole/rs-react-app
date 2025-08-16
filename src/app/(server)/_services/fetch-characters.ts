import { getErrorMessage } from '@/app/_lib/api-error-handler';
import type { ApiResponse } from '@/app/_types/api';

export async function fetchCharacters(params: {
  name?: string;
  page: number;
}): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?${new URLSearchParams({
        name: params.name || '',
        page: params.page.toString(),
      })}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as ApiResponse;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
