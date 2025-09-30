import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Initialize GA
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
};

export default GoogleAnalytics;