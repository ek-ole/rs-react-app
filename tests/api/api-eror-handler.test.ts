import { describe, it, expect } from 'vitest';

import { checkResponse, getErrorMessage } from '@/api/api-error-handler';

describe('ApiErrorHandler', () => {
  describe('checkResponse', () => {
    it('should not throw for successful response', () => {
      const response = { ok: true } as Response;
      expect(() => checkResponse(response)).not.toThrow();
    });

    it('should throw error for failed response', () => {
      const response = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response;

      expect(() => checkResponse(response)).toThrow('API request failed: 404 Not Found');
    });
  });

  describe('getErrorMessage', () => {
    it('should return friendly message for 404 errors', () => {
      const error = new Error('Failed to fetch characters: API request failed: 404 Not Found');
      const result = getErrorMessage(error);

      expect(result).toBe("Sorry, we couldn't find any characters matching your search");
    });

    it('should return server message for 500 errors', () => {
      const error = new Error(
        'Failed to fetch characters: API request failed: 500 Internal Server Error',
      );
      const result = getErrorMessage(error);

      expect(result).toBe('Our servers are having issues, please try again later');
    });

    it('should return clean message for other Error instances', () => {
      const error = new Error('Failed to fetch characters: Network error');
      const result = getErrorMessage(error);

      expect(result).toBe('Network error');
    });

    it('should return default message for non-Error values', () => {
      const result = getErrorMessage('Some error');
      expect(result).toBe('Something went wrong, please try again');
    });

    it('should handle error without prefix', () => {
      const error = new Error('API request failed: 400 Bad Request');
      const result = getErrorMessage(error);

      expect(result).toBe('API request failed: 400 Bad Request');
    });
  });
});
