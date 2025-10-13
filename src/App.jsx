// src/App.jsx - PASTIKAN SEPERTI INI
import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <h1>🎉 My Undangan Digital</h1>
      <p>Buat dan bagikan undangan pernikahan digital dengan mudah</p>
      
      <div style={{ background: 'white', color: '#333', padding: '30px', margin: '20px auto', borderRadius: '15px', maxWidth: '600px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <h3>✨ Fitur Coming Soon ✨</h3>
        <p>Form buat undangan sedang dalam pengembangan</p>
        <button style={{ padding: '10px 20px', margin: '10px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px' }}>
          Notify Me When Ready
        </button>
      </div>
      
      <footer style={{ marginTop: '40px', fontSize: '14px' }}>
        © 2024 My Undangan Digital - All rights reserved
      </footer>
    </div>
  );
}

export default App;