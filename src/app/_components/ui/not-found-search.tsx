'use client';
import Image from 'next/image';

import { cn } from '@/app/_lib/cn';
import { SEARCH_TERM_KEY } from '@/app/_lib/constants';
import useLocalStorage from '@/app/_lib/hooks/use-local-storage';

type Props = {
  error: string;
  onReset: VoidFunction;
};

export function NotFound({ error, onReset }: Props) {
  const [, setSearchTerm] = useLocalStorage(SEARCH_TERM_KEY, '');
  const handleReset = () => {
    setSearchTerm('');
    onReset();
  };

  return (
    <div
      className={cn(
        'mx-auto mt-6 flex w-full',
        'max-w-4xl flex-col items-center',
        'rounded-xl border-4 p-4',
        'shadow-glow',
      )}
    >
      <p className="text-center whitespace-pre-line">{error}</p>
      <button
        onClick={handleReset}
        className="hover:bg-shadow hover:text-primary-light hover:border-shadow my-4 cursor-pointer rounded-xl border-3 px-4 font-medium transition-colors duration-400 sm:border-4 sm:px-4 sm:py-2"
      >
        Reset search
      </button>
      <Image
        src="/not-found.webp"
        alt="Not found"
        width={1000}
        height={1000}
        className="mb-4 rounded-2xl object-contain"
        loading="lazy"
      />
    </div>
  );
}
