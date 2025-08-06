import { useNavigate, useParams, useSearchParams } from 'react-router';

import { Loader } from '@/components/ui/loader';
import { useCharacterDetails } from '@/hooks/use-character-details';
import { cn } from '@/utils/cn';

export function CharacterDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { character, isLoading, error } = useCharacterDetails(id);

  if (!id) return null;

  const handleClose = () => {
    void navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div className="sticky top-0 flex w-[35%] max-w-xl flex-col py-10">
      <div className="flex justify-end">
        <button
          onClick={handleClose}
          className={cn(
            'hover:text-shadow',
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
      ) : error ? (
        <div
          className={cn(
            'mx-auto mt-6 flex w-full max-w-4xl',
            'flex-col items-center rounded-xl border-4 p-4',
            'shadow-glow',
          )}
        >
          <h2 className="text-lg font-semibold lg:text-base">Oops! Something went wrong...</h2>
          <p className="mb-4 text-center text-sm">{error}</p>
          <img
            src="/404.webp"
            alt="404"
            className="mb-4 rounded-2xl object-contain"
            loading="lazy"
          />
          <button
            onClick={() => window.location.reload()}
            className={cn(
              'hover:bg-shadow hover:text-primary-light',
              'hover:border-shadow cursor-pointer',
              'rounded-xl border-3 px-4 font-medium',
              'transition-colors duration-400',
              'sm:border-4 sm:px-4 sm:py-1',
            )}
          >
            Try Again
          </button>
        </div>
      ) : character ? (
        <div
          className={cn(
            'my-2 flex flex-col',
            'items-center gap-2 rounded-xl border-4 p-4',
            'shadow-reverse rounded-xl lg:p-3',
          )}
        >
          <h2 className="text-center text-lg font-semibold lg:text-base">{character.name}</h2>
          <img
            src={character.image}
            alt={character.name}
            className="mb-3 h-full w-full rounded-lg object-cover"
            loading="lazy"
          />
          <p className="text-center whitespace-pre-line">{character.description}</p>
        </div>
      ) : (
        <p className="p-4 text-center">Character not found</p>
      )}
    </div>
  );
}
