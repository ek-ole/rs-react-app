'use client';
import { Eclipse, SunMedium, Languages } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useTheme } from '@/app/(client)/_components/_providers/theme-context';
import { cn } from '@/app/(server)/_lib/cn';
import { Link, usePathname, useRouter } from '@/i18n/navigation';

export function Header() {
  const t = useTranslations('Header');
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const currentLocale = (params.locale as string) || 'en';

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'ru' ? 'en' : 'ru';
    router.push(pathname, { locale: newLocale });
  };

  return (
    <header
      className={cn(
        'shadow-shadow header fixed top-0 z-100 w-[100vw]',
        'flex items-center justify-between px-6',
        'shadow-[0px_0px_15px_2px]',
      )}
    >
      <Link href="/">
        <Image
          src="/favicon.svg"
          alt="Logo"
          width={48}
          height={48}
          priority
          className={cn(
            'shadow-shadow duration-300',
            'my-2 flex flex-col rounded-xl shadow-[0px_0px_5px_2px]',
            'transition-transform duration-400 hover:scale-105',
          )}
        />
      </Link>
      <div className="flex items-center gap-2">
        <Link
          href="/about"
          className={cn(
            'font-bold transition-transform duration-300',
            'hover:scale-110 active:scale-95',
            pathname === '/about' ? 'underline' : '',
          )}
        >
          {t('about')}
        </Link>
        <button
          onClick={toggleTheme}
          aria-label={`Toggle theme (current: ${theme})`}
          className={cn(
            'lex h-10 w-10 cursor-pointer items-center',
            'justify-center p-2 transition-transform',
            'duration-300 hover:scale-110',
          )}
        >
          {theme === 'light' ? <SunMedium /> : <Eclipse />}
        </button>
        <button
          onClick={toggleLanguage}
          aria-label="Toggle language"
          className={cn(
            'flex h-10 w-10 cursor-pointer items-center',
            'justify-center p-2 transition-transform',
            'duration-300 hover:scale-110',
          )}
        >
          <Languages size={20} />
        </button>
      </div>
    </header>
  );
}
