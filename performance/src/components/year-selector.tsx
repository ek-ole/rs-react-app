import { cn } from "@/utils/cn";

type Props = {
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  availableYears: number[];
}

function YearSelector({ selectedYear, onYearChange, availableYears }: Props) {
   return (
     <div
       className={cn(
         'flex items-center gap-2',
         'bg-input/50 rounded-lg',
         'items-baseline',
         'border-primary-dark my-1 rounded-md border p-2',
         'shadow-inset bg-input',
       )}
     >
       <label htmlFor="year-select" className="text-sm font-semibold">
         Year:
       </label>
       <select
         id="year-select"
         value={selectedYear || ''}
         onChange={(e) => onYearChange(e.target.value ? parseInt(e.target.value) : null)}
         className={cn(
           'w-full rounded-xl p-1 text-sm',
           'focus:bg-input focus:outline-none sm:px-4',
         )}
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