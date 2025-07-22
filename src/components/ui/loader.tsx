import { Component } from 'react';

export class Loader extends Component {
  render() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="flex h-[25vh] animate-[fadeIn_0.3s_ease-in-out_forwards] flex-col items-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-contain"
            data-testid="loader-video"
          >
            <source src="/morty-dance-loader.webm" type="video/webm" data-testid="source-video" />
          </video>
          <p className="p-2 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
}
