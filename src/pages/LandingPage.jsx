// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      {/* Header Section */}
      <header style={headerStyles}>
        <div className="container">
          <div style={headerContentStyles}>
            <h1 style={h1Styles}>Undangan Digital untuk Hari Bahagiamu</h1>
            <p style={subtitleStyles}>
              Buat undangan pernikahan digital yang elegan dan personal dalam hitungan menit
            </p>
            <Link to="/dashboard" className="cta-button" style={ctaButtonStyles}>
              🎉 Buat Undangan Sekarang
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section style={sectionStyles}>
        <div className="container">
          <h2 style={sectionTitleStyles}>Mengapa Memilih Undangan Digital?</h2>
          <div style={featuresGridStyles}>
            <div style={featureCardStyles}>
              <div style={featureIconStyles}>🚀</div>
              <h3 style={featureTitleStyles}>Cepat & Mudah</h3>
              <p style={featureDescStyles}>
                Buat undangan profesional hanya dalam beberapa menit dengan editor yang intuitif.
              </p>
            </div>
            <div style={featureCardStyles}>
              <div style={featureIconStyles}>💸</div>
              <h3 style={featureTitleStyles}>Hemat Biaya</h3>
              <p style={featureDescStyles}>
                Tidak perlu mencetak dan mengirim undangan fisik, menghemat anggaran pernikahan.
              </p>
            </div>
            <div style={featureCardStyles}>
              <div style={featureIconStyles}>🌍</div>
              <h3 style={featureTitleStyles}>Ramah Lingkungan</h3>
              <p style={featureDescStyles}>
                Kurangi jejak karbon dengan undangan digital yang tidak menggunakan kertas.
              </p>
            </div>
            <div style={featureCardStyles}>
              <div style={featureIconStyles}>📱</div>
              <h3 style={featureTitleStyles}>Responsif</h3>
              <p style={featureDescStyles}>
                Tampil sempurna di semua perangkat, dari smartphone hingga desktop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={ctaSectionStyles}>
        <div className="container">
          <div style={ctaContentStyles}>
            <h2 style={ctaTitleStyles}>Ayo Buat Undanganmu</h2>
            <p style={ctaDescStyles}>
              Jangan tunda lagi momen bahagiamu. Buat undangan digital yang tak terlupakan sekarang juga!
            </p>
            <Link to="/dashboard" className="cta-button" style={ctaButtonStyles}>
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Styles
const headerStyles = {
  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  color: 'white',
  padding: '100px 0',
  textAlign: 'center'
};

const headerContentStyles = {
  maxWidth: '800px',
  margin: '0 auto'
};

const h1Styles = {
  fontSize: '3.5rem',
  marginBottom: '1.5rem',
  fontWeight: '700'
};

const subtitleStyles = {
  fontSize: '1.3rem',
  marginBottom: '2.5rem',
  opacity: '0.9',
  fontWeight: '300'
};

const ctaButtonStyles = {
  textDecoration: 'none'
};

const sectionStyles = {
  padding: '100px 0',
  backgroundColor: 'white'
};

const sectionTitleStyles = {
  textAlign: 'center',
  fontSize: '2.5rem',
  marginBottom: '3rem',
  color: '#333'
};

const featuresGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2rem',
  maxWidth: '1200px',
  margin: '0 auto'
};

const featureCardStyles = {
  backgroundColor: '#f8f9fa',
  padding: '2.5rem 1.5rem',
  borderRadius: '12px',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid #e9ecef'
};

const featureIconStyles = {
  fontSize: '3rem',
  marginBottom: '1rem'
};

const featureTitleStyles = {
  fontSize: '1.4rem',
  marginBottom: '1rem',
  color: '#333'
};

const featureDescStyles = {
  color: '#666',
  lineHeight: '1.6'
};

const ctaSectionStyles = {
  padding: '100px 0',
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
  color: 'white',
  textAlign: 'center'
};

const ctaContentStyles = {
  maxWidth: '700px',
  margin: '0 auto'
};

const ctaTitleStyles = {
  fontSize: '2.5rem',
  marginBottom: '1rem'
};

const ctaDescStyles = {
  fontSize: '1.2rem',
  marginBottom: '2.5rem',
  opacity: '0.9'
};

export default LandingPage;