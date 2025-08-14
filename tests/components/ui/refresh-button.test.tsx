import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { RefreshButton } from '@/components/ui/refresh-button';

const mockRefetchList = vi.fn();
const mockRefetchDetails = vi.fn();

vi.mock('react-router', () => ({
  useSearchParams: () => [new URLSearchParams()],
  useParams: () => ({}),
}));

vi.mock('@/app/store', () => ({
  useGetCharactersQuery: () => ({
    refetch: mockRefetchList,
    isFetching: false,
  }),
  useGetCharacterByIdQuery: () => ({
    refetch: mockRefetchDetails,
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
