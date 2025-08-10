import { configureStore } from '@reduxjs/toolkit';
import type {
  QueryActionCreatorResult,
  QueryDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { vi, describe, it, expect } from 'vitest';

import App from '@/App';
import { useCharacters } from '@/hooks/use-characters';
import selectedCharactersReducer from '@/services/selected-characters';
import type { ApiResponse } from '@/types/api';

vi.mock('@/hooks/use-characters', () => ({
  useCharacters: vi.fn(),
}));

const mockRefetch = vi.fn() as unknown as () => QueryActionCreatorResult<
  QueryDefinition<
    { name?: string; page: number },
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
    'Characters' | 'Character',
    ApiResponse,
    'rickAndMortyApi'
  >
>;

const renderApp = (initialEntries = ['/']) => {
  const store = configureStore({
    reducer: {
      selectedCharacters: selectedCharactersReducer,
    },
  });

  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>,
  );
};

describe('App component', () => {
  it('renders loader when loading', () => {
    vi.mocked(useCharacters).mockReturnValue({
      appState: {
        isLoading: true,
        error: null,
        characters: [],
        totalPages: 0,
      },
      currentPage: 1,
      handleSearch: vi.fn(),
      handlePageChange: vi.fn(),
      refetch: mockRefetch,
    });

    renderApp();

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(screen.getByText(/Rick & Morty/i)).toBeInTheDocument();
    expect(screen.queryByText(/Rick Sanchez/i)).not.toBeInTheDocument();
  });

  it('renders NotFound when error exists', () => {
    vi.mocked(useCharacters).mockReturnValue({
      appState: {
        isLoading: false,
        error: 'Something went wrong',
        characters: [],
        totalPages: 0,
      },
      currentPage: 1,
      handleSearch: vi.fn(),
      handlePageChange: vi.fn(),
      refetch: mockRefetch,
    });

    renderApp();

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset search/i })).toBeInTheDocument();
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });
});
