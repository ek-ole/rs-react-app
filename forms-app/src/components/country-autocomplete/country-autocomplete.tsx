import { useMemo, useState } from "react";

import { useCountries } from "@/hooks/use-countries";
import { cn } from "@/utils/cn";

type CountryAutocompleteProps = {
  value: string;
  onChange: (value:string) => void;
  error?: string;
}

const CountryAutocomplete = ({ value, onChange, error}: CountryAutocompleteProps) => {
    const { countries, loading } = useCountries(); 
    const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = useMemo(() => {
    if (!value) return countries;
    return countries
      .filter(country => 
        country.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 10);
  }, [countries, value]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsOpen(false);
        }}
        placeholder="Start typing country..."
        aria-haspopup="listbox"
        className={cn(
          'bg-input w-full rounded-xl px-2 py-1',
          'focus:ring-2 focus:outline-none',
          error && 'border-error-message border-2',
        )}
      />

      {isOpen && !loading && (
        <div
          role="listbox"
          aria-label="Countries"
          className={cn(
            'bg-custom-linear absolute z-10',
            'mt-1 max-h-36 w-full overflow-y-auto',
            'rounded-lg border shadow-lg',
            'custom-scrollbar',
          )}
        >
          {filteredCountries.map((country) => (
            <button
              type="button"
              key={country}
              role="option"
              aria-selected={value === country ? 'true' : 'false'}
              className="w-full px-4 py-2 text-left focus:ring-2 focus:outline-none"
              onClick={() => {
                onChange(country);
                setIsOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(country);
                  setIsOpen(false);
                }
              }}
            >
              {country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryAutocomplete;
