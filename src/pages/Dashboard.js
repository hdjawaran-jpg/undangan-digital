// pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import InvitationForm from '../components/InvitationForm';
import { invitationAPI } from '../services/api';

const Dashboard = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchInvitations(); // Refresh list
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Undangan Digital Dashboard</h1>
        <p>Buat dan kelola undangan pernikahan digital Anda</p>
      </header>

      <div className="dashboard-content">
        <section className="create-section">
          <InvitationForm onInvitationCreated={handleInvitationCreated} />
        </section>

        <section className="invitations-section">
          <h2>Undangan Anda ({invitations.length})</h2>
          
          {loading ? (
            <div className="loading">Memuat undangan...</div>
          ) : invitations.length === 0 ? (
            <div className="empty-state">
              <p>Belum ada undangan. Buat yang pertama!</p>
            </div>
          ) : (
            <div className="invitations-grid">
              {invitations.map(invitation => (
                <div key={invitation.id} className="invitation-card">
                  <div className="card-header">
                    <h3>{invitation.couple_name}</h3>
                    <span className={`theme-badge ${invitation.theme}`}>
                      {invitation.theme}
                    </span>
                  </div>
                  <div className="card-details">
                    <p>📅 {new Date(invitation.wedding_date).toLocaleDateString('id-ID')}</p>
                    <p>📍 {invitation.venue || 'Lokasi belum ditentukan'}</p>
                  </div>
                  <div className="card-actions">
                    <button className="btn-primary">Preview</button>
                    <button className="btn-secondary">Bagikan</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 2rem;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .dashboard-header h1 {
          color: #333;
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .dashboard-content {
          display: grid;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .invitations-section h2 {
          color: #333;
          margin-bottom: 1.5rem;
        }

        .loading, .empty-state {
          text-align: center;
          padding: 2rem;
          color: #666;
          background: white;
          border-radius: 8px;
        }

        .invitations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .invitation-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .invitation-card:hover {
          transform: translateY(-4px);
        }

        .card-header {
          display: flex;
          justify-content: between;
          align-items: start;
          margin-bottom: 1rem;
        }

        .card-header h3 {
          margin: 0;
          color: #333;
          flex: 1;
        }

        .theme-badge {
          padding: 0.25rem 0.5rem;
          background: #e9ecef;
          border-radius: 20px;
          font-size: 0.8rem;
          color: #495057;
        }

        .card-details p {
          margin: 0.5rem 0;
          color: #666;
        }

        .card-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .btn-primary, .btn-secondary {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #6a11cb;
          color: white;
        }

        .btn-primary:hover {
          background: #5a0db3;
        }

        .btn-secondary {
          background: #e9ecef;
          color: #495057;
        }

        .btn-secondary:hover {
          background: #dee2e6;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;