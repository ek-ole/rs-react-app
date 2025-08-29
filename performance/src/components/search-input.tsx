import { cn } from "@/utils/cn";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function SearchInput({value, onChange, placeholder}: Props) {
return (
  <div
    className={cn(
      'border-p-4 flex w-full max-w-sm items-center gap-2',
      'rounded-xl border-3 p-2 sm:my-6',
      'shadow-inset',
    )}
  >
    <input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn('bg-input w-full flex-1', 'rounded-xl px-2 py-1', 'focus:outline-none sm:px-4')}
    />
  </div>
);
}

export default SearchInput;