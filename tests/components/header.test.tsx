import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, beforeEach } from 'vitest';

import { Header } from '@/components/header';

describe('Header Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
  });

  it('should render logo link with correct attributes', () => {
    const logoLink = screen.getByRole('link', { name: /logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    const logoImage = screen.getByRole('img', { name: /logo/i });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/favicon.svg');
  });

  it('should render about link with correct attributes', () => {
    const aboutLink = screen.getByRole('link', { name: /about us/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
