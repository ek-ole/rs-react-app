import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';

import About from '@/components/about';

describe('About Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
  });

  it('should render the main heading', () => {
    const heading = screen.getByRole('heading', {
      name: /about the project/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should render the description text', () => {
    const description = screen.getByText(
      /this is a react application for exploring rick and morty characters/i,
    );
    expect(description).toBeInTheDocument();
    expect(description.parentElement).toHaveClass('space-y-4');
  });

  it('should render RS School link with correct attributes', () => {
    const rsLink = screen.getByRole('link', { name: /rs school react course/i });

    expect(rsLink).toBeInTheDocument();
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(rsLink).toHaveAttribute('target', '_blank');
    expect(rsLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render RS School logo with hover effect', () => {
    const rsLogo = screen.getByRole('img', { name: /rs school/i });

    expect(rsLogo).toBeInTheDocument();
    expect(rsLogo).toHaveAttribute('src', '/rss-logo.svg');
  });

  it('should render main about image with lazy loading', () => {
    const aboutImage = screen.getByRole('img', { name: /about project/i });

    expect(aboutImage).toBeInTheDocument();
    expect(aboutImage).toHaveAttribute('src', '/about-image.webp');
    expect(aboutImage).toHaveAttribute('loading', 'lazy');
  });
});
