import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { store } from '@/app/store';
import Results from '@/components/results';

describe('Results', () => {
  const mockCharacters = [
    { id: 1, name: 'Rick Sanchez', description: 'Alive', image: 'rick.png' },
    { id: 2, name: 'Morty Smith', description: 'Alive', image: 'morty.png' },
  ];

  it('should render characters grid with all items', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Results characters={mockCharacters} />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /characters/i })).toBeInTheDocument();

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });
});
