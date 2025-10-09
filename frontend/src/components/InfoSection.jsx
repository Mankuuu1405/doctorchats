import React from 'react';

const InfoSection = () => {
  return (
    <div className='bg-teal-100 py-16 px-4 md:px-10 lg:px-20 mt-20'>
      <h2 className='text-4xl font-bold text-center text-teal-800 mb-12'>Our Commitment to Your Health</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center'>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h3 className='text-3xl font-bold text-teal-600 mb-4'>10+</h3>
          <p className='text-lg text-teal-700'>Years of Experience</p>
        </div>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h3 className='text-3xl font-bold text-teal-600 mb-4'>5000+</h3>
          <p className='text-lg text-teal-700'>Happy Patients</p>
        </div>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h3 className='text-3xl font-bold text-teal-600 mb-4'>100+</h3>
          <p className='text-lg text-teal-700'>Expert Doctors</p>
        </div>
      </div>
      <p className='text-center text-lg text-teal-700 mt-12'>
        We are dedicated to providing the highest quality healthcare services, ensuring your well-being is our top priority.
      </p>
    </div>
  );
};

export default InfoSection;
