import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';
import { Header } from '@/app/_components/layout/header';

import { SelectedPanel } from './_components/selected-panel';
import Provider from './_providers/provider';

export const metadata: Metadata = {
  title: 'Rick & Morty',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light">
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
