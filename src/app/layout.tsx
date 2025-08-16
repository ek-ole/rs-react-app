import type { Metadata } from 'next';
import { Josefin_Sans, Cookie } from 'next/font/google';
import type { ReactNode } from 'react';

import './globals.css';
import { Header } from '@/app/_components/layout/header';

import { SelectedPanel } from './_components/selected-panel';
import Provider from './_providers/provider';

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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${josefin.variable} ${cookie.variable}`}>
      <body className="font-sans">
        <Provider>
          <Header />
          <main>{children}</main>
          <SelectedPanel />
        </Provider>
      </body>
    </html>
  );
}
