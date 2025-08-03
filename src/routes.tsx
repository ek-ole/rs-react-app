import { createBrowserRouter } from 'react-router-dom';

import About from '@/components/about';
import Page404 from '@/components/page-404';

import App from './App';
import { CharacterDetails } from './components/cards/character-details';
import { Layout } from './components/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/characters/:id',
            element: <CharacterDetails />,
          },
        ],
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);
