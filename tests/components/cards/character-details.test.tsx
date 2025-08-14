import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { CharacterDetails } from '@/components/cards/character-details';
import { useCharacterDetails } from '@/hooks/use-character-details';

vi.mock('@/hooks/use-character-details');

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  description: 'Genius scientist',
  image: 'rick.png',
};

describe('CharacterDetails Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render loading state initially', () => {
    vi.mocked(useCharacterDetails).mockReturnValue({
      character: undefined,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/characters/1']}>
        <Routes>
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render character details when loaded', () => {
    vi.mocked(useCharacterDetails).mockReturnValue({
      character: mockCharacter,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/characters/1']}>
        <Routes>
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.description)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
  });

  it('should not render when no id in params', () => {
    render(
      <MemoryRouter initialEntries={['/characters/']}>
        <Routes>
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
