import { createBrowserRouter } from 'react-router-dom';

import About from '@/components/about';
import Page404 from '@/components/page-404';

import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);
