import React from 'react';

const RebuildGazaAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path
          fill="#34D399"
          d="M0,0 L1200,0 L1200,200 L0,200 Z"
          className="animate-wave"
        />
      </svg>
      <div className="absolute bottom-0 left-1/4 w-16 h-32 bg-gray-700 transform -skew-x-12 animate-build"></div>
      <div className="absolute bottom-0 left-1/2 w-16 h-40 bg-gray-800 transform skew-x-12 animate-build animation-delay-300"></div>
      <div className="absolute bottom-0 right-1/4 w-16 h-36 bg-gray-900 transform -skew-x-12 animate-build animation-delay-600"></div>
      <div className="absolute bottom-8 left-1/3 w-8 h-8 bg-yellow-400 rounded-full animate-sun"></div>
      <div className="absolute top-4 left-1/4 w-12 h-8 bg-white rounded-full animate-cloud"></div>
      <div className="absolute top-12 right-1/3 w-16 h-10 bg-white rounded-full animate-cloud animation-delay-1000"></div>
    </div>
  );
};

export default RebuildGazaAnimation;