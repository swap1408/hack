import React from 'react';

const Footer = () => {

  return (
    <footer style={styles.footer}>
      <div>
        <a href="#home" style={styles.link}>Home</a>|
        <a href="#about" style={styles.link}>About</a>|
        <a href="#profile" style={styles.link}>Profile</a>
      </div>
      <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
};
const styles = {
      footer: {
      position: 'fixed',          
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      background: 'linear-gradient(to right, #1a2025ff, #00f2fe)',
      color: '#fff',
      padding: '20px 24px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      fontSize: '0.95rem',
      borderTop: '2px solid #fff',
      borderRadius: '8px',
      marginTop: '40px',
      boxShadow: '0 -2px 6px rgba(0,0,0,0.1)',
    },
    link: {
      color: '#ffe600',
      textDecoration: 'none',
      margin: '0 8px',
      fontWeight: '500',
    },
  };

export default Footer;
