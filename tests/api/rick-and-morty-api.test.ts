import { RickAndMortyApi } from '@/api/rick-and-morty-api';

global.fetch = vi.fn();

describe('RickAndMortyApi', () => {
  it('should call fetch with the correct URL', async () => {
    const mockData = { results: [] };
    const mockResponse = new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    vi.mocked(fetch).mockResolvedValue(mockResponse);
    await RickAndMortyApi.fetchCharacters('Rick');
    expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character?name=Rick');
  });
});
