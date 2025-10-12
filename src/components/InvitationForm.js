// components/InvitationForm.js
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
    { value: 'minimalist', label: 'Minimalist', color: '#f8f9fa' },
    { value: 'floral', label: 'Floral', color: '#ffe6e6' },
    { value: 'classic', label: 'Classic', color: '#f0f8ff' },
    { value: 'modern', label: 'Modern', color: '#f5f5f5' },
    { value: 'vintage', label: 'Vintage', color: '#fff8e1' }
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
    <div className="invitation-form">
      <h2>Buat Undangan Digital</h2>
      
      {message && (
        <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama Pasangan *</label>
          <input
            type="text"
            name="couple_name"
            value={formData.couple_name}
            onChange={handleChange}
            placeholder="Contoh: John & Jane"
            required
          />
        </div>

        <div className="form-group">
          <label>Tanggal Pernikahan *</label>
          <input
            type="date"
            name="wedding_date"
            value={formData.wedding_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Lokasi Acara</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Contoh: Grand Ballroom Hotel"
          />
        </div>

        <div className="form-group">
          <label>Tema Undangan</label>
          <div className="theme-selector">
            {themes.map(theme => (
              <label key={theme.value} className="theme-option">
                <input
                  type="radio"
                  name="theme"
                  value={theme.value}
                  checked={formData.theme === theme.value}
                  onChange={handleChange}
                />
                <span 
                  className="theme-preview"
                  style={{ backgroundColor: theme.color }}
                ></span>
                {theme.label}
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Membuat...' : 'Buat Undangan'}
        </button>
      </form>

      <style jsx>{`
        .invitation-form {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #555;
        }

        input[type="text"],
        input[type="date"] {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        input:focus {
          outline: none;
          border-color: #6a11cb;
        }

        .theme-selector {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .theme-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .theme-option:hover {
          border-color: #6a11cb;
        }

        .theme-option input[type="radio"] {
          display: none;
        }

        .theme-option input[type="radio"]:checked + .theme-preview {
          border: 3px solid #6a11cb;
        }

        .theme-preview {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-bottom: 0.25rem;
          border: 2px solid transparent;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .message {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          text-align: center;
          font-weight: 600;
        }

        .message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
};

export default InvitationForm;