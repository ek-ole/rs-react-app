import { Check } from 'lucide-react';

import { cn } from '@/utils/cn';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <button
      type="button"
      // role="checkbox"
      // aria-checked={checked ? 'true' : 'false'}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      className={cn(
        'flex h-10 w-10 transform hover:scale-105',
        'items-center justify-center rounded-full',
        'bg-primary-light/20 backdrop-blur-sm',
        'cursor-pointer transition-all duration-300',
        'focus:ring-primary-light outline-none focus:ring-2',
      )}
    >
      {checked && <Check className="text-foreground h-4 w-4 stroke-[3px]" />}
    </button>
  );
}
