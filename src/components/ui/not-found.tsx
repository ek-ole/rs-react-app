import React from 'react';

import { LocalStorageService } from '@/services/storage';

type Props = {
  error: string;
  onReset: () => void;
};

export class NotFound extends React.Component<Props> {
  handleReset = () => {
    LocalStorageService.clearSearchTerm();
    this.props.onReset();
  };

  render() {
    return (
      <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center rounded-xl border-4 p-4">
        <p className="text-center whitespace-pre-line">{this.props.error}</p>
        <button
          onClick={this.handleReset}
          className="hover:bg-foreground/80 hover:text-primary-light hover:border-foreground my-4 cursor-pointer rounded-xl border-3 px-4 font-medium transition-colors duration-400 sm:border-4 sm:px-4 sm:py-2"
        >
          Reset search
        </button>
        <img src="/not-found.webp" alt="Not found" className="mb-4 rounded-2xl object-contain" />
      </div>
    );
  }
}
