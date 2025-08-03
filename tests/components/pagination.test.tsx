import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { Pagination } from '@/components/pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();
  const baseProps = {
    currentPage: 3,
    totalPages: 10,
    onPageChange: mockOnPageChange,
  };

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('should render pagination controls', () => {
    render(<Pagination {...baseProps} />);

    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('...')).toHaveLength(1);
  });

  it('should handle previous and next buttons', () => {
    render(<Pagination {...baseProps} />);

    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByLabelText('Next page'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('should disable previous button on first page', () => {
    render(<Pagination {...baseProps} currentPage={1} />);

    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(<Pagination {...baseProps} currentPage={10} />);

    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('should show correct pages range', () => {
    render(<Pagination {...baseProps} currentPage={5} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});
