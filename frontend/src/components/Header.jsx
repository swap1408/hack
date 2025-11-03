// import React from 'react';

// const Header = () => {
//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.logo}>MyApp</div>
//       <div style={styles.navLinks}>
//         <a href="/" style={styles.link}>Home</a>
//         <a href="/about" style={styles.link}>About</a>
//         <a href="/profile" style={styles.link}>Profile</a>
//         <a href="/login" style={styles.link}>Login</a>
        
//       </div>
//     </nav>
//   );
// };
// const styles = {
//       navbar: {
//       position: 'fixed',           // ✅ Fixed at top
//       top: 0,
//       left: 0,
//       right: 0,
//       zIndex: 1000,  
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '12px 24px',
//       background: 'linear-gradient(to right, #1a2025ff, #00f2fe)',
//       color: '#fff',
//       fontFamily: 'Arial, sans-serif',
//       boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//       borderRadius: '8px',
//     },
//     logo: {
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//     },
//     navLinks: {
//       display: 'flex',
//       gap: '20px',
//     },
//     link: {
//       textDecoration: 'none',
//       color: '#fff',
//       fontWeight: '500',
//       transition: 'color 0.3s ease',
//     },
//     linkHover: {
//       color: '#ffe600',
//     },
//   };

// export default Header ;

// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('username');
      setIsLoggedIn(!!token);
      setUsername(user);
    };

    checkAuth();
    
    // Listen for storage changes (e.g., when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    setIsLoggedIn(false);
    setUsername(null);
    navigate('/login');
  };

  return (
    <nav style={{ ...styles.navbar, backgroundColor: darkMode ? '#1a2025' : '#00f2fe' }}>
      <div style={styles.logo}>MyApp</div>
      <div style={styles.navLinks}>
        <a href="/" style={styles.link}>Home</a>
        <a href="/about" style={styles.link}>About</a>
        <a href="/profile" style={styles.link}>Profile</a>
        {isLoggedIn ? (
          <>
            <span style={styles.welcome}>Welcome, {username}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <a href="/login" style={styles.link}>Login</a>
        )}
      </div>
      <button onClick={toggleTheme} style={styles.toggle}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: '500',
  },
  toggle: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  welcome: {
    color: '#ffe600',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  logoutButton: {
    background: '#ff6f61',
    border: 'none',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background 0.3s',
  },
};

export default Header;
