import { cn } from '@/utils/cn';

function LoadingSpinner() {
  return (
    <div
      className={cn(
        'border-p-4 flex w-full max-w-sm items-center gap-2',
        'rounded-xl border-3 p-2 sm:my-6',
        'shadow-inset',
      )}
    >
      Loading...
    </div>
  );
}

export default LoadingSpinner;