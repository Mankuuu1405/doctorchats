import React from 'react';

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      quote: "This platform has revolutionized how I connect with doctors. The ease of booking and the quality of consultations are exceptional!",
      author: "Sarah M.",
      title: "Happy Patient"
    },
    {
      id: 2,
      quote: "As a doctor, managing appointments and patient records has never been easier. Highly recommend this system!",
      author: "Dr. Alex P.",
      title: "Practicing Physician"
    },
    {
      id: 3,
      quote: "The best online consultation experience I've had. Professional, efficient, and truly caring doctors.",
      author: "John D.",
      title: "Satisfied User"
    }
  ];

  return (
    <div className='bg-white py-16 px-4 md:px-10 lg:px-20 mt-20'>
      <h2 className='text-4xl font-bold text-center text-teal-800 mb-12'>What Our Users Say</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className='bg-teal-50 p-8 rounded-lg shadow-md flex flex-col justify-between'>
            <p className='text-lg text-teal-700 italic mb-6'>"{testimonial.quote}"</p>
            <div>
              <p className='font-semibold text-teal-800'>{testimonial.author}</p>
              <p className='text-sm text-teal-600'>{testimonial.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
