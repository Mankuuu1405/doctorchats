import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { assets } from '../assets/assets'; // Your assets are already imported

// --- Placeholder data for the animated cards ---
const doctorsCol1 = [
  { name: 'Dr. Evelyn Reed', title: 'Cardiologist', imgSrc: 'https://i.pravatar.cc/300?img=1', color: 'from-teal-400 to-blue-500' },
  { name: 'Dr. Samuel Grant', title: 'Neurologist', imgSrc: 'https://i.pravatar.cc/300?img=12', color: 'from-sky-400 to-indigo-500' },
  { name: 'Dr. Aditi Paul, PhD', title: 'Psychologist', imgSrc: 'https://i.pravatar.cc/300?img=31', color: 'from-pink-400 to-red-400' },
  { name: 'Dr. Angela Chen', title: 'Dermatologist', imgSrc: 'https://i.pravatar.cc/300?img=35', color: 'from-yellow-400 to-orange-500' },
];

const doctorsCol2 = [
  { name: 'Dr. Melissa Chapman', title: 'Pediatrician', imgSrc: 'https://i.pravatar.cc/300?img=40', color: 'from-purple-400 to-indigo-600' },
  { name: 'Dr. Ganesh Krishnan', title: 'General Physician', imgSrc: 'https://i.pravatar.cc/300?img=51', color: 'from-green-400 to-teal-500' },
  { name: 'Dr. Josh Burns', title: 'Orthopedic Surgeon', imgSrc: 'https://i.pravatar.cc/300?img=68', color: 'from-rose-400 to-red-500' },
  { name: 'Dr. Radhika Agrawal', title: 'Dentist', imgSrc: 'https://i.pravatar.cc/300?img=25', color: 'from-blue-400 to-cyan-400' },
];

// --- Doctor Card Sub-Component ---
const DoctorCard = ({ name, title, imgSrc, color }) => (
  <div className="bg-white rounded-2xl p-3 shadow-lg flex flex-col items-center text-center">
    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3">
      <img src={imgSrc} alt={name} className="w-full h-full object-cover" loading="lazy" />
      <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-30 mix-blend-multiply`}></div>
    </div>
    <h3 className="font-semibold text-teal-900 text-lg">{name}</h3>
    <p className="font-sans text-gray-600 text-sm">{title}</p>
  </div>
);


const Header = () => {
    const comp = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Animate the text content on the left
            gsap.fromTo(".header-content", {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            });

            // Animate the card grid on the right
            gsap.fromTo(".card-grid", {
                opacity: 0,
                scale: 0.9
            }, {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.4
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className='relative bg-white px-6 md:px-16 lg:px-24 py-10 md:py-20 overflow-hidden'>
            <div className='md:hidden absolute inset-0'>
                <div className="w-full h-full flex gap-4 -rotate-2">
                    <div className="w-1/2 space-y-4 group">
                        <div className="animate-[scroll-up_30s_linear_infinite] group-hover:[animation-play-state:paused] space-y-4">
                            {[...doctorsCol1, ...doctorsCol1].map((doc, i) => <DoctorCard key={`col1-${i}`} {...doc} />)}
                        </div>
                    </div>
                    <div className="w-1/2 space-y-4 pt-16 group">
                        <div className="animate-[scroll-down_30s_linear_infinite] group-hover:[animation-play-state:paused] space-y-4">
                            {[...doctorsCol2, ...doctorsCol2].map((doc, i) => <DoctorCard key={`col2-${i}`} {...doc} />)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row items-center'>
                {/* Left Side - Text Content */}
                <div className='relative z-10 md:w-1/2 flex flex-col gap-6 text-center md:text-left items-center md:items-start bg-white bg-opacity-80 md:bg-opacity-100 p-8 rounded-lg'>
                    <h1 className='header-content text-4xl md:text-5xl font-extrabold text-teal-700 leading-tight'>
                        Healthcare for <br /> Family’s Health
                    </h1>
                    <p className='header-content text-gray-500 text-base leading-relaxed max-w-lg'>
                       We provide comprehensive healthcare services tailored for your family's well-being. Our trusted professionals ensure compassionate care, focused on comfort, convenience, and results.
                    </p>
                    <a
                        href='#speciality'
                        className='header-content bg-teal-600 hover:bg-teal-700 transition-all text-white text-sm font-medium px-6 py-4 rounded-md w-fit'
                    >
                        Book an Appointment
                    </a>
                </div>

                {/* Right Side - SCROLLING ANIMATION */}
                <div className='hidden md:flex md:w-1/2 w-full mt-12 md:mt-0 justify-center'>
                    <div className="card-grid w-[90vw] max-w-sm sm:max-w-md lg:w-[500px] h-[500px] flex gap-4 -rotate-2">
                        <div className="w-1/2 space-y-4 group">
                            <div className="animate-[scroll-up_30s_linear_infinite] group-hover:[animation-play-state:paused] space-y-4">
                                {[...doctorsCol1, ...doctorsCol1].map((doc, i) => <DoctorCard key={`col1-${i}`} {...doc} />)}
                            </div>
                        </div>
                        <div className="w-1/2 space-y-4 pt-16 group">
                            <div className="animate-[scroll-down_30s_linear_infinite] group-hover:[animation-play-state:paused] space-y-4">
                                {[...doctorsCol2, ...doctorsCol2].map((doc, i) => <DoctorCard key={`col2-${i}`} {...doc} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;