import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from '@/components/search';
import useLocalStorage from '@/hooks/useLocalStorage';

vi.mock('@/hooks/useLocalStorage');

describe('Search Component', () => {
  const mockOnSearch = vi.fn();
  let mockSetLocalStorage = vi.fn();

  beforeEach(() => {
    mockSetLocalStorage = vi.fn();
    vi.mocked(useLocalStorage).mockReturnValue(['initial value', mockSetLocalStorage]);
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

  it('should initialize with value from localStorage', () => {
    vi.mocked(useLocalStorage).mockReturnValue(['saved value', mockSetLocalStorage]);

    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByRole('searchbox')).toHaveValue('saved value');
  });

  it('should call onSearch with trimmed input value on submit', async () => {
    const user = userEvent.setup();
    vi.mocked(useLocalStorage).mockReturnValue(['  Rick  ', mockSetLocalStorage]);

    render(<Search onSearch={mockOnSearch} />);
    screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.click(button);

    expect(mockSetLocalStorage).toHaveBeenCalledWith('Rick');
    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
  });
});
