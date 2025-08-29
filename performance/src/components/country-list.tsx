import { useCountries } from '@/hooks/use-countries';
import { cn } from '@/utils/cn';

function CountryList() {
  const countriesData = useCountries();
  const countryNames = Object.keys(countriesData);

  return (
    <div
      className={cn(
        'border-p-4 flex w-full max-w-sm items-center gap-2',
        'rounded-xl border-3 p-2 sm:my-6 flex-col',
        'shadow-inset',
      )}
    >
      <h2 className='text-lg font-semibold'>Countries ({countryNames.length})</h2>
      <div className="flex flex-col gap-1">
        {countryNames.map((countryName) => (
          <div key={countryName}>{countryName}</div>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
