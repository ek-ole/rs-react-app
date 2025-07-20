import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '@/App';
import { AppService } from '@/services/app-service';

vi.mock('@/services/app-service');
vi.mock('@/components/results', () => ({
  default: () => <div data-testid="mock-results" />,
}));

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(AppService, 'loadCharacters').mockResolvedValue([]);
    vi.spyOn(AppService, 'saveSearchTerm').mockImplementation(() => {});
  });

  const mockCharacters = [
    { id: 1, name: 'Rick', description: 'Human', image: 'rick.png' },
    { id: 2, name: 'Morty', description: 'Human', image: 'morty.png' },
  ];

  it('should render header text', () => {
    render(<App />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/rick & morty/i);
  });

  it('should update character list after search', async () => {
    const loadCharactersSpy = vi
      .spyOn(AppService, 'loadCharacters')
      .mockResolvedValue(mockCharacters);

    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button');

    await user.type(input, 'Rick');
    await user.click(button);

    expect(loadCharactersSpy).toHaveBeenCalledWith('Rick');
  });
});
