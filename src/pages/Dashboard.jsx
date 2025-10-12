// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InvitationForm from '../components/InvitationForm';
import { invitationAPI } from '../services/api';

const Dashboard = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchInvitations = async () => {
    try {
      const result = await invitationAPI.getInvitations();
      if (result.status === 'success') {
        setInvitations(result.data);
      }
    } catch (error) {
      console.error('Error fetching invitations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const handleInvitationCreated = (newInvitation) => {
    setInvitations(prev => [newInvitation, ...prev]);
    setShowForm(false);
    fetchInvitations();
  };

  return (
    <div style={dashboardStyles}>
      <div className="container">
        <header style={headerStyles}>
          <h1 style={h1Styles}>Dashboard Undangan Digital</h1>
          <p style={subtitleStyles}>Buat dan kelola undangan pernikahan digital Anda</p>
        </header>

        <div style={contentStyles}>
          {/* Quick Actions */}
          <section style={actionsSectionStyles}>
            <div style={actionCardStyles}>
              <h3 style={actionTitleStyles}>Buat Undangan Baru</h3>
              <p style={actionDescStyles}>
                Buat undangan digital yang cantik dalam beberapa menit
              </p>
              <button 
                onClick={() => setShowForm(true)}
                className="cta-button"
                style={actionButtonStyles}
              >
                + Buat Undangan
              </button>
            </div>
            
            <div style={statsCardStyles}>
              <h3 style={actionTitleStyles}>Statistik</h3>
              <div style={statsGridStyles}>
                <div style={statItemStyles}>
                  <span style={statNumberStyles}>{invitations.length}</span>
                  <span style={statLabelStyles}>Total Undangan</span>
                </div>
                <div style={statItemStyles}>
                  <span style={statNumberStyles}>0</span>
                  <span style={statLabelStyles}>Tamu Diundang</span>
                </div>
              </div>
            </div>
          </section>

          {/* Invitation Form Modal */}
          {showForm && (
            <div style={modalOverlayStyles}>
              <div style={modalStyles}>
                <div style={modalHeaderStyles}>
                  <h2>Buat Undangan Baru</h2>
                  <button 
                    onClick={() => setShowForm(false)}
                    style={closeButtonStyles}
                  >
                    ×
                  </button>
                </div>
                <InvitationForm onInvitationCreated={handleInvitationCreated} />
              </div>
            </div>
          )}

          {/* Invitations List */}
          <section style={invitationsSectionStyles}>
            <h2 style={sectionTitleStyles}>Undangan Anda ({invitations.length})</h2>
            
            {loading ? (
              <div style={loadingStyles}>Memuat undangan...</div>
            ) : invitations.length === 0 ? (
              <div style={emptyStateStyles}>
                <div style={emptyIconStyles}>🎊</div>
                <h3 style={emptyTitleStyles}>Belum ada undangan</h3>
                <p style={emptyDescStyles}>
                  Mulai dengan membuat undangan pertama Anda
                </p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="cta-button"
                >
                  Buat Undangan Pertama
                </button>
              </div>
            ) : (
              <div style={invitationsGridStyles}>
                {invitations.map(invitation => (
                  <div key={invitation.id} style={invitationCardStyles}>
                    <div style={cardHeaderStyles}>
                      <h3 style={cardTitleStyles}>{invitation.couple_name}</h3>
                      <span style={themeBadgeStyles(invitation.theme)}>
                        {invitation.theme}
                      </span>
                    </div>
                    <div style={cardDetailsStyles}>
                      <p style={detailItemStyles}>
                        📅 {new Date(invitation.wedding_date).toLocaleDateString('id-ID')}
                      </p>
                      <p style={detailItemStyles}>
                        📍 {invitation.venue || 'Lokasi belum ditentukan'}
                      </p>
                      <p style={detailItemStyles}>
                        🕐 Dibuat: {new Date(invitation.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div style={cardActionsStyles}>
                      <button style={btnPrimaryStyles}>Preview</button>
                      <button style={btnSecondaryStyles}>Bagikan</button>
                      <button style={btnDangerStyles}>Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

// Styles
const dashboardStyles = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  padding: '2rem 0'
};

const headerStyles = {
  textAlign: 'center',
  marginBottom: '3rem'
};

const h1Styles = {
  color: '#333',
  marginBottom: '0.5rem',
  fontSize: '2.5rem'
};

const subtitleStyles = {
  color: '#666',
  fontSize: '1.2rem'
};

const contentStyles = {
  maxWidth: '1200px',
  margin: '0 auto'
};

const actionsSectionStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
  marginBottom: '3rem'
};

const actionCardStyles = {
  background: 'white',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center'
};

const statsCardStyles = {
  background: 'white',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

const actionTitleStyles = {
  color: '#333',
  marginBottom: '1rem',
  fontSize: '1.3rem'
};

const actionDescStyles = {
  color: '#666',
  marginBottom: '1.5rem'
};

const actionButtonStyles = {
  width: '100%'
};

const statsGridStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem'
};

const statItemStyles = {
  textAlign: 'center',
  padding: '1rem'
};

const statNumberStyles = {
  display: 'block',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#6a11cb',
  marginBottom: '0.5rem'
};

const statLabelStyles = {
  color: '#666',
  fontSize: '0.9rem'
};

const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '2rem'
};

const modalStyles = {
  background: 'white',
  borderRadius: '12px',
  maxWidth: '600px',
  width: '100%',
  maxHeight: '90vh',
  overflow: 'auto'
};

const modalHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem 2rem',
  borderBottom: '1px solid #e9ecef'
};

const closeButtonStyles = {
  background: 'none',
  border: 'none',
  fontSize: '2rem',
  cursor: 'pointer',
  color: '#666'
};

const invitationsSectionStyles = {
  background: 'white',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

const sectionTitleStyles = {
  color: '#333',
  marginBottom: '1.5rem',
  fontSize: '1.5rem'
};

const loadingStyles = {
  textAlign: 'center',
  padding: '3rem',
  color: '#666'
};

const emptyStateStyles = {
  textAlign: 'center',
  padding: '3rem',
  color: '#666'
};

const emptyIconStyles = {
  fontSize: '4rem',
  marginBottom: '1rem'
};

const emptyTitleStyles = {
  color: '#333',
  marginBottom: '0.5rem'
};

const emptyDescStyles = {
  marginBottom: '2rem'
};

const invitationsGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '1.5rem'
};

const invitationCardStyles = {
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  padding: '1.5rem',
  transition: 'all 0.3s ease'
};

const cardHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '1rem'
};

const cardTitleStyles = {
  margin: 0,
  color: '#333',
  fontSize: '1.2rem'
};

const themeBadgeStyles = (theme) => ({
  padding: '0.25rem 0.75rem',
  background: '#e9ecef',
  borderRadius: '20px',
  fontSize: '0.8rem',
  color: '#495057'
});

const cardDetailsStyles = {
  marginBottom: '1.5rem'
};

const detailItemStyles = {
  margin: '0.5rem 0',
  color: '#666'
};

const cardActionsStyles = {
  display: 'flex',
  gap: '0.5rem'
};

const btnPrimaryStyles = {
  padding: '0.5rem 1rem',
  background: '#6a11cb',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

const btnSecondaryStyles = {
  padding: '0.5rem 1rem',
  background: '#e9ecef',
  color: '#495057',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

const btnDangerStyles = {
  padding: '0.5rem 1rem',
  background: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

export default Dashboard;