// src/components/Sidebar.jsx

import React, { useContext, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';

// Accept toggleSidebar as a prop
const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const { dToken } = useContext(DoctorContext);
    const { aToken } = useContext(AdminContext);

    // Create a ref to attach to the sidebar's main div
    const sidebarRef = useRef(null);

    const role = aToken ? 'admin' : dToken ? 'doctor' : null;

    // This effect handles the "click outside to close" functionality
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the sidebar is open and the click is not inside the sidebar, close it.
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar();
            }
        };

        // Add event listener when the sidebar is open
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup: remove the event listener when the component unmounts or the sidebar closes
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen, toggleSidebar]); // Dependencies for the effect

    if (!role) {
        return null; // Don't render if no user is logged in
    }

    const adminLinks = [
        { path: '/dashboard', icon: assets.home_icon, label: 'Dashboard' },
        { path: '/admin/doctors', icon: assets.people_icon, label: 'Doctors List' },
        { path: '/admin/patients', icon: assets.people_icon, label: 'Patient List' },
    ];

    const doctorLinks = [
        { path: '/doctor/dashboard', icon: assets.home_icon, label: 'Dashboard' },
        { path: '/doctor/profile', icon: assets.people_icon, label: 'My Profile' },
    ];

    const linksToRender = role === 'admin' ? adminLinks : doctorLinks;

    return (
        <div
            ref={sidebarRef} // Attach the ref here
            className={`fixed inset-y-0 left-0 w-64 bg-white border-r pt-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-auto transition-transform duration-300 ease-in-out z-30`}
        >
            {/* --- Close Button for Mobile --- */}
            <div className="flex justify-end px-4 mb-4 md:hidden">
                <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </button>
            </div>

            <ul className='text-gray-600 font-medium space-y-2'>
                {linksToRender.map((link) => (
                    <li key={link.path}>
                        <NavLink
                            to={link.path}
                            onClick={isSidebarOpen ? toggleSidebar : undefined} // Optional: close sidebar on link click on mobile
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3 px-6 cursor-pointer transition-colors duration-200 hover:bg-teal-50 hover:text-teal-600 ${isActive
                                    ? 'bg-teal-100 text-teal-700 border-r-4 border-teal-600 font-semibold'
                                    : ''
                                }`
                            }
                        >
                            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                                <img
                                    className='w-full h-full object-contain'
                                    src={link.icon}
                                    alt={`${link.label} icon`}
                                />
                            </div>
                            <p className=' md:block'>{link.label}</p>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;