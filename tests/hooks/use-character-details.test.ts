import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import { getErrorMessage } from '@/api/api-error-handler';
import { useGetCharacterByIdQuery } from '@/app/store';
import { useCharacterDetails } from '@/hooks/use-character-details';
import type { ApiCharacter } from '@/types/api';
import type { Character } from '@/types/character';

vi.mock('@/app/store', () => ({
  useGetCharacterByIdQuery: vi.fn(),
}));

vi.mock('@/api/api-error-handler', () => ({
  getErrorMessage: vi.fn((error: Error) => `Error: ${error?.message}`),
}));

vi.mock('@/api/map-characters', () => ({
  mapApiToCharacter: vi.fn((char: ApiCharacter): Character => char),
}));

describe('useCharacterDetails', () => {
  it('should returns character and isLoading = false, error = null on successful request', () => {
    const mockCharacter = { id: 1, name: 'Rick Sanchez' };

    vi.mocked(useGetCharacterByIdQuery).mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useCharacterDetails('1'));

    expect(result.current.character).toEqual(mockCharacter);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should returns isLoading = true during loading', () => {
    vi.mocked(useGetCharacterByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useCharacterDetails('1'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.character).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('should return a formatted error when isError = true', () => {
    const apiError = { message: 'Not found' };

    vi.mocked(useGetCharacterByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: apiError,
      refetch: vi.fn(),
    });

    vi.mocked(getErrorMessage).mockReturnValue('Character not found');

    const { result } = renderHook(() => useCharacterDetails('1'));

    expect(result.current.character).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Character not found');
  });

  it('should not trigger a request if id is not passed', () => {
    vi.mocked(useGetCharacterByIdQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: vi.fn(),
    });

    renderHook(() => useCharacterDetails(undefined));

    expect(useGetCharacterByIdQuery).toHaveBeenCalledWith('', { skip: true });
  });
});
