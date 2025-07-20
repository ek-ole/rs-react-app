import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from '@/components/search';

vi.mock('@/services/storage', () => ({
  LocalStorageService: {
    getSearchTerm: () => 'initial value',
    setSearchTerm: vi.fn(),
    clearSearchTerm: vi.fn(),
  },
}));

describe('Search Component', () => {
  const user = userEvent.setup();
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render input', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('initial value');
  });

  it('should render button', () => {
    render(<Search onSearch={mockOnSearch} />);
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  it('should trim input and call onSearch', async () => {
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, '  Rick ');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
  });
});
