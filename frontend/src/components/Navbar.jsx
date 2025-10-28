import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const { token, handleLogout, userData } = useContext(AppContext);

  const onLogout = () => {
    handleLogout();
    navigate('/login');
  };

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const adminUrl = import.meta.env.VITE_ADMIN_URL || `${currentOrigin.replace(/\/$/, '')}/admin`;
  const adminDoctorUrl = import.meta.env.VITE_ADMIN_DOCTOR_URL || `${adminUrl}/admin/doctor/login`;

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/doctors', label: 'DOCTORS' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
    { path: adminDoctorUrl, label: 'DOCTORS LOGIN', isExternal: true },
    { path: '/login', label: 'PATIENT LOGIN', isExternal: false },
  ];

  // ✅ Function to load the Google Translate script only once
  const loadGoogleTranslate = () => {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }
  };

  // ✅ When modal opens, load and init translate
  useEffect(() => {
    if (showTranslate) {
      loadGoogleTranslate();

      window.googleTranslateElementInit = () => {
        if (!document.getElementById('google_translate_element')) return;

        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages:
              'en,hi,bn,te,ta,ml,gu,mr,ur,fr,de,es,it,zh-CN,ja,ko,ru,ar',
            layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          },
          'google_translate_element'
        );
      };
    }
  }, [showTranslate]);

  return (
    <div className="flex items-center justify-between px-4 md:px-10 py-4 border-b border-gray-200 shadow-sm bg-white sticky top-0 z-50">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-20 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700">
        {navLinks.map((link) => (
          <li key={link.label} className="group">
            {link.isExternal ? (
              <a
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(link.path, '_blank', 'noopener,noreferrer');
                }}
                className="relative py-1 transition-colors duration-200 text-gray-700 hover:text-teal-600"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            ) : (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1 transition-colors duration-200 ${
                    isActive
                      ? 'text-teal-600'
                      : 'text-gray-700 hover:text-teal-600'
                  }`
                }
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4 relative">
        {/* 🌐 Translate Button */}
        <div className="relative">
          <button
            onClick={() => setShowTranslate(!showTranslate)}
            className="hidden md:block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all"
          >
            🌐 Translate
          </button>

          {/* 🌐 Translate Modal */}
          {showTranslate && (
            <div className="absolute right-0 mt-2 w-60 max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-3">
              <div id="google_translate_element" className="text-sm"></div>
              <button
                onClick={() => setShowTranslate(false)}
                className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white py-1.5 rounded-full text-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {token && userData ? (
          <div className="relative group py-2 -my-2">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                className="w-8 h-8 rounded-full object-cover border"
                src={userData.image}
                alt="user"
              />
              <img className="w-3" src={assets.dropdown_icon} alt="dropdown" />
            </div>
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg hidden group-hover:flex flex-col z-50">
              <p
                onClick={() => navigate('/my-profile')}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate('/my-consultations')}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              >
                My Consultations
              </p>
              <hr />
              <p
                onClick={onLogout}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-red-500"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>
    </div>
  );
};

export default Navbar;
