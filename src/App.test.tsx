import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';

import App from './App';

vi.mock('lottie-react', () => ({
  default: () => <div>Mock Lottie</div>,
  __esModule: true,
}));

test('renders hello text', () => {
  render(<App />);
  expect(screen.getByText(/rick & morty/i)).toBeInTheDocument();
});
