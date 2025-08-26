import { cn } from '@/utils/cn';

function HomePage() {
  return (
    <>
      <div className="flex min-h-[60vh] items-center justify-center p-4 md:p-14">
        <div
          className={cn(
            'mx-auto flex w-full max-w-4xl flex-col',
            'items-center rounded-xl border-4 p-4',
            'shadow-glow',
          )}
        >
          <h1 className="text-3xl font-bold">Perfomance</h1>
          <div
            className={cn(
              'border-p-4 flex w-full max-w-sm items-center gap-2',
              'rounded-xl border-3 p-2 sm:my-6',
              'shadow-inset',
            )}
          >
            <input
              type="search"
              placeholder="Search character..."
              className={cn(
                'bg-input w-full flex-1',
                'rounded-xl px-2 py-1',
                'focus:outline-none sm:px-4',
              )}
            />
          </div>
          <div className="mb-8 space-y-4 text-center">
            <p>
              This is a React application for exploring techniques and best practices to optimize
              the performance of React applications.
            </p>
          </div>
        </div>
      </div>
      <p className="absolute bottom-2 flex w-full flex-wrap items-center justify-center">
        Created by Ekaterina Dmitrenko as part RS School React Course
        <img
          src="/rss-logo.svg"
          alt="RS School"
          className="ml-2 h-5 w-5 transition-transform duration-300 hover:scale-110"
        />
      </p>
    </>
  );
}

export default HomePage;
