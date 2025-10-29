import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

// The Navbar now accepts a 'toggleSidebar' prop.
const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const { dToken, handleDoctorLogout } = useContext(DoctorContext);
    const { aToken, handleAdminLogout } = useContext(AdminContext);

    const onLogout = () => {
        if (aToken) {
            handleAdminLogout();
        } else if (dToken) {
            handleDoctorLogout();
        }
        navigate('/');
    };

    const currentRole = aToken ? 'Admin' : dToken ? 'Doctor' : null;

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-sm'>
            <div className='flex items-center gap-3'>
                {/* --- Hamburger Menu Icon --- */}
                {/* This button is only visible on screens smaller than 'md' */}
                {/* It calls the toggleSidebar function passed down from App.jsx */}
                {(aToken || dToken) && (
                     <div className="md:hidden">
                        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
                            {/* You need to add a menu icon to your assets file */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>

                        </button>
                    </div>
                )}
               
                <img 
                    className='w-28' 
                    src={assets.logo} 
                    alt="Logo" 
                />
                {currentRole && (
                    <p className='border px-2.5 py-0.5 rounded-full border-gray-400 text-gray-600 text-xs font-semibold'>
                        {currentRole} Panel
                    </p>
                )}
            </div>
            
            {(aToken || dToken) && (
                <button 
                    onClick={onLogout} 
                    className='bg-teal-600 text-white text-sm px-6 py-2 rounded-full hover:bg-teal-700 transition-all'
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Navbar;