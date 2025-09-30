import * as Sentry from '@sentry/react';

export const initErrorMonitoring = () => {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.NODE_ENV,
    });
  }
};

export const logError = (error, context = {}) => {
  console.error('Application error:', error);
  
  if (import.meta.env.PROD) {
    Sentry.captureException(error, { extra: context });
  }
};