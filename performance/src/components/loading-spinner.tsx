import { cn } from '@/utils/cn';

function LoadingSpinner() {
  return (
    <div
      className={cn(
        'border-p-4 flex w-[80wh] items-center gap-2',
        'rounded-xl sm:my-6 flex flex-col',
      )}
    >
      <img src="/loader.png" alt="Loading..." className="blur-edges w-full" />
      <p className='text-xl'>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;