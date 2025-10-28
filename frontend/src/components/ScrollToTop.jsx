import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Extracts the pathname property from the location object
  const { pathname } = useLocation();

  // This effect runs every time the pathname changes
  useEffect(() => {
    // Scrolls the window to the top left corner of the page
    window.scrollTo(0, 0);
  }, [pathname]); // The effect depends on the pathname, so it re-runs on navigation

  // This component does not render anything to the DOM
  return null;
};

export default ScrollToTop;