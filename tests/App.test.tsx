import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { vi, describe, it, expect } from 'vitest';

import App from '@/App';
import { useCharacters } from '@/hooks/use-characters';
import selectedCharactersReducer from '@/services/selected-characters';

vi.mock('@/hooks/use-characters');

describe('App component', () => {
  const mockHandleSearch = vi.fn();
  const mockHandlePageChange = vi.fn();

  const store = configureStore({
    reducer: {
      selectedCharacters: selectedCharactersReducer,
    },
  });

  it('renders loader when loading', () => {
    vi.mocked(useCharacters).mockReturnValue({
      appState: {
        isLoading: true,
        error: null,
        characters: [],
        totalPages: 0,
      },
      currentPage: 1,
      handleSearch: mockHandleSearch,
      handlePageChange: mockHandlePageChange,
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Rick & Morty/i)).toBeInTheDocument();
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
      handleSearch: mockHandleSearch,
      handlePageChange: mockHandlePageChange,
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('renders results and pagination when data is available', () => {
    vi.mocked(useCharacters).mockReturnValue({
      appState: {
        isLoading: false,
        error: null,
        characters: [
          {
            id: 1,
            name: 'Rick',
            description: '',
            image: '',
          },
        ],
        totalPages: 5,
      },
      currentPage: 1,
      handleSearch: mockHandleSearch,
      handlePageChange: mockHandlePageChange,
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Rick & Morty/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});
