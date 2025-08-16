import Image from 'next/image';
import type { ReactNode } from 'react';

import { cn } from '@/app/_lib/cn';

type Props = {
  error: string;
  resetComponent: ReactNode;
};

export function NotFound({ error, resetComponent }: Props) {
  return (
    <div
      className={cn(
        'mx-auto mt-20 flex w-full',
        'max-w-4xl flex-col items-center',
        'rounded-xl border-4 p-4',
        'shadow-glow',
      )}
    >
      <p className="text-center whitespace-pre-line">{error}</p>
      {resetComponent}
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
