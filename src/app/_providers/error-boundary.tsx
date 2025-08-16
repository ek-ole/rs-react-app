'use client';
import Image from 'next/image';
import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

import { cn } from '@/app/(server)/_lib/cn';

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className={cn(
            'mx-auto my-6 flex w-full flex-col',
            'items-center justify-center px-8 py-4',
          )}
        >
          <div
            className={cn(
              'mx-auto mt-20 flex w-full max-w-4xl flex-col',
              'items-center rounded-xl border-4 p-4',
              'shadow-glow',
            )}
          >
            <h2 className="mb-4 p-8 text-center text-xl font-semibold">
              Oh my gosh! Everything is broken!
            </h2>
            <Image
              src="/error-boundary.webp"
              alt="Error Illustration"
              width={1000}
              height={1000}
              className="mb-4 rounded-2xl object-contain"
              loading="lazy"
            />
            <button
              onClick={() => this.setState({ hasError: false })}
              className={cn(
                'hover:bg-shadow hover:text-primary-light',
                'hover:border-shadow m-8 cursor-pointer',
                'rounded-xl border-3 px-2 font-medium',
                'transition-colors duration-400 sm:border-4 sm:px-4 sm:py-2',
              )}
            >
              Fix it back!
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
