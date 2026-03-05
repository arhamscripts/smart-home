"use client";

import Lottie from 'lottie-react';
import React from 'react';
import animationData from '../../../public/images/Animated Dashboards.json';

const HeroLottie = () => {
  return (
    <div className="w-full h-auto rounded-2xl">
      <Lottie 
        animationData={animationData} 
        loop={true}
        className="w-full h-full"
      />
    </div>
  );
};

export default HeroLottie;