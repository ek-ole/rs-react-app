'use client';
import type { ReactNode } from 'react';

import Provider from './_components/_providers/provider';
import { Header } from './_components/layout/header';
import { SelectedPanelProvider } from './_components/selected-panel-provider';

export function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <Header />
      <main>{children}</main>
      <SelectedPanelProvider />
    </Provider>
  );
}
