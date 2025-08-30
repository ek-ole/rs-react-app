import { cn } from "@/utils/cn";

type Props = {
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  availableYears: number[];
}

function YearSelector({ selectedYear, onYearChange, availableYears }: Props) {
   return (
     <div className={cn('flex items-center')}>
       <label htmlFor="year-select  " className="text-center">
         Year
       </label>
       <select
         value={selectedYear || ''}
         onChange={(e) => onYearChange(e.target.value ? parseInt(e.target.value) : null)}
         className={cn(
           'w-full rounded-xl py-1 text-center text-sm',
           'focus:bg-input cursor-pointer focus:outline-none',
         )}
         aria-label="Select year"
       >
         <option value="">Latest</option>
         {availableYears.map((year) => (
           <option key={year} value={year}>
             {year}
           </option>
         ))}
       </select>
     </div>
   );
}

export default YearSelector;