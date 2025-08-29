import { useCountries } from '@/hooks/use-countries';
import { cn } from '@/utils/cn';

function CountryList() {
  const countriesData = useCountries();
  const countryNames = Object.keys(countriesData);

  return (
    <div
      className={cn(
        'flex w-full items-center',
        'flex-col rounded-xl border-4 sm:my-6',
        'shadow-inset',
        'max-h-[50vh] min-h-[200px]',
        'custom-scrollbar overflow-y-auto',
      )}
    >
      <h2 className="bg-input w-full px-3 py-2 text-lg font-semibold">
        Countries ({countryNames.length})
      </h2>
      <div className="custom-scrollbar flex w-full flex-col overflow-y-auto">
        {countryNames.map((countryName) => (
          <div key={countryName} className="even:bg-input/20 px-3 py-2 odd:bg-transparent">
            {countryName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
