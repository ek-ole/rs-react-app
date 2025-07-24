import { useEffect, useState } from 'react';

function useLocalStorage(key: string, initialValue: string): [string, (value: string) => void] {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as string) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing ro localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
