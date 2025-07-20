import React from 'react';

import type { SearchInputProps } from '@/types/components';
import { cn } from '@/utils/cn';

export class SearchInput extends React.Component<SearchInputProps> {
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
