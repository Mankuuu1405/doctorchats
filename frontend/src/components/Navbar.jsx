import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, handleLogout, userData } = useContext(AppContext);

  const onLogout = () => {
    handleLogout();
    navigate('/login');
  };

  // --- NEW: Defined navigation links for easier management ---
  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/doctors', label: 'DOCTORS' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
    {
<<<<<<< HEAD
      path: 'https://www.cywala.com/admin',
=======
      path: 'https://www.cywala.com/admin/login',
>>>>>>> 99d068b (new changes)
      label: 'DOCTORS LOGIN',
      isExternal: true, // Flag for external links
    },
     {
      path: '/login',
      label: 'PATIENT LOGIN',
      isExternal: false, // Flag for external links
    }
  ];

  return (
    <div className='flex items-center justify-between px-4 md:px-10 py-4 border-b border-gray-200 shadow-sm bg-white sticky top-0 z-50'>

      {/* Logo */}
      <img onClick={() => navigate('/')} className='w-28 cursor-pointer' src={assets.logo} alt="Logo" />

      {/* Desktop Menu - UPDATED */}
      <ul className='hidden md:flex items-center gap-6 font-medium text-gray-700'>
        {navLinks.map((link) => (
          <li key={link.label} className="group">
            {link.isExternal ? (
              <a
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="relative py-1 transition-colors duration-200 text-gray-700 hover:text-teal-600"
              >
                {link.label}
                <span className='absolute left-0 -bottom-1 w-full h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left'></span>
              </a>
            ) : (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1 transition-colors duration-200 ${
                    isActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
                  }`
                }
              >
                {link.label}
                <span className='absolute left-0 -bottom-1 w-full h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left'></span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='relative group py-2 -my-2'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img className='w-8 h-8 rounded-full object-cover border' src={userData.image} alt="user" />
              <img className='w-3' src={assets.dropdown_icon} alt="dropdown" />
            </div>
            <div className='absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg hidden group-hover:flex flex-col z-50'>
              <p onClick={() => navigate('/my-profile')} className='py-2 px-4 hover:bg-gray-100 cursor-pointer'>My Profile</p>
              <p onClick={() => navigate('/my-consultations')} className='py-2 px-4 hover:bg-gray-100 cursor-pointer'>My Consultations</p>
              <hr />
              <p onClick={onLogout} className='py-2 px-4 hover:bg-gray-100 cursor-pointer text-red-500'>Logout</p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='hidden md:block bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all'
          >
            Create account
          </button>
        )}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="menu" />
      </div>

      {/* Mobile Menu - UPDATED */}
      <div className={`fixed top-0 right-0 z-40 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${showMenu ? 'translate-x-0' : 'translate-x-full'} w-3/4 max-w-sm p-6`}>
        <div className='flex justify-between items-center mb-8'>
          <img src={assets.logo} className='w-28' alt="logo" />
          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-6 cursor-pointer' alt="close" />
        </div>
        <ul className='flex flex-col gap-4 text-lg font-medium text-gray-700'>
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.isExternal ? (
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowMenu(false)}
                  className='block py-2 px-2 rounded hover:bg-gray-100'
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  to={link.path}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => `block py-2 px-2 rounded ${isActive ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-100'}`}
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
