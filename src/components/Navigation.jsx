// src/components/Navigation.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav style={navStyles}>
      <Link to="/" style={logoStyles}>
        🎊 Undangan Digital
      </Link>
      <div style={navLinksStyles}>
        <Link 
          to="/" 
          style={{
            ...linkStyles,
            ...(location.pathname === '/' ? activeLinkStyles : {})
          }}
        >
          Home
        </Link>
        <Link 
          to="/dashboard" 
          style={{
            ...linkStyles,
            ...(location.pathname === '/dashboard' ? activeLinkStyles : {})
          }}
        >
          Dashboard
        </Link>
        <Link 
          to="/create" 
          style={{
            ...linkStyles,
            ...(location.pathname === '/create' ? activeLinkStyles : {})
          }}
        >
          Buat Undangan
        </Link>
      </div>
    </nav>
  );
};

const navStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: 'white',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const logoStyles = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: '#6a11cb',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const navLinksStyles = {
  display: 'flex',
  gap: '2rem',
  alignItems: 'center'
};

const linkStyles = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: '500',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  transition: 'all 0.3s ease'
};

const activeLinkStyles = {
  backgroundColor: '#6a11cb',
  color: 'white'
};

export default Navigation;