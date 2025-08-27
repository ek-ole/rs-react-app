import { Suspense } from 'react';

import CountryList from './components/country-list';
import LoadingSpinner from './components/loading-spinner';
import { cn } from './utils/cn';

function App() {
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
          <h1 className="text-3xl font-bold">Global CO₂ Emissions Data</h1>

          <div className="mt-4 w-full max-w-sm">
            <div className="text-center text-xl">Controls</div>
            <div
              className={cn(
                'border-p-4 flex w-full max-w-sm items-center gap-2',
                'rounded-xl border-3 p-2 sm:my-6',
                'shadow-inset',
              )}
            >
              <input
                type="search"
                placeholder="Search country..."
                className={cn(
                  'bg-input w-full flex-1',
                  'rounded-xl px-2 py-1',
                  'focus:outline-none sm:px-4',
                )}
              />
            </div>           
          </div>
          <button className="custom-button ">Button</button>

          <div className="my-8 space-y-4 text-center">
            <p>
              This CO2 emissions data analysis app was created while learning about methods and best
              practices for optimizing the performance of React apps.
            </p>
          </div>

          <Suspense fallback={<LoadingSpinner />}>
            <CountryList />
          </Suspense>
        </div>
      </div>
      <p className="absolute bottom-2 flex w-full flex-wrap items-center justify-center">
        Created by{' '}
        <a
          href="https://github.com/ek-ole"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-1 font-semibold transition-transform duration-300 hover:scale-103"
        >
          Ekaterina Dmitrenko
        </a>{' '}
        as part of{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-1 font-semibold transition-transform duration-300 hover:scale-103"
        >
          RS School React Course
        </a>
        <a
          href="https://rs.school/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 transition-transform duration-300 hover:scale-110"
        >
          <img src="/rss-logo.svg" alt="RS School" className="h-5 w-5" />
        </a>
      </p>
    </>
  );
}

export default App;
