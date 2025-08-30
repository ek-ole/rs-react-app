import { List } from 'react-virtualized';

import type { CountryItem } from '@/types/co2-data';
import { cn } from '@/utils/cn';

type Props = {
  countries: CountryItem[];
}

export function CountryTable({ countries }: Props) {
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
          'grid grid-cols-[2fr_1fr_1fr_1fr]',
          'gap-4 px-3 py-2 odd:bg-transparent',
        )}
      >
        <div>{country.name}</div>
        <div>{country.isoCode || 'N/A'}</div>
        <div>{country.year || 'N/A'}</div>
        <div>{country.population ? country.population.toLocaleString() : 'N/A'}</div>
      </div>
    );
  };

  return (
    <div className="custom-scrollbar flex w-full flex-col overflow-y-auto">
      <List
        width={800}
        height={400}
        rowCount={countries.length}
        rowHeight={40}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}
