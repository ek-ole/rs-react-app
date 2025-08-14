import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import Search from '@/components/search';
import useLocalStorage from '@/hooks/use-local-storage';

vi.mock('@/hooks/use-local-storage');
vi.mock('./ui/search-input', () => ({
  SearchInput: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search character..."
      className="search-input"
    />
  ),
}));

describe('Search Component', () => {
  const mockOnSearch = vi.fn();
  const mockResetDetails = vi.fn();
  const mockSetLocalStorage = vi.fn();

  beforeEach(() => {
    vi.mocked(useLocalStorage).mockReturnValue(['', mockSetLocalStorage]);
    mockOnSearch.mockClear();
    mockResetDetails.mockClear();
    mockSetLocalStorage.mockClear();
  });

  it('should render search input and button', () => {
    render(<Search onSearch={mockOnSearch} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should initialize with value from localStorage', () => {
    vi.mocked(useLocalStorage).mockReturnValue(['initial value', mockSetLocalStorage]);
    render(<Search onSearch={mockOnSearch} />);

    expect(screen.getByRole('searchbox')).toHaveValue('initial value');
  });

  it('should call onSearch with trimmed value', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockOnSearch} />);

    await user.type(screen.getByRole('searchbox'), '  Rick  ');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
  });
});
