import Lottie from 'lottie-react';
import React from 'react';

import animationData from 'public/animations/morty-dance-loader.json';

export class Loader extends React.Component {
  render() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-40 w-40">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
          <p className="p-2 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
}
