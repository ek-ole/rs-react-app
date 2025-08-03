import { Eclipse, SunMedium } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { cn } from '@/utils/cn';

import { useTheme } from './ui/theme-context';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="shadow-shadow flex items-center justify-between px-4 shadow-[0px_0px_15px_2px]">
      <NavLink to="/">
        <img
          src="/favicon.svg"
          alt="Logo"
          className={cn(
            'shadow-shadow duration-300',
            'my-2 flex h-12 w-12 flex-col rounded-xl shadow-[0px_0px_5px_2px]',
            'transition-transform duration-400 hover:scale-105',
          )}
        />
      </NavLink>
      <div className="flex items-center gap-2">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `font-bold transition-transform duration-300 hover:scale-110 active:scale-95 ${isActive ? 'underline' : ''}`
          }
        >
          About us
        </NavLink>
        <button
          onClick={toggleTheme}
          aria-label={`Toggle theme (current: ${theme})`}
          className={cn(
            'lex h-10 w-10 cursor-pointer items-center',
            'justify-center p-2 transition-transform',
            'duration-300 hover:scale-110',
          )}
        >
          {theme === 'light' ? <SunMedium /> : <Eclipse />}
        </button>
      </div>
    </header>
  );
}
