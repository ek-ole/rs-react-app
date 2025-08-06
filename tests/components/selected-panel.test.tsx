import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { SelectedPanel } from '@/components/selected-panel';
import selectedCharactersReducer from '@/services/selected-characters';
import type { Character } from '@/types/character';

vi.mock('@/utils/csv', () => ({
  generateCSVContent: vi.fn(() => 'mocked,csv,content'),
  downloadCSV: vi.fn(),
  prepareCharactersForCSV: vi.fn((chars: Character[]) =>
    chars.map((character) => ({
      id: character.id,
      name: character.name,
      image: character.image,
    })),
  ),
}));

describe('SelectedPanel Component', () => {
  let store: ReturnType<typeof configureStore>;

  const mockCharacters: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      image: 'rick.png',
      description: '',
    },
    {
      id: 2,
      name: 'Morty Smith',
      image: 'morty.png',
      description: '',
    },
  ];

  beforeEach(() => {
    store = configureStore({
      reducer: {
        selectedCharacters: selectedCharactersReducer,
      },
      preloadedState: {
        selectedCharacters: {
          ids: [1, 2],
          characters: mockCharacters,
        },
      },
    });
  });

  it('does not render when no characters selected', () => {
    const emptyStore = configureStore({
      reducer: {
        selectedCharacters: selectedCharactersReducer,
      },
      preloadedState: {
        selectedCharacters: {
          ids: [],
          characters: [],
        },
      },
    });

    render(
      <Provider store={emptyStore}>
        <SelectedPanel />
      </Provider>,
    );

    expect(screen.queryByTestId('selected-panel')).toBeNull();
  });

  it('dispatches clearAll action when "Unselect all" clicked', async () => {
    const user = userEvent.setup();
    const mockDispatch = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <SelectedPanel />
      </Provider>,
    );

    await user.click(screen.getByText('Unselect all'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'selectedCharacters/clearAll',
    });
  });

  it('calls downloadCSV when "Download CSV" clicked', async () => {
    const user = userEvent.setup();
    const { downloadCSV } = await import('@/utils/csv');

    render(
      <Provider store={store}>
        <SelectedPanel />
      </Provider>,
    );

    await user.click(screen.getByText('Download CSV'));
    expect(downloadCSV).toHaveBeenCalledWith('mocked,csv,content', '2_characters.csv');
  });
});
