'use client';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { useCharacterDetails } from '@/app/(client)/_hooks/use-character-details';
import { Loader } from '@/app/(server)/_components/ui/loader';
import { cn } from '@/app/_lib/cn';

export default function CharacterDetails() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { character, isLoading, error } = useCharacterDetails(id);

  if (!id) return null;

  const handleClose = () => {
    router.push(`/?${searchParams.toString()}`);
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
          <Image
            src="/404.webp"
            alt="404"
            width={1000}
            height={1000}
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
          <Image
            src={character.image}
            alt={character.name}
            width={240}
            height={240}
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
