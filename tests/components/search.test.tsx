import { render, screen } from '@testing-library/react';

import Search from '@/components/search';
import useLocalStorage from '@/hooks/use-local-storage';

vi.mock('@/hooks/use-local-storage');

describe('Search Component', () => {
  const mockOnSearch = vi.fn();
  const mockSetLocalStorage = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useLocalStorage).mockReturnValue(['', mockSetLocalStorage]);
  });

  it('should render input and button', () => {
    render(<Search onSearch={mockOnSearch} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should initialize with value from localStorage', () => {
    vi.mocked(useLocalStorage).mockReturnValue(['saved value', mockSetLocalStorage]);
    render(<Search onSearch={mockOnSearch} />);

    expect(screen.getByRole('searchbox')).toHaveValue('saved value');
  });
});
