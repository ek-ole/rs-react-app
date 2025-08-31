import { List, AutoSizer } from 'react-virtualized';

import type { CountryItem } from '@/types/co2-data';
import { cn } from '@/utils/cn';

type Props = {
  countries: CountryItem[];
  columns: string[];
};

function CountryTable({ countries, columns }: Props) {
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
          'dynamic-grid',
          'gap-4 px-3 py-2 odd:bg-transparent',
        )}
      >
        {columns.map((columnKey) => (
          <div key={columnKey}>{country[columnKey] ?? 'N/A'}</div>
        ))}
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
