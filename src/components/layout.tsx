import { Outlet } from 'react-router-dom';

import { Header } from './header';
import { SelectedPanel } from './selected-panel';

export function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <SelectedPanel />
    </div>
  );
}
