import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  
  // Destructure token from context to check login state
  const { token, handleLogout } = useContext(AppContext);
  const translateInitialized = useRef(false);

  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };

  const currentOrigin =
    typeof window !== "undefined" ? window.location.origin : "";
  const adminUrl =
    import.meta.env.VITE_ADMIN_URL ||
    `${currentOrigin.replace(/\/$/, "")}/admin`;
  const adminDoctorUrl =
    import.meta.env.VITE_ADMIN_DOCTOR_URL ||
    `${adminUrl}/admin/doctor/login`;

  // Define base navigation links
  const baseNavLinks = [
    { path: "/", label: "HOME" },
    { path: "/doctors", label: "DOCTORS" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  // Conditionally add login links based on token. Logout button is handled separately.
  const navLinks = token
    ? [...baseNavLinks] 
    : [
        ...baseNavLinks,
        { path: adminDoctorUrl, label: "DOCTORS LOGIN", isExternal: true },
        { path: "/login", label: "PATIENT LOGIN", isExternal: false },
      ];

  // Initialize Google Translate ONCE on component mount
  useEffect(() => {
    const initGoogleTranslate = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        const container = document.getElementById("google_translate_element");
        if (container && !translateInitialized.current) {
          try {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: "en,hi,bn,te,ta,ml,gu,mr,ur,fr,de,es,it,zh-CN,ja,ko,ru,ar",
                layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
              },
              "google_translate_element"
            );
            translateInitialized.current = true;
          } catch (error) {
            console.error("Error initializing Google Translate:", error);
          }
        }
      } else {
        setTimeout(initGoogleTranslate, 200);
      }
    };
    setTimeout(initGoogleTranslate, 500);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4 border-b border-gray-200 shadow-sm bg-white sticky top-0 z-50">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
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
                        ? "text-teal-600"
                        : "text-gray-700 hover:text-teal-600"
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

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 relative">
          
          {/* Translate Button */}
          <div className="relative">
            <button
              onClick={() => setShowTranslate(!showTranslate)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-all md:px-4 md:py-2 px-3 py-2 flex items-center justify-center"
            >
              <span className="md:hidden">🌐</span> 
              <span className="hidden md:inline">🌐 Translate</span> 
            </button>

            <div
              className="absolute right-0 mt-2 w-60 max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-3"
              style={{
                display: showTranslate ? 'block' : 'none',
                visibility: showTranslate ? 'visible' : 'hidden',
              }}
            >
              <div
                id="google_translate_element"
                className="text-sm min-h-[80px]"
              ></div>
              <button
                onClick={() => setShowTranslate(false)}
                className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white py-1.5 rounded-full text-sm"
              >
                Close
              </button>
            </div>
          </div>

          {/* ✅ DESKTOP LOGOUT BUTTON - MOVED HERE */}
          {token && (
            <button
              onClick={onLogout}
              className="hidden md:flex bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
            >
              LOGOUT
            </button>
          )}

          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
             <img
              onClick={() => setShowMenu(true)}
              className="w-6 cursor-pointer"
              src={assets.menu_icon}
              alt="menu"
            />
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
          <div className="bg-white w-3/4 max-w-xs h-full shadow-lg p-5 flex flex-col relative">
            <button
              onClick={() => setShowMenu(false)}
              className="self-end text-gray-500 text-xl font-bold"
            >
              ✕
            </button>

            <ul className="flex flex-col gap-4 mt-6 font-medium text-gray-700">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowMenu(false)}
                      className="block py-1 hover:text-teal-600"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      to={link.path}
                      onClick={() => setShowMenu(false)}
                      className={({ isActive }) =>
                        `block py-1 ${
                          isActive
                            ? "text-teal-600"
                            : "text-gray-700 hover:text-teal-600"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </li>
              ))}
               {/* MOBILE LOGOUT BUTTON (Stays here) */}
              {token && (
                <li className="mt-4">
                  <button
                    onClick={() => {
                      onLogout();
                      setShowMenu(false);
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium transition-all"
                  >
                    LOGOUT
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;