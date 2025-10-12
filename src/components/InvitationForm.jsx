// src/components/InvitationForm.jsx
import React, { useState } from 'react';
import { invitationAPI } from '../services/api';

const InvitationForm = ({ onInvitationCreated }) => {
  const [formData, setFormData] = useState({
    couple_name: '',
    wedding_date: '',
    venue: '',
    theme: 'minimalist'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const themes = [
    { value: 'minimalist', label: 'Minimalist', color: '#f8f9fa', emoji: '⚪' },
    { value: 'floral', label: 'Floral', color: '#ffe6e6', emoji: '🌸' },
    { value: 'classic', label: 'Classic', color: '#f0f8ff', emoji: '👑' },
    { value: 'modern', label: 'Modern', color: '#f5f5f5', emoji: '💎' },
    { value: 'vintage', label: 'Vintage', color: '#fff8e1', emoji: '📜' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validasi
    if (!formData.couple_name || !formData.wedding_date) {
      setMessage('Nama pasangan dan tanggal pernikahan wajib diisi!');
      setLoading(false);
      return;
    }

    try {
      const result = await invitationAPI.createInvitation(formData);
      
      if (result.status === 'success') {
        setMessage('🎉 Undangan berhasil dibuat!');
        setFormData({
          couple_name: '',
          wedding_date: '',
          venue: '',
          theme: 'minimalist'
        });
        
        // Callback untuk update parent component
        if (onInvitationCreated) {
          onInvitationCreated(result.data);
        }
      } else {
        setMessage('❌ Gagal membuat undangan: ' + (result.message || 'Coba lagi'));
      }
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={formStyles}>
      {message && (
        <div style={{
          ...messageStyles,
          ...(message.includes('❌') ? errorMessageStyles : successMessageStyles)
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={formElementStyles}>
        <div style={formGroupStyles}>
          <label style={labelStyles}>Nama Pasangan *</label>
          <input
            type="text"
            name="couple_name"
            value={formData.couple_name}
            onChange={handleChange}
            placeholder="Contoh: John & Jane"
            required
            style={inputStyles}
          />
        </div>

        <div style={formGroupStyles}>
          <label style={labelStyles}>Tanggal Pernikahan *</label>
          <input
            type="date"
            name="wedding_date"
            value={formData.wedding_date}
            onChange={handleChange}
            required
            style={inputStyles}
          />
        </div>

        <div style={formGroupStyles}>
          <label style={labelStyles}>Lokasi Acara</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Contoh: Grand Ballroom Hotel"
            style={inputStyles}
          />
        </div>

        <div style={formGroupStyles}>
          <label style={labelStyles}>Tema Undangan</label>
          <div style={themeSelectorStyles}>
            {themes.map(theme => (
              <label key={theme.value} style={themeOptionStyles}>
                <input
                  type="radio"
                  name="theme"
                  value={theme.value}
                  checked={formData.theme === theme.value}
                  onChange={handleChange}
                  style={radioInputStyles}
                />
                <span 
                  style={{
                    ...themePreviewStyles,
                    backgroundColor: theme.color
                  }}
                >
                  {theme.emoji}
                </span>
                <span style={themeLabelStyles}>{theme.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          style={{
            ...submitBtnStyles,
            ...(loading ? submitBtnDisabledStyles : {})
          }}
          disabled={loading}
        >
          {loading ? 'Membuat...' : 'Buat Undangan'}
        </button>
      </form>
    </div>
  );
};

// Styles
const formStyles = {
  padding: '0'
};

const formElementStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const formGroupStyles = {
  display: 'flex',
  flexDirection: 'column'
};

const labelStyles = {
  marginBottom: '0.5rem',
  fontWeight: '600',
  color: '#333',
  fontSize: '0.95rem'
};

const inputStyles = {
  padding: '0.75rem',
  border: '2px solid #e1e5e9',
  borderRadius: '8px',
  fontSize: '1rem',
  transition: 'border-color 0.3s',
  fontFamily: 'inherit'
};

const themeSelectorStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: '0.75rem',
  marginTop: '0.5rem'
};

const themeOptionStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem 0.5rem',
  border: '2px solid #e1e5e9',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s',
  textAlign: 'center'
};

const radioInputStyles = {
  display: 'none'
};

const themePreviewStyles = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginBottom: '0.5rem',
  border: '3px solid transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  transition: 'all 0.3s'
};

const themeLabelStyles = {
  fontSize: '0.85rem',
  fontWeight: '500',
  color: '#333'
};

const submitBtnStyles = {
  padding: '1rem',
  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  marginTop: '1rem'
};

const submitBtnDisabledStyles = {
  opacity: '0.6',
  cursor: 'not-allowed'
};

const messageStyles = {
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '1rem',
  textAlign: 'center',
  fontWeight: '600'
};

const successMessageStyles = {
  background: '#d4edda',
  color: '#155724',
  border: '1px solid #c3e6cb'
};

const errorMessageStyles = {
  background: '#f8d7da',
  color: '#721c24',
  border: '1px solid #f5c6cb'
};

// Dynamic styles for radio checked state
const dynamicStyles = `
  input[type="radio"]:checked + span {
    border-color: #6a11cb !important;
    transform: scale(1.1);
  }

  input[type="radio"]:checked ~ span:last-child {
    color: #6a11cb;
    font-weight: 600;
  }

  input:focus {
    outline: none;
    border-color: #6a11cb !important;
  }
`;

// Inject dynamic styles
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(dynamicStyles, styleSheet.cssRules.length);

export default InvitationForm;