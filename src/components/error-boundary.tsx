import React from 'react';

import type { ErrorBoundaryState } from '@/types/components';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-6 flex w-full flex-col items-center justify-center px-8 py-4">
          <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center rounded-xl border-4 p-4">
            <h2 className="mb-4 p-8 text-center text-xl font-semibold">
              Oh my gosh! Everything is broken!
            </h2>
            <img
              src="/error-boundary.webp"
              alt="Error Illustration"
              className="mb-4 rounded-2xl object-contain"
              loading="lazy"
            />
            <button
              onClick={() => this.setState({ hasError: false })}
              className="hover:bg-foreground/80 hover:text-primary-light hover:border-foreground m-8 cursor-pointer rounded-xl border-3 px-2 font-medium transition-colors duration-400 sm:border-4 sm:px-4 sm:py-2"
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
