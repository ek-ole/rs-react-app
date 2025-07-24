import { createBrowserRouter } from 'react-router-dom';

import About from '@/components/about';
import Page404 from '@/components/page-404';

import App from './App';
import { Layout } from './components/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: '/about',
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <Page404 />
      </Layout>
    ),
  },
]);
