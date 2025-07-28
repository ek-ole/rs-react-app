import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';

import { CharacterCard } from '@/components/cards/character-card';
import type { Character } from '@/types/character';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  description: 'Genius scientist from Earth',
  image: 'rick.png',
};

describe('CharacterCard Component', () => {
  const user = userEvent.setup();

  it('should render character information', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockCharacter.name);
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.description)).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const mockOnClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    await user.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Space key is pressed', async () => {
    const mockOnClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    await user.type(card, '{Space}');
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should have proper ARIA attributes', () => {
    render(<CharacterCard character={mockCharacter} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-label', `View details for ${mockCharacter.name}`);
  });

  it('should handle keyboard navigation correctly', async () => {
    const mockOnClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);

    const card = screen.getByRole('button');

    await user.tab();
    expect(card).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    await user.keyboard(' ');
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });
});
