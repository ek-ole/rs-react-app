// import { cn } from "@/utils/cn";

// function rowRenderer ({
//   index,
//   key,
//   style,
// }: {
//   index: number;
//   key: string;
//   style: React.CSSProperties;
// }) {
//   const country = sortedCountries[index];
//   return (
//     <div
//       key={key}
//       style={style}
//       className={cn(
//         'even:bg-input/20 w-full',
//         'grid grid-cols-[2fr_1fr_1fr_1fr]',
//         'gap-4 px-3 py-2 odd:bg-transparent',
//       )}
//     >
//       <div>{country.name}</div>
//       <div>{country.isoCode || 'N/A'}</div>
//       <div>{country.year || 'N/A'}</div>
//       <div>{country.population ? country.population.toLocaleString() : 'N/A'}</div>
//     </div>
//   );
// };

// export default rowRenderer;