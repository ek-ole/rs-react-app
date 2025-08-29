import { useCountries } from '@/hooks/use-countries';
import { cn } from '@/utils/cn';

function CountryList() {
  const countriesData = useCountries();
  const countries = Object.entries(countriesData).map(([name, data]) => {
    const latestYearData = data.data[data.data.length - 1];
    const latestYear = latestYearData?.year;

    return {
      name,
      isoCode: data.iso_code,
      population: latestYearData?.population,
      year: latestYear,
    };
  });

  return (
    <div
      className={cn(
        'flex w-full items-center',
        'flex-col rounded-xl border-3 sm:my-4',
        'shadow-inset',
        'max-h-[50vh] min-h-[200px]',
        'custom-scrollbar overflow-y-auto',
      )}
    >
      <h2 className="bg-input w-full px-3 pt-2 text-center text-lg font-semibold">
        Countries ({countries.length})
      </h2>
      <div className="bg-input border-shadow/20 grid w-full grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b px-3 py-1 font-semibold">
        <div>Country</div>
        <div>ISO code</div>
        <div>Year</div>
        <div>Population</div>
      </div>
      <div className="custom-scrollbar flex w-full flex-col overflow-y-auto">
        {countries.map((country) => (
          <div
            key={country.name}
            className="even:bg-input/20 grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-3 py-2 odd:bg-transparent"
          >
            <div className="font-medium">{country.name}</div>
            <div>{country.isoCode || 'N/A'}</div>
            <div>{country.year || 'N/A'}</div>
            <div>{country.population ? country.population.toLocaleString() : 'N/A'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
