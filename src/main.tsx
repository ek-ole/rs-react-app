import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { store } from './app/store.ts';
import { ErrorBoundary } from './components/error-boundary.tsx';
import { ThemeProvider } from './components/ui/theme-context.tsx';
import { router } from './routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
