import { LocalStorageService } from '@/services/storage';

describe('LocalStorageService', () => {
  const mockGetItem = vi.fn();
  const mockSetItem = vi.fn();
  const mockRemoveItem = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: mockGetItem,
      setItem: mockSetItem,
      removeItem: mockRemoveItem,
      clear: vi.fn(),
    });

    mockGetItem.mockReset();
    mockSetItem.mockReset();
    mockRemoveItem.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getSearchTerm', () => {
    it('should return empty string if no term is saved', () => {
      mockGetItem.mockReturnValue(null);
      const result = LocalStorageService.getSearchTerm();
      expect(result).toBe('');
      expect(mockGetItem).toHaveBeenCalledWith('rick-and-morty-search');
    });

    it('should return saved term', () => {
      mockGetItem.mockReturnValue('Rick');
      const result = LocalStorageService.getSearchTerm();
      expect(result).toBe('Rick');
    });
  });

  describe('setSearchTerm', () => {
    it('should save trimmed term', () => {
      LocalStorageService.setSearchTerm(' Rick ');
      expect(mockSetItem).toHaveBeenCalledWith('rick-and-morty-search', 'Rick');
    });

    it('should remove term if empty string is provided', () => {
      LocalStorageService.setSearchTerm(' ');
      expect(mockRemoveItem).toHaveBeenCalledWith('rick-and-morty-search');
    });
  });

  describe('clearSearchTerm', () => {
    it('should remove term', () => {
      LocalStorageService.clearSearchTerm();
      expect(mockRemoveItem).toHaveBeenCalledWith('rick-and-morty-search');
    });
  });
});
