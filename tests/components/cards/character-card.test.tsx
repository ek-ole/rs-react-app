import { render, screen } from '@testing-library/react';

import { CharacterCard } from '@/components/cards/character-card';
import type { Character } from '@/types/character';

describe('CharacterCard', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    description: 'Species: Human, status: Alive \nLocation: Earth',
    image: 'rick.png',
  };

  it('should render character card', () => {
    render(<CharacterCard character={mockCharacter} />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'rick.png');

    const name = screen.getByText(/Rick Sanchez/i);
    expect(name).toBeInTheDocument();

    expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
    expect(screen.getByText(/status: Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/Location: Earth/i)).toBeInTheDocument();
  });
});
