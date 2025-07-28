import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { ErrorBoundary } from '@/components/error-boundary';

const ErrorComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>content</div>;
};

describe('ErrorBoundary', () => {
  it('should catches error and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Oh my gosh! Everything is broken!')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Error Illustration' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fix it back!' })).toBeInTheDocument();
  });

  it('should recovers after click reset button', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorComponent shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('content')).toBeInTheDocument();
    render(
      <ErrorBoundary>
        <ErrorComponent shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Oh my gosh! Everything is broken!')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Fix it back!' }));

    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
