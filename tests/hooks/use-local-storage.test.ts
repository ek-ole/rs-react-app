import { act, renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import useLocalStorage from '@/hooks/use-local-storage';

describe('useLocalStorage', () => {
  const TEST_KEY = 'test_key';
  const INITIAL_VALUE = 'initial';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value when no data in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));

    expect(result.current[0]).toBe(INITIAL_VALUE);
  });

  it('should return stored value from localStorage', () => {
    const storedValue = 'stored_value';
    localStorage.setItem(TEST_KEY, JSON.stringify(storedValue));

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));

    expect(result.current[0]).toBe(storedValue);
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));

    const newValue = 'new_value';
    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toBe(newValue);
    expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(newValue));
  });

  it('should handle localStorage errors gracefully', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
      throw new Error('Storage failed');
    });

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, INITIAL_VALUE));

    expect(() => {
      act(() => {
        result.current[1]('new_value');
      });
    }).not.toThrow();
  });
});
