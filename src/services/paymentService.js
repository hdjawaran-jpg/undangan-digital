import api from '../utils/api';

export const paymentService = {
  // Get available plans
  getPlans: async () => {
    const response = await api.get('/payments/plans');
    return response.data;
  },

  // Create checkout session
  createCheckoutSession: async (plan) => {
    const response = await api.post('/payments/create-checkout-session', { plan });
    return response.data;
  },

  // Create portal session for subscription management
  createPortalSession: async () => {
    const response = await api.post('/payments/create-portal-session');
    return response.data;
  },

  // Get user subscription
  getSubscription: async () => {
    const response = await api.get('/payments/subscription');
    return response.data;
  }
};