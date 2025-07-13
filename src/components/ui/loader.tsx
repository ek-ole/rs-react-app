import React from 'react';

export class Loader extends React.Component {
  render() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="flex animate-[fadeIn_0.3s_ease-in-out_forwards] flex-col items-center">
          <img src="/morty-dance-loader.gif" alt="Loading..." className="object-contain" />
          <p className="p-2 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
}
