import type { Metadata } from 'next';
import { Josefin_Sans, Cookie } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

import '../globals.css';

import { LayoutWrapper } from '../(client)/layout-wrapper';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin',
  weight: 'variable',
});

const cookie = Cookie({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cookie',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Rick & Morty',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} className={`${josefin.variable} ${cookie.variable}`}>
      <body className="font-sans">
        <NextIntlClientProvider locale={locale}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
