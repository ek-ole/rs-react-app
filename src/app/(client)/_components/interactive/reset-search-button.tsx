'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { cn } from '@/app/(server)/_lib/cn';
import { SEARCH_TERM_KEY } from '@/app/(server)/_lib/constants';

import useLocalStorage from '../../_hooks/use-local-storage';

type Props = {
  onClick?: VoidFunction;
};

export function ResetSearchButton({ onClick }: Props) {
  const t = useTranslations('Search');
  const router = useRouter();
  const [, setSearchTerm] = useLocalStorage(SEARCH_TERM_KEY, '');

  const handleReset = () => {
    setSearchTerm('');
    onClick?.();
    router.push('/');
  };

  return (
    <button
      onClick={handleReset}
      className={cn(
        'hover:bg-shadow hover:text-primary-light',
        'hover:border-shadow my-4 cursor-pointer',
        'rounded-xl border-3 px-4 font-medium transition-colors',
        'duration-400 sm:border-4 sm:px-4 sm:py-2',
      )}
    >
      {t('reset')}
    </button>
  );
}
