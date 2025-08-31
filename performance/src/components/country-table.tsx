import { List, AutoSizer } from 'react-virtualized';

import type { CountryItem } from '@/types/co2-data';
import { cn } from '@/utils/cn';

type Props = {
  countries: CountryItem[];
};

function CountryTable({ countries }: Props) {
  const rowRenderer = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: React.CSSProperties;
  }) => {
    const country = countries[index];
    return (
      <div
        key={key}
        style={style}
        className={cn(
          'even:bg-input/20 w-full',
          'grid grid-cols-[3fr_2fr_2fr_2fr_2fr_2fr]',
          'gap-4 px-3 py-2 odd:bg-transparent',
        )}
      >
        <div>{country.name}</div>
        <div>{country.isoCode || 'N/A'}</div>
        <div>{country.year || 'N/A'}</div>
        <div>{country.population || 'N/A'}</div>
        <div>{country.co2 || 'N/A'}</div>
        <div>{country.co2_per_capita || 'N/A'}</div>
      </div>
    );
  };

  return (
    <div className="flex-col flex h-[60vh] w-full">
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowCount={countries.length}
            rowHeight={40}
            rowRenderer={rowRenderer}
            className="custom-scrollbar"
          />
        )}
      </AutoSizer>
    </div>
  );
}

export default CountryTable;
