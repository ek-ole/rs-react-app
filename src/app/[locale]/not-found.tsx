import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { cn } from '@/app/(server)/_lib/cn';
import { Link } from '@/i18n/navigation';

function Page404() {
  const t = useTranslations('Not found');
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div
        className={cn(
          'mx-auto mt-20 flex w-full max-w-4xl',
          'flex-col items-center rounded-xl border-4 p-4',
          'shadow-glow',
        )}
      >
        <h2 className="p-2 text-center text-xl font-semibold">{t('title')}</h2>
        <Link
          href="/"
          className={cn(
            'hover:bg-shadow hover:text-primary-light',
            'hover:border-shadow my-4 cursor-pointer',
            'rounded-xl border-3 px-4 font-medium',
            'transition-colors duration-400',
            'sm:border-4 sm:px-4 sm:py-2',
          )}
        >
          {t('back')}
        </Link>
        <Image
          src="/404.webp"
          alt="404"
          width={1000}
          height={1000}
          className="mb-4 rounded-2xl object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Page404;
