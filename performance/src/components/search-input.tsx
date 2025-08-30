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
      'flex items-center gap-2 w-40 lg:w-xs lg:mx-6',
      'border-primary-dark border my-1 rounded-md p-2',
      'shadow-inset bg-input',
    )}
  >
    <input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'rounded-xl px-1 w-full ', 
        'focus:outline-none focus:bg-primary-dark sm:px-4')}
    />
  </div>
);
}

export default SearchInput;