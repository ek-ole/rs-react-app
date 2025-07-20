import React from 'react';

import { LocalStorageService } from '@/services/storage';
import { cn } from '@/utils/cn';

import { SearchInput } from './ui/search-input';

type Props = {
  onSearch: (term: string) => void;
};

class Search extends React.Component<Props> {
  state = {
    inputValue: LocalStorageService.getSearchTerm(),
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = this.state.inputValue.trim();
    LocalStorageService.setSearchTerm(trimmedValue);
    this.props.onSearch(trimmedValue);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex w-full flex-col items-center sm:px-4">
        <div
          className={cn(
            'border-p-4 flex w-full max-w-sm items-center gap-2',
            'rounded-xl border-4 p-2 sm:my-6',
          )}
        >
          <SearchInput
            value={this.state.inputValue}
            onChange={(value) => this.setState({ inputValue: value })}
            placeholder="Search character..."
          />
          <button
            type="submit"
            className={cn(
              'hover:bg-foreground/80 hover:text-primary-light',
              'hover:border-foreground cursor-pointer',
              'rounded-xl border-3 px-2 font-medium',
              'transition-colors duration-400 sm:border-4 sm:px-4 sm:py-2',
            )}
          >
            Search
          </button>
        </div>
      </form>
    );
  }
}

export default Search;
