import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';

import { Checkbox } from '@/components/ui/checkbox';

describe('Checkbox Component', () => {
  const user = userEvent.setup();

  it('renders without checkmark when unchecked', () => {
    render(<Checkbox checked={false} onChange={() => {}} />);

    const checkbox = screen.getByRole('button');
    expect(checkbox).toBeInTheDocument();
    expect(screen.queryByTestId('check-icon')).toBeNull();
  });

  it('calls onChange with inverted value on click', async () => {
    const mockOnChange = vi.fn();
    render(<Checkbox checked={false} onChange={mockOnChange} />);

    const checkbox = screen.getByRole('button');
    await user.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('handles keyboard events (Enter/Space)', async () => {
    const mockOnChange = vi.fn();
    render(<Checkbox checked={false} onChange={mockOnChange} />);

    const checkbox = screen.getByRole('button');
    checkbox.focus();

    await user.keyboard('{Enter}');
    expect(mockOnChange).toHaveBeenCalledWith(true);

    mockOnChange.mockClear();

    await user.keyboard(' ');
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });
});
