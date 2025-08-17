'use client';
import type { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { ErrorBoundary } from '@/app/(client)/_components/_providers/error-boundary';
import { ThemeProvider } from '@/app/_providers/theme-context';

import { store } from '../(client)/_store/store';

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ThemeProvider>
    </ReduxProvider>
  );
}
