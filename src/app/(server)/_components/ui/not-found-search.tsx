import Image from 'next/image';

import { ResetSearchButton } from '@/app/(client)/_components/interactive/reset-search-button';
import { cn } from '@/app/_lib/cn';

type Props = {
  error: string;
  onReset?: VoidFunction;
};

export function NotSearchFound({ error, onReset }: Props) {
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
      <ResetSearchButton onClick={onReset} />
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
