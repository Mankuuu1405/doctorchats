import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // ✅ Only load script once
    if (!document.getElementById("google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(addScript);
    }

    // ✅ Define the global callback Google uses
    window.googleTranslateElementInit = () => {
      if (document.getElementById("google_translate_element")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages:
              "en,hi,bn,mr,ta,te,gu,kn,ml,pa,ur,or,as,ne,sd,si",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };

    // ✅ Keep checking until Google loads
    const checkIfLoaded = setInterval(() => {
      if (window.google && window.google.translate) {
        clearInterval(checkIfLoaded);
        window.googleTranslateElementInit();
      }
    }, 500);

    return () => clearInterval(checkIfLoaded);
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        display: "block",
        position: "relative",
        zIndex: 9999,
      }}
    />
  );
};

export default GoogleTranslate;
