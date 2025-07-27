import { renderHook, act, waitFor } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';

import { getErrorMessage } from '@/api/api-error-handler';
import { useCharacters } from '@/hooks/use-characters';
import useLocalStorage from '@/hooks/use-local-storage';
import { loadAndProcessCharacters } from '@/services/app-service';

vi.mock('@/hooks/use-local-storage');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
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

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLocalStorage).mockReturnValue(['Morty', mockSetSearchTerm]);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ search: 'Morty', page: '2' }),
      mockSetSearchParams,
    ]);
  });

  it('should load characters on init with params from URL', async () => {
    const charactersMock = [{ id: 1, name: 'Morty' }];
    vi.mocked(loadAndProcessCharacters).mockResolvedValue({
      characters: charactersMock,
      totalPages: 5,
    });

    const { result } = renderHook(() => useCharacters());
    await waitFor(() => {
      expect(result.current.state.isLoading).toBe(false);
    });

    expect(loadAndProcessCharacters).toHaveBeenCalledWith('Morty', 2);
    expect(result.current.state.characters).toEqual(charactersMock);
    expect(result.current.state.totalPages).toBe(5);
    expect(result.current.currentPage).toBe(2);
  });

  it('should handle search', () => {
    const { result } = renderHook(() => useCharacters());

    vi.mocked(loadAndProcessCharacters).mockResolvedValue({
      characters: [],
      totalPages: 1,
    });

    act(() => result.current.handleSearch('Rick'));

    expect(mockSetSearchTerm).toHaveBeenCalledWith('Rick');
    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
    expect(loadAndProcessCharacters).toHaveBeenCalledWith('Rick', 1);
  });

  it('should handle error from loadAndProcessCharacters', async () => {
    vi.mocked(loadAndProcessCharacters).mockRejectedValue(new Error('API error'));
    vi.mocked(getErrorMessage).mockReturnValue('Something went wrong');

    const { result } = renderHook(() => useCharacters());
    await waitFor(() => {
      expect(result.current.state.isLoading).toBe(false);
    });

    expect(result.current.state.error).toBe('Something went wrong');
    expect(result.current.state.characters).toEqual([]);
  });
});
