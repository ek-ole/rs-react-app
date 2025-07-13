import React from 'react';

export class Loader extends React.Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="font-medium">Loading...</p>
      </div>
    );
  }
}
