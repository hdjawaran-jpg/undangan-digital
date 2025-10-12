// src/services/api.js
const API_BASE = 'http://localhost:3000/api';

export const invitationAPI = {
  // Get all invitations
  getInvitations: async () => {
    try {
      const response = await fetch(`${API_BASE}/invitations`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching invitations:', error);
      return { 
        status: 'error', 
        data: [],
        message: 'Gagal memuat data undangan' 
      };
    }
  },

  // Create new invitation
  createInvitation: async (invitationData) => {
    try {
      const response = await fetch(`${API_BASE}/invitations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invitationData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating invitation:', error);
      return { 
        status: 'error', 
        message: 'Gagal membuat undangan. Periksa koneksi internet Anda.' 
      };
    }
  },

  // Get single invitation
  getInvitation: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/invitations/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching invitation:', error);
      return { 
        status: 'error', 
        data: null,
        message: 'Gagal memuat detail undangan' 
      };
    }
  },

  // Update invitation
  updateInvitation: async (id, invitationData) => {
    try {
      const response = await fetch(`${API_BASE}/invitations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invitationData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating invitation:', error);
      return { 
        status: 'error', 
        message: 'Gagal memperbarui undangan' 
      };
    }
  },

  // Delete invitation
  deleteInvitation: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/invitations/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting invitation:', error);
      return { 
        status: 'error', 
        message: 'Gagal menghapus undangan' 
      };
    }
  }
};

// Health check function
export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE}/health`);
    return await response.json();
  } catch (error) {
    console.error('API health check failed:', error);
    return { status: 'error', message: 'Backend tidak terhubung' };
  }
};