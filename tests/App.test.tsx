import { render, screen } from '@testing-library/react';

import App from '@/App';

describe('header', () => {
  it('should render header text', () => {
    render(<App />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/rick & morty/i);
  });
});
