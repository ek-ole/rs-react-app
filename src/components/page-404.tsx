import { Link } from 'react-router-dom';

import { cn } from '@/utils/cn';

function Page404() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div
        className={cn(
          'mx-auto mt-6 flex w-full max-w-4xl',
          'flex-col items-center rounded-xl border-4 p-4',
        )}
      >
        <h2 className="p-2 text-center text-xl font-semibold">Oops! Page not found...</h2>
        <Link
          to="/"
          className={cn(
            'hover:bg-foreground/80 hover:text-primary-light',
            'hover:border-foreground my-4 cursor-pointer',
            'rounded-xl border-3 px-4 font-medium',
            'transition-colors duration-400',
            'sm:border-4 sm:px-4 sm:py-2',
          )}
        >
          Back to Home
        </Link>
        <img src="/404.webp" alt="404" className="mb-4 rounded-2xl object-contain" loading="lazy" />
      </div>
    </div>
  );
}

export default Page404;
