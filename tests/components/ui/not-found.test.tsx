import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NotFound } from '@/components/ui/not-found';

const mockOnReset = vi.fn();
const defaultProps = {
  error: 'Test error message',
  onReset: mockOnReset,
};

vi.mock('@/services/storage', () => ({
  LocalStorageService: {
    clearSearchTerm: vi.fn(),
  },
}));

describe('NotFound', () => {
  const user = userEvent.setup();

  it('should render error message', () => {
    render(<NotFound {...defaultProps} />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should render error image', () => {
    render(<NotFound {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/not-found.webp');
  });

  it('should call onReset on button click', async () => {
    render(<NotFound {...defaultProps} />);
    const button = screen.getByRole('button', { name: /reset search/i });

    await user.click(button);
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});
