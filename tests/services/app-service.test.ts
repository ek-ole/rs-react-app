import useLocalStorage from '@/hooks/useLocalStorage';
import { loadAndProcessCharacters, useSaveSearchTerm, useSearchTerm } from '@/services/app-service';
import { loadCharacters } from '@/services/character-service';

vi.mock('@/services/character-service');
vi.mock('@/hooks/useLocalStorage');

describe('AppService', () => {
  const mockSetTerm = vi.fn();

  describe('loadAndProcessCharacters()', () => {
    it('should load characters via CharacterService', async () => {
      const mockCharacters = [
        {
          id: 1,
          name: 'Rick',
          description: 'Species: Human, Status: Alive\nLocation: Earth (C-137)',
          image: 'rick.png',
        },
      ];
      vi.mocked(loadCharacters).mockResolvedValue(mockCharacters);

      const result = await loadAndProcessCharacters('Rick');
      expect(vi.mocked(loadCharacters)).toHaveBeenCalledWith('Rick');
      expect(result).toEqual(mockCharacters);
    });

    it('should handle errors via ApiErrorHandler', async () => {
      vi.mocked(loadCharacters).mockImplementation(() => {
        throw new Error('API request failed: 404 Not Found');
      });
      await expect(loadAndProcessCharacters('Rick')).rejects.toThrow(
        "Sorry, we couldn't find any characters matching your search",
      );
    });

    it('should return value from LocalStorage', () => {
      vi.mocked(useLocalStorage).mockReturnValue(['Rick', mockSetTerm]);
      expect(useSearchTerm()).toBe('Rick');
    });

    it('should save term to LocalStorage', () => {
      useSaveSearchTerm()('Rick');
      expect(mockSetTerm).toHaveBeenCalledWith('Rick');
    });
  });
});
