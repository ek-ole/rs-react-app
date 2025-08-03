import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { fetchCharacter } from '@/api/rick-and-morty-api';
import { CharacterDetails } from '@/components/cards/character-details';

vi.mock('@/api/rick-and-morty-api');
vi.mock('./ui/loader', () => ({
  Loader: () => <div>Loading...</div>,
}));

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  description: 'Genius scientist',
  image: 'rick.png',
};

describe('CharacterDetails Component', () => {
  beforeEach(() => {
    vi.mocked(fetchCharacter).mockReset();
  });

  it('should render loading state initially', () => {
    vi.mocked(fetchCharacter).mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={['/characters/1']}>
        <Routes>
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render character details when loaded', async () => {
    vi.mocked(fetchCharacter).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/characters/1']}>
        <Routes>
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
      expect(screen.getByText(mockCharacter.description)).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
    });
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
