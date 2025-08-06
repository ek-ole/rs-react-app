import { Outlet } from 'react-router';

import { Header } from './header';
import { SelectedPanel } from './selected-panel';

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <SelectedPanel />
    </>
  );
}
