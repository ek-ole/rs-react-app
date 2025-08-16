'use client';
import { useEffect, useState } from 'react';

function useLocalStorage(key: string, initialValue: string): [string, (value: string) => void] {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
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
      localStorage.setItem(key, JSON.stringify(searchTerm));
    } catch (error) {
      console.error('Error writing ro localStorage:', error);
    }
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm];
}

export default useLocalStorage;
