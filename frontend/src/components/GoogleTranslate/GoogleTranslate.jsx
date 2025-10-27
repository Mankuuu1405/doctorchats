// src/components/GoogleTranslate/GoogleTranslate.jsx
import React, { useState, useEffect, useRef } from "react";
import "./GoogleTranslate.css";

const GoogleTranslate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [languages, setLanguages] = useState([]);
  const containerRef = useRef(null);

  // Load Google Translate
  useEffect(() => {
    let pollInterval;
    let attempts = 0;

    const googleTranslateElementInit = () => {
      if (!window.google || !window.google.translate) {
        console.error("Google Translate script not ready yet");
        return;
      }

      new window.google.translate.TranslateElement(
        { pageLanguage: "en", layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
        "google_translate_element"
      );

      pollInterval = setInterval(() => {
        attempts++;
        const selectElement = document.querySelector(".goog-te-combo");
        if (selectElement && selectElement.options.length > 1) {
          const langOptions = Array.from(selectElement.options).map(option => ({
            code: option.value,
            name: option.text,
          }));
          setLanguages(langOptions);
          clearInterval(pollInterval);
        } else if (attempts > 50) {
          clearInterval(pollInterval);
        }
      }, 100);
    };

    window.googleTranslateElementInit = googleTranslateElementInit;

    // Inject script if not loaded
    if (!document.querySelector("script[src*='translate.google.com']")) {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      googleTranslateElementInit();
    }

    return () => {
      clearInterval(pollInterval);
      delete window.googleTranslateElementInit;
    };
  }, []);

  // Close modal when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Change language
  const handleLanguageChange = (langCode) => {
    const selectElement = document.querySelector(".goog-te-combo");
    if (selectElement) {
      selectElement.value = langCode;
      selectElement.dispatchEvent(new Event("change"));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="google-translate-container" ref={containerRef}>
      <button
        className="google-translate-button"
        aria-label="Select Language"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        {/* 🌍 World Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 10c0 .34-.02.68-.05 1H7.05A8.013 8.013 0 017 12c0-.34.02-.68.05-1h9.9c.03.32.05.66.05 1zm-9.9-2h9.8A7.978 7.978 0 0012 4c-1.83 0-3.5.62-4.9 1.66V10zM12 20a7.978 7.978 0 004.9-1.66V14H7.1v4.34A7.978 7.978 0 0012 20z" />
        </svg>
      </button>

      <div id="google_translate_element"></div>

      {isModalOpen && (
        <div className="language-modal">
          {languages.length > 0 ? (
            languages.map((lang) => (
              <button
                key={lang.code}
                className="language-item"
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.name}
              </button>
            ))
          ) : (
            <div className="language-item" style={{ color: "#9ca3af" }}>
              Loading languages...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleTranslate;
