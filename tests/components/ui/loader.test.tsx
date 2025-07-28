import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Loader } from '@/components/ui/loader';

describe('Loader', () => {
  it('should render loading image and text', () => {
    render(<Loader />);

    const video = screen.getByTestId('loader-video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('autoPlay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsInline');

    const source = screen.getByTestId('source-video');
    expect(source).toHaveAttribute('src', '/morty-dance-loader.webm');
    expect(source).toHaveAttribute('type', 'video/webm');

    const text = screen.getByText('Loading...');
    expect(text).toBeInTheDocument();
  });
});
