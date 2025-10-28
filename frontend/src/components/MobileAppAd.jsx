import React from 'react';
import { assets } from '../assets/assets';

const MobileAppAd = () => {
  return (
    <div className='relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl px-6 sm:px-10 lg:px-20 py-12 mt-20 mx-4 md:mx-10 shadow-lg text-white'>

      {/* Background Accent */}
      <div className='absolute top-0 left-0 w-40 h-40 bg-teal-500 rounded-full blur-2xl opacity-50'></div>
      <div className='absolute bottom-0 right-0 w-40 h-40 bg-teal-700 rounded-full blur-2xl opacity-50'></div>

      <div className='flex flex-col md:flex-row items-center justify-between z-10 relative'>

        {/* Left Side - Text Content */}
        <div className='flex-1 text-center md:text-left mb-8 md:mb-0'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
            Access HealthLife On-The-Go!
          </h2>
          <p className='mt-4 text-lg font-light'>
            Download our mobile app for seamless appointment booking, virtual consultations, and health management, anytime, anywhere.
          </p>
          <div className='mt-6 flex justify-center md:justify-start space-x-4'>
            {/* Placeholder for App Store Button */}
            <a href='#'><button className='bg-white text-teal-700 text-sm sm:text-base font-medium px-6 py-3 rounded-full transition-all shadow-md hover:bg-gray-100'>
              Download on the App Store
            </button></a>
            {/* Placeholder for Google Play Button */}
            <a href='#'><button className='bg-white text-teal-700 text-sm sm:text-base font-medium px-6 py-3 rounded-full transition-all shadow-md hover:bg-gray-100'>
              Get it on Google Play
            </button></a>
          </div>
        </div>

        {/* Right Side - Image (Placeholder) */}
        <div className='md:w-1/2 flex justify-center md:justify-end'>
          {/* You might want to replace this with an actual mobile app screenshot or illustration */}
          <img
            src={assets.about_image} // Using an existing asset as a placeholder
            alt="Mobile App Screenshot"
            className='w-full max-w-xs md:max-w-sm object-contain drop-shadow-xl'
          />
        </div>
      </div>
    </div>
  );
};

export default MobileAppAd;
