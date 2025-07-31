import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import { RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from './components/error-boundary.tsx';
import { ThemeProvider } from './components/ui/theme-context.tsx';
import { router } from './routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
);
