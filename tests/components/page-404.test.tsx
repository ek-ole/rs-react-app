import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';

import Page404 from '@/components/page-404';

describe('Page404', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>,
    );
  });

  it('should render the 404 heading', () => {
    const heading = screen.getByRole('heading', {
      name: /oops! page not found.../i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should render home link with correct attributes', () => {
    const homeLink = screen.getByRole('link', { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render 404 image with correct attributes', () => {
    const image = screen.getByRole('img', { name: /404/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/404.webp');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});
