import { AppService } from '@/services/app-service';
import { CharacterService } from '@/services/character-service';
import { LocalStorageService } from '@/services/storage';

vi.mock('@/services/character-service');
vi.mock('@/services/storage');

describe('AppService', () => {
  describe('loadCharacters()', () => {
    it('should load characters via CharacterService', async () => {
      const mockCharacters = [{ id: 1, name: 'Rick' }];
      vi.mocked(CharacterService).loadCharacters = vi.fn().mockResolvedValue(mockCharacters);

      const result = await AppService.loadCharacters('Rick');
      expect(vi.mocked(CharacterService).loadCharacters).toHaveBeenCalledWith('Rick');
      expect(result).toEqual(mockCharacters);
    });

    it('should handle errors via ApiErrorHandler', async () => {
      vi.spyOn(CharacterService, 'loadCharacters').mockImplementation(() => {
        throw new Error('API request failed: 404 Not Found');
      });
      await expect(AppService.loadCharacters('Rick')).rejects.toThrow(
        "Sorry, we couldn't find any characters matching your search",
      );
    });

    it('should return value from LocalStorage', () => {
      vi.spyOn(LocalStorageService, 'getSearchTerm').mockImplementation(() => 'Rick');
      expect(AppService.getInitialSearchTerm()).toBe('Rick');
    });
  });
});
