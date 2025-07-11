import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <div className="flex w-full flex-col items-center sm:px-4">
        <div className="border-p-4 flex w-full max-w-sm items-center gap-2 rounded-xl border-4 p-2 sm:my-6">
          <input
            type="text"
            placeholder="Search character..."
            className="bg-primary-light w-full flex-1 rounded-xl px-2 py-1 focus:outline-none sm:px-4"
          />
          <button
            type="submit"
            className="hover:bg-foreground/80 hover:text-primary-light hover:border-foreground cursor-pointer rounded-xl border-3 px-2 font-medium transition-colors duration-400 sm:border-4 sm:px-4 sm:py-2"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
