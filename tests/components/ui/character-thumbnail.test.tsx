import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';

import { CharacterThumbnail } from '@/components/ui/character-thumbnail';
import type { Character } from '@/types/character';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'rick.png',
  description: '',
};

describe('CharacterThumbnail Component', () => {
  const user = userEvent.setup();

  it('renders character image', () => {
    render(<CharacterThumbnail character={mockCharacter} onRemove={() => {}} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCharacter.image);
    expect(image).toHaveAttribute('alt', mockCharacter.image);
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
  });

  it('calls onRemove when clicked', async () => {
    const mockOnRemove = vi.fn();
    render(<CharacterThumbnail character={mockCharacter} onRemove={mockOnRemove} />);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    render(<CharacterThumbnail character={mockCharacter} onRemove={() => {}} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});
