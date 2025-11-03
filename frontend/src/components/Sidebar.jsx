import React from 'react';

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>Roles</h3>
      <ul style={styles.list}>
        <li><a href="/hr" style={styles.link}>HR</a></li>
        <li><a href="/finance" style={styles.link}>Finance</a></li>
        <li><a href="/operations" style={styles.link}>Operations</a></li>
        <li><a href="/sales" style={styles.link}>Sales</a></li>
        <li><a href="/analytics" style={styles.link}>Analytics</a></li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    position: 'fixed',
    top: '30px', 
    left: 0,
    width: '200px',
    height: 'calc(100vh - 70px)',
    background: 'linear-gradient(to bottom, #1a2025ff, #00f2fe)',
    color: '#fff',
    padding: '20px',
    boxShadow: '2px 0 6px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    borderRight: '2px solid #fff'
   // zIndex: 999,
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '16px',
    fontWeight: 'bold',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    display: 'block',
    color: '#ffe600',
    textDecoration: 'none',
    marginBottom: '12px',
    fontWeight: '500',
  },
};

export default Sidebar;
