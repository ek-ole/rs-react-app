'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCharacterDetails } from '@/app/(client)/_hooks/use-character-details';
import { Loader } from '@/app/(server)/_components/ui/loader';
import { cn } from '@/app/(server)/_lib/cn';

export default function CharacterDetails({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { character, isLoading, error } = useCharacterDetails(id);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!character) return <div>Character not found</div>;
  if (!id) return null;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('detailsId');
    router.push(`/?${params.toString()}`);
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
    </div>
  );
}
