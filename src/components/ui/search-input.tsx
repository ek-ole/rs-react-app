import { Component } from 'react';

import { cn } from '@/utils/cn';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export class SearchInput extends Component<SearchInputProps> {
  render() {
    return (
      <input
        type="search"
        value={this.props.value}
        onChange={(e) => this.props.onChange(e.target.value)}
        placeholder={this.props.placeholder || 'Search character...'}
        className={cn(
          'bg-primary-light w-full flex-1',
          'rounded-xl px-2 py-1',
          'focus:outline-none sm:px-4',
        )}
      />
    );
  }
}
