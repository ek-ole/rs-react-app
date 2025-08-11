import { renderHook } from '@testing-library/react';
import { useSearchParams } from 'react-router';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { getErrorMessage } from '@/api/api-error-handler';
import { useGetCharactersQuery } from '@/app/store';
import { useCharacters } from '@/hooks/use-characters';
import type { Character } from '@/types/character';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

vi.mock('@/app/store', () => ({
  useGetCharactersQuery: vi.fn(),
}));

vi.mock('@/api/api-error-handler', () => ({
  getErrorMessage: vi.fn(),
}));

describe('useCharacters', () => {
  const mockSetSearchParams = vi.fn();

  const mockCharacter: Character = {
    id: 1,
    name: 'Morty',
    description: 'A nervous teenager',
    image: 'morty.png',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ search: 'Morty', page: '2' }),
      mockSetSearchParams,
    ]);
  });

  it('should load characters on init with params from URL', () => {
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: {
        results: [mockCharacter],
        info: { pages: 5 },
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useCharacters());

    expect(useGetCharactersQuery).toHaveBeenCalledWith({
      name: 'Morty',
      page: 2,
    });
    expect(result.current.appState.isLoading).toBe(false);
    expect(result.current.appState.characters).toEqual([mockCharacter]);
    expect(result.current.appState.totalPages).toBe(5);
    expect(result.current.currentPage).toBe(2);
  });

  it('should handle error from loadAndProcessCharacters', () => {
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: {
        results: [mockCharacter],
        info: { pages: 5 },
      },
      isLoading: false,
      isError: true,
      error: new Error('API error'),
      refetch: vi.fn(),
    });
    vi.mocked(getErrorMessage).mockReturnValue('Something went wrong');

    const { result } = renderHook(() => useCharacters());

    expect(result.current.appState.isLoading).toBe(false);
    expect(result.current.appState.characters).toEqual([]);
    expect(result.current.appState.error).toBe('Something went wrong');
  });

  it('should handle search', () => {
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: {
        results: [mockCharacter],
        info: { pages: 5 },
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useCharacters());
    result.current.handleSearch('Morty');

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({ search: 'Morty', page: '1' }),
    );
  });

  it('should handle API error', () => {
    const testError = new Error('API error');
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: testError,
      refetch: vi.fn(),
    });
    vi.mocked(getErrorMessage).mockReturnValue('Custom error message');

    const { result } = renderHook(() => useCharacters());

    expect(result.current.appState).toEqual({
      characters: [],
      isLoading: false,
      error: 'Custom error message',
      totalPages: 1,
    });
    expect(getErrorMessage).toHaveBeenCalledWith(testError);
  });

  it('should provide refetch function', () => {
    const mockRefetch = vi.fn();
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: {
        results: [mockCharacter],
        info: { pages: 5 },
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => useCharacters());
    void result.current.refetch();

    expect(mockRefetch).toHaveBeenCalled();
  });
});
