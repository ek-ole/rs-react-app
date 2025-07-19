vi.mock('@/services/storage', () => ({
  LocalStorageService: {
    getSearchTerm: vi.fn(() => 'initial value'),
    setSearchTerm: vi.fn(),
    clearSearchTerm: vi.fn(),
  },
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from '@/components/search';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });
  it('should render input, button', () => {
    render(<Search onSearch={vi.fn()} />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('initial value');

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  it('should trim input and call onSearch', async () => {
    const mockOnSearch = vi.fn();
    const user = userEvent.setup();

    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, '  Rick ');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
  });
});
