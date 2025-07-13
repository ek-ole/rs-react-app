import Lottie from 'lottie-react';
import React from 'react';

import animationData from '@/assets/animations/morty-dance-loader.json';

export class Loader extends React.Component {
  render() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="flex animate-[fadeIn_0.3s_ease-in-out_forwards] flex-col items-center">
          <div className="h-50 w-50">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
          <p className="p-2 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
}
