"use client"
import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import lightImage from '../../../public/images/smart-switches.png'
import HeroLottie from './HeroLottie';

const ProductShowcase = () => {
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
          
          {/* LEFT SIDE - Device Mockup with Layered Elements */}
          <div className="relative order-2 flex justify-center md:order-1">
            {/* Main Device Frame Container */}
            <div className="w-full max-w-md sm:max-w-xl">
              <HeroLottie/>
            </div>
            
            {/* Overlapping Circular Device - Bottom Left */}
            <div className="absolute -bottom-8 left-4 z-10 md:-bottom-12 md:left-8">
              <div className="relative h-48 w-48 md:h-56 md:w-56">
                {/* Outer glow effect */}
                {/* <div className="absolute inset-0 rounded-full bg-amber-200/30 blur-2xl" /> */}
                
                {/* Device container */}
                {/* <Image
                  src={lightImage}
                  alt="Device Mockup"
                  fill
                  className="object-contain"
                /> */}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Content Section */}
          <div className="relative order-1 flex flex-col justify-center space-y-6 text-center md:order-2 md:text-left">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                Approximations
              </h2>
              <p className="mx-auto max-w-lg text-base leading-relaxed text-gray-600 md:mx-0 md:text-lg">
                Homey knows in realtime when a device is turned on and off. When it also knows the device's standby- and on-usage, Homey can approximate the energy usage through interpolation.
              </p>
            </div>

            {/* Vertical Device Indicator - Top Right Corner */}
          <div className="absolute top-0 right-0 z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
