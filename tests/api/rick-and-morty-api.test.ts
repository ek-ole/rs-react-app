import { fetchCharacters } from '@/api/rick-and-morty-api';

global.fetch = vi.fn();

describe('RickAndMortyApi', () => {
  it('should call fetch with name and page params', async () => {
    const mockResponse = new Response(JSON.stringify({ results: [] }), { status: 200 });
    vi.mocked(fetch).mockResolvedValue(mockResponse);

    await fetchCharacters('Rick', 2);
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character?name=Rick&page=2',
    );
  });
});
