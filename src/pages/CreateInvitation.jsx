// src/pages/CreateInvitation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import InvitationForm from '../components/InvitationForm';

const CreateInvitation = () => {
  const navigate = useNavigate();

  const handleInvitationCreated = (newInvitation) => {
    // Redirect ke dashboard setelah berhasil membuat
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div style={pageStyles}>
      <div className="container">
        <div style={contentStyles}>
          <header style={headerStyles}>
            <button 
              onClick={() => navigate('/dashboard')}
              style={backButtonStyles}
            >
              ← Kembali ke Dashboard
            </button>
            <h1 style={titleStyles}>Buat Undangan Baru</h1>
            <p style={subtitleStyles}>
              Isi form berikut untuk membuat undangan pernikahan digital yang cantik
            </p>
          </header>

          <div style={formContainerStyles}>
            <InvitationForm onInvitationCreated={handleInvitationCreated} />
          </div>

          <div style={tipsSectionStyles}>
            <h3 style={tipsTitleStyles}>💡 Tips untuk Undangan yang Menarik:</h3>
            <ul style={tipsListStyles}>
              <li>Gunakan nama lengkap pasangan untuk kesan formal</li>
              <li>Pilih tema yang sesuai dengan kepribadian kalian</li>
              <li>Pastikan lokasi dan tanggal sudah pasti sebelum membagikan</li>
              <li>Tambahkan foto pasangan untuk personal touch</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const pageStyles = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '2rem 0'
};

const contentStyles = {
  maxWidth: '800px',
  margin: '0 auto',
  background: 'white',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
};

const headerStyles = {
  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  color: 'white',
  padding: '2rem',
  textAlign: 'center'
};

const backButtonStyles = {
  background: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  marginBottom: '1rem',
  fontSize: '0.9rem',
  backdropFilter: 'blur(10px)'
};

const titleStyles = {
  margin: '0 0 0.5rem 0',
  fontSize: '2.2rem'
};

const subtitleStyles = {
  margin: 0,
  opacity: 0.9,
  fontSize: '1.1rem'
};

const formContainerStyles = {
  padding: '2rem'
};

const tipsSectionStyles = {
  background: '#f8f9fa',
  padding: '1.5rem 2rem',
  borderTop: '1px solid #e9ecef'
};

const tipsTitleStyles = {
  margin: '0 0 1rem 0',
  color: '#333',
  fontSize: '1.1rem'
};

const tipsListStyles = {
  margin: 0,
  paddingLeft: '1.5rem',
  color: '#666',
  lineHeight: '1.6'
};

export default CreateInvitation;