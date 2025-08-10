import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { RefreshButton } from '@/components/ui/refresh-button';

vi.mock('react-router', () => ({
  useSearchParams: () => [new URLSearchParams()],
}));

vi.mock('../../../src/app/store', () => ({
  useGetCharactersQuery: () => ({
    refetch: vi.fn(),
    isFetching: false,
  }),
}));

vi.mock('lucide-react', () => ({
  RefreshCw: () => <span>↻</span>,
}));

describe('RefreshButton', () => {
  it('should render button', () => {
    render(<RefreshButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('↻')).toBeInTheDocument();
  });
});
