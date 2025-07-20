import { render, screen } from '@testing-library/react';

import { SearchInput } from '@/components/ui/search-input';

const mockOnChange = vi.fn();
const defaultProps = {
  value: '',
  onChange: mockOnChange,
  placeholder: 'Test placeholder',
};

describe('SearchInput', () => {
  it('should render input with placeholder', () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Test placeholder');
  });

  it('should use default placeholder if none provided', () => {
    render(<SearchInput {...defaultProps} placeholder={undefined} />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('placeholder', 'Search character...');
  });

  it('should display the passed value', () => {
    render(<SearchInput {...defaultProps} value="Rick" />);
    expect(screen.getByRole('searchbox')).toHaveValue('Rick');
  });
});
