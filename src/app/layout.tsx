import type { Metadata } from 'next';
import { Josefin_Sans, Cookie } from 'next/font/google';
import type { ReactNode } from 'react';

import './globals.css';
import { Header } from '@/app/_components/layout/header';

import { SelectedPanel } from './_components/selected-panel';
import Provider from './_providers/provider';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
  display: 'swap',
});

const cookie = Cookie({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cookie',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rick & Morty',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${josefin.variable} ${cookie.variable}`}>
      <body>
        <Provider>
          <Header />
          <main>{children}</main>
          <SelectedPanel />
        </Provider>
      </body>
    </html>
  );
}
