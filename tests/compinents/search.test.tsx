import { render, screen } from '@testing-library/react';

import Search from '@/components/search';

describe('Search Component', () => {
  it('should render form, input, button', () => {
    render(<Search onSearch={() => {}} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
});
