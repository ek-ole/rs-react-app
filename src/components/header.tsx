import { NavLink } from 'react-router-dom';

import { cn } from '@/utils/cn';

export function Header() {
  return (
    <header className="shadow-foreground/20 flex items-center justify-between px-4 shadow-lg">
      <NavLink to="/">
        <img
          src="/favicon.svg"
          alt="Logo"
          className={cn(
            'shadow-foreground/50 duration-300',
            'my-2 flex h-12 w-12 flex-col rounded-xl shadow-lg',
            'transition-shadow hover:shadow-md',
          )}
        />
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `font-bold transition-transform duration-300 hover:scale-110 active:scale-95 ${isActive ? 'underline' : ''}`
        }
      >
        About us
      </NavLink>
    </header>
  );
}
