import { render, screen } from '@testing-library/react';

import { Loader } from '@/components/ui/loader';

describe('Loader', () => {
  it('should render loading image and text', () => {
    render(<Loader />);

    const img = screen.getByRole('img', { name: 'Loading...' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/morty-dance-loader.gif');

    const text = screen.getByText('Loading...');
    expect(text).toBeInTheDocument();
  });
});
