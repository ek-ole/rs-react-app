import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchCharacter } from '@/api/rick-and-morty-api';
import type { Character } from '@/types/character';
import { cn } from '@/utils/cn';

import { Loader } from './ui/loader';

export function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    void fetchCharacter(id)
      .then((data) => setCharacter(data))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (!id) return null;

  const handleClose = () => {
    void navigate('/');
  };

  return (
    <div className="flex flex-col py-10">
      <div className="flex justify-end">
        <button
          onClick={handleClose}
          className={cn(
            'hover:text-foreground/95',
            'cursor-pointer',
            'rounded-4xl text-3xl hover:scale-120',
            'font-bold transition-transform duration-300',
          )}
        >
          ×
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : character ? (
        <div
          className={cn(
            'shadow-foreground/50 my-2 flex flex-col',
            'items-center gap-2 rounded-xl border-4 p-4',
            'shadow-lg transition-shadow hover:shadow-md lg:p-3',
          )}
        >
          <h2 className="text-lg font-semibold lg:text-base">{character.name}</h2>
          <img
            src={character.image}
            alt={character.name}
            className="error-message mb-3 h-full w-full rounded-lg object-cover lg:h-40"
          />
          <p>{character.description}</p>
        </div>
      ) : (
        <p>Character not found</p>
      )}
    </div>
  );
}
