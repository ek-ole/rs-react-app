import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component } from 'react';

import Results from '@/components/results';

describe('Results', () => {
  const mockCharacters = [
    { id: 1, name: 'Rick Sanchez', description: 'Alive', image: 'rick.png' },
    { id: 2, name: 'Morty Smith', description: 'Alive', image: 'morty.png' },
  ];

  class TestErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
    state = { hasError: false };

    static getDerivedStateFromError(): { hasError: boolean } {
      return { hasError: true };
    }

    componentDidCatch(error: Error): void {
      console.error(error);
    }

    render(): React.ReactNode {
      if (this.state.hasError) {
        return <div data-testid="error-boundary">Error</div>;
      }
      return this.props.children;
    }
  }

  it('should render cards gris', () => {
    render(<Results characters={mockCharacters} />);

    const header = screen.getByRole('heading', { name: /characters/i });
    expect(header).toBeInTheDocument();
  });

  it('should render error button', () => {
    render(<Results characters={mockCharacters} />);

    const button = screen.getByRole('button', { name: /Break everything/i });
    expect(button).toBeInTheDocument();
  });

  it('should show error when button click', async () => {
    const originalError = console.error;
    const mockError = vi.fn();
    console.error = mockError;
    const user = userEvent.setup();

    try {
      render(
        <TestErrorBoundary>
          <Results characters={mockCharacters} />
        </TestErrorBoundary>,
      );

      const button = screen.getByRole('button', { name: /Break everything/i });
      await user.click(button);

      expect(mockError).toHaveBeenCalled();
    } finally {
      console.error = originalError;
    }
  });
});
