// src/components/InvitationForm.js
import React, { useState } from 'react';

const InvitationForm = () => {
  const [formData, setFormData] = useState({
    coupleName: '',
    weddingDate: '',
    venue: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Undangan untuk ${formData.coupleName} berhasil dibuat!`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h3>Buat Undangan Baru</h3>
      
      <input
        type="text"
        placeholder="Nama Pasangan"
        value={formData.coupleName}
        onChange={(e) => setFormData({...formData, coupleName: e.target.value})}
        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
      />
      
      <input
        type="date"
        value={formData.weddingDate}
        onChange={(e) => setFormData({...formData, weddingDate: e.target.value})}
        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
      />
      
      <input
        type="text"
        placeholder="Lokasi Acara"
        value={formData.venue}
        onChange={(e) => setFormData({...formData, venue: e.target.value})}
        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
      />
      
      <button type="submit" style={{ padding: '10px 20px', margin: '10px 0' }}>
        Buat Undangan
      </button>
    </form>
  );
};

export default InvitationForm;