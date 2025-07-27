import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Results from '@/components/results';

describe('Results', () => {
  const mockCharacters = [
    { id: 1, name: 'Rick Sanchez', description: 'Alive', image: 'rick.png' },
    { id: 2, name: 'Morty Smith', description: 'Alive', image: 'morty.png' },
  ];

  it('should render characters grid with all items', () => {
    render(
      <MemoryRouter>
        <Results characters={mockCharacters} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /characters/i })).toBeInTheDocument();

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });
});
