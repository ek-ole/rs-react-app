import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { vi, describe, it, expect } from 'vitest';

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

  it('should render character information', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockCharacter.name);
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const mockOnClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    await user.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should toggle checkbox when clicked', async () => {
    const store = configureStore({
      reducer: {
        selectedCharacters: selectedCharactersReducer,
      },
    });

    render(
      <Provider store={store}>
        <CharacterCard character={mockCharacter} />
      </Provider>,
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
