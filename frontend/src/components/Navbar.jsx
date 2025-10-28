import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [translateContent, setTranslateContent] = useState(null);
  const { handleLogout } = useContext(AppContext);

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

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/doctors", label: "DOCTORS" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
    { path: adminDoctorUrl, label: "DOCTORS LOGIN", isExternal: true },
    { path: "/login", label: "PATIENT LOGIN", isExternal: false },
  ];

  // ✅ Load Google Translate script
  const loadGoogleTranslate = () => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    console.log("Translate visible:", showTranslate);
  }, [showTranslate]);

  const initTranslate = () => {
    if (window.google && window.google.translate) {
      // Initialize desktop version
      const desktopElem = document.getElementById("google_translate_element");
      if (desktopElem && !desktopElem.querySelector('.goog-te-combo')) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,hi,bn,te,ta,ml,gu,mr,ur,fr,de,es,it,zh-CN,ja,ko,ru,ar",
            layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          },
          "google_translate_element"
        );
      }

      // Initialize mobile version
      const mobileElem = document.getElementById("google_translate_element_mobile");
      if (mobileElem && !mobileElem.querySelector('.goog-te-combo')) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,hi,bn,te,ta,ml,gu,mr,ur,fr,de,es,it,zh-CN,ja,ko,ru,ar",
            layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          },
          "google_translate_element_mobile"
        );
      }

      // Cache the translation content for both
      setTimeout(() => {
        const elem = document.getElementById("google_translate_element");
        if (elem) setTranslateContent(elem.innerHTML);
      }, 1000);
    }
  };

  useEffect(() => {
    if (showTranslate && !translateContent) {
      loadGoogleTranslate();
      window.googleTranslateElementInit = initTranslate;

      const check = setInterval(() => {
        if (window.google && window.google.translate) {
          clearInterval(check);
          initTranslate();
        }
      }, 500);

      return () => clearInterval(check);
    }
  }, [showTranslate]);

  useEffect(() => {
    if (showTranslate && translateContent) {
      const desktopElem = document.getElementById("google_translate_element");
      if (desktopElem && !desktopElem.innerHTML.trim()) {
        desktopElem.innerHTML = translateContent;
      }
      
      const mobileElem = document.getElementById("google_translate_element_mobile");
      if (mobileElem && !mobileElem.innerHTML.trim()) {
        mobileElem.innerHTML = translateContent;
      }
    }
  }, [showTranslate, translateContent]);

  // Re-initialize when opening mobile translate
  useEffect(() => {
    if (showTranslate) {
      setTimeout(() => {
        initTranslate();
      }, 100);
    }
  }, [showTranslate]);

  return (
    <>
      {/* ✅ NAVBAR TOP */}
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
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(link.path, "_blank", "noopener,noreferrer");
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

        {/* Right Side */}
        <div className="flex items-center gap-4 relative">
          {/* 🌐 Translate Button (Desktop) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowTranslate(!showTranslate)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all"
            >
              🌐 Translate
            </button>

            {/* ✅ Dropdown positioned below the button */}
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

          {/* 🌐 Translate Button (Mobile) - Fixed positioning */}
          <div className="relative md:hidden">
            <button
              onClick={() => setShowTranslate(!showTranslate)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1.5 rounded-full text-sm font-medium transition-all"
            >
              🌐
            </button>

            {/* ✅ Mobile Translate Dropdown - appears below button */}
            {showTranslate && (
              <div className="fixed right-4 mt-2 w-64 max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg z-[60] p-3">
                <div id="google_translate_element_mobile" className="text-sm"></div>
                <button
                  onClick={() => setShowTranslate(false)}
                  className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white py-1.5 rounded-full text-sm"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* 🍔 Hamburger */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden cursor-pointer"
            src={assets.menu_icon}
            alt="menu"
          />
        </div>
      </div>

      {/* ✅ MOBILE MENU OVERLAY */}
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
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;