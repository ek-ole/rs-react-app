import { getErrorMessage } from '@/api/api-error-handler';
import useLocalStorage from '@/hooks/use-local-storage';
import { loadAndProcessCharacters, useSaveSearchTerm, useSearchTerm } from '@/services/app-service';
import { loadCharacters } from '@/services/character-service';

vi.mock('@/services/character-service');
vi.mock('@/hooks/use-local-storage');
vi.mock('@/api/api-error-handler');
vi.mock('@/api/map-characters');

describe('AppService', () => {
  const mockSetTerm = vi.fn();
  describe('loadAndProcessCharacters()', () => {
    it('should handle errors', async () => {
      vi.mocked(loadCharacters).mockRejectedValue(new Error('404 Not Found'));
      vi.mocked(getErrorMessage).mockReturnValue('Custom error message');

      await expect(loadAndProcessCharacters('Rick')).rejects.toThrow('Custom error message');
    });
  });

  describe('useSearchTerm()', () => {
    it('should return search term from storage', () => {
      vi.mocked(useLocalStorage).mockReturnValue(['Rick', mockSetTerm]);
      expect(useSearchTerm()).toBe('Rick');
    });
  });

  describe('useSaveSearchTerm()', () => {
    it('should save trimmed term to storage', () => {
      useSaveSearchTerm()('  Rick  ');
      expect(mockSetTerm).toHaveBeenCalledWith('Rick');
    });
  });
});
