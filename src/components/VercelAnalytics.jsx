import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VercelAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Vercel Analytics auto-injects the script
    // We just need to track page changes
    if (window.va) {
      window.va('pageview');
    }
  }, [location]);

  return null;
};

export default VercelAnalytics;