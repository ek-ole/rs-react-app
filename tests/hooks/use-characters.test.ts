import { renderHook, waitFor } from '@testing-library/react';
import { useSearchParams } from 'react-router';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { getErrorMessage } from '@/api/api-error-handler';
import { useCharacters } from '@/hooks/use-characters';
import useLocalStorage from '@/hooks/use-local-storage';
import { loadAndProcessCharacters } from '@/services/app-service';
import type { Character } from '@/types/character';

vi.mock('@/hooks/use-local-storage');
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});
vi.mock('@/services/app-service');
vi.mock('@/api/api-error-handler');

describe('useCharacters', () => {
  const mockSetSearchTerm = vi.fn();
  const mockSetSearchParams = vi.fn();

  const mockCharacter: Character = {
    id: 1,
    name: 'Morty',
    description: 'A nervous teenager',
    image: 'morty.png',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLocalStorage).mockReturnValue(['Morty', mockSetSearchTerm]);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ search: 'Morty', page: '2' }),
      mockSetSearchParams,
    ]);
  });

  it('should load characters on init with params from URL', async () => {
    vi.mocked(loadAndProcessCharacters).mockResolvedValue({
      characters: [mockCharacter],
      totalPages: 5,
    });

    const { result } = renderHook(() => useCharacters());
    await waitFor(() => {
      expect(result.current.appState.isLoading).toBe(false);
    });

    expect(loadAndProcessCharacters).toHaveBeenCalledWith('Morty', 2);
    expect(result.current.appState.characters).toEqual([mockCharacter]);
    expect(result.current.appState.totalPages).toBe(5);
    expect(result.current.currentPage).toBe(2);
  });

  it('should handle error from loadAndProcessCharacters', async () => {
    vi.mocked(loadAndProcessCharacters).mockRejectedValue(new Error('API error'));
    vi.mocked(getErrorMessage).mockReturnValue('Something went wrong');

    const { result } = renderHook(() => useCharacters());
    await waitFor(() => {
      expect(result.current.appState.isLoading).toBe(false);
    });

    expect(result.current.appState.error).toBe('Something went wrong');
    expect(result.current.appState.characters).toEqual([]);
  });
});
