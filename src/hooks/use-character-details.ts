import { useState, useEffect } from 'react';

import { getErrorMessage } from '@/api/api-error-handler';
import { fetchCharacter } from '@/api/rick-and-morty-api';
import type { Character } from '@/types/character';

export function useCharacterDetails(id?: string) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadCharacter = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCharacter(id);
        setCharacter(data);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };
    void loadCharacter();
  }, [id]);

  return { character, isLoading, error };
}
