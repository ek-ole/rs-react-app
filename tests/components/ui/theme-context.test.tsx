import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach } from 'vitest';

import { ThemeProvider, useTheme } from '@/components/ui/theme-context';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Current theme: {theme}</button>;
}

describe('ThemeProvider', () => {
  afterEach(() => {
    document.body.className = '';
  });

  it('should render with default theme "light"', () => {
    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Current theme: light');
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('should toggle to "dark" theme and apply dark class', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(button).toHaveTextContent('Current theme: dark');
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('should toggle back to "light" theme and remove dark class', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(button);

    expect(button).toHaveTextContent('Current theme: light');
    expect(document.body.classList.contains('dark')).toBe(false);
  });
});
