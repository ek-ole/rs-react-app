import { configureStore } from '@reduxjs/toolkit';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { CharacterCard } from '@/components/cards/character-card';
import selectedCharactersReducer from '@/services/selected-characters';
import type { Character } from '@/types/character';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'rick.png',
  description: '',
};

describe('CharacterCard Component', () => {
  const user = userEvent.setup();
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        selectedCharacters: selectedCharactersReducer,
      },
    });
  });

  it('should render character name and image', () => {
    render(
      <Provider store={store}>
        <CharacterCard character={mockCharacter} />
      </Provider>,
    );

    const card = screen.getByRole('button', { name: `View details for ${mockCharacter.name}` });
    expect(within(card).getByRole('img')).toHaveAttribute('src', mockCharacter.image);
    expect(within(card).getByText(mockCharacter.name)).toBeInTheDocument();
  });

  it('should call onClick when card is clicked', async () => {
    const mockOnClick = vi.fn();
    render(
      <Provider store={store}>
        <CharacterCard character={mockCharacter} onClick={mockOnClick} />
      </Provider>,
    );

    const card = screen.getByRole('button', { name: `View details for ${mockCharacter.name}` });
    await user.click(card);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
