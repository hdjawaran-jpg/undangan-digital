import api from '../utils/api';

export const invitationService = {
  // Get all invitations for user
  getInvitations: async () => {
    const response = await api.get('/invitations');
    return response.data;
  },

  // Get single invitation
  getInvitation: async (id) => {
    const response = await api.get(`/invitations/${id}`);
    return response.data;
  },

  // Create new invitation
  createInvitation: async (invitationData) => {
    const response = await api.post('/invitations', invitationData);
    return response.data;
  },

  // Update invitation
  updateInvitation: async (id, invitationData) => {
    const response = await api.put(`/invitations/${id}`, invitationData);
    return response.data;
  },

  // Delete invitation
  deleteInvitation: async (id) => {
    const response = await api.delete(`/invitations/${id}`);
    return response.data;
  },

  // Publish invitation
  publishInvitation: async (id) => {
    const response = await api.post(`/invitations/${id}/publish`);
    return response.data;
  },

  // Get invitation analytics
  getAnalytics: async (id) => {
    const response = await api.get(`/invitations/${id}/analytics`);
    return response.data;
  }
};