// src/App.jsx
import React from 'react';
import InvitationForm from './components/InvitationForm';

function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <h1>🎉 My Undangan Digital</h1>
      <p>Buat dan bagikan undangan pernikahan digital dengan mudah</p>
      
      <div style={{ background: 'white', color: '333', padding: '30px', margin: '20px auto', borderRadius: '15px', maxWidth: '600px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <InvitationForm />
      </div>
      
      <footer style={{ marginTop: '40px', fontSize: '14px' }}>
        © 2024 My Undangan Digital - All rights reserved
      </footer>
    </div>
  );
}

export default App;