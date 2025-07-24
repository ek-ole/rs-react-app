import { cn } from '@/utils/cn';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Search character...'}
      className={cn(
        'bg-primary-light w-full flex-1',
        'rounded-xl px-2 py-1',
        'focus:outline-none sm:px-4',
      )}
    />
  );
}
