import { render, screen } from '@testing-library/react';

import App from '@/App';
import useLocalStorage from '@/hooks/use-local-storage';
import { loadAndProcessCharacters } from '@/services/app-service';

vi.mock('@/services/app-service');
vi.mock('@/hooks/useLocalStorage');

describe('App', () => {
  const mockCharacters = [
    { id: 1, name: 'Rick', description: 'Human', image: 'rick.png' },
    { id: 2, name: 'Morty', description: 'Human', image: 'morty.png' },
  ];

  beforeEach(() => {
    vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);

    vi.mocked(loadAndProcessCharacters).mockResolvedValue(mockCharacters);
  });

  it('should render header text', () => {
    render(<App />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/rick & morty/i);
  });
});
