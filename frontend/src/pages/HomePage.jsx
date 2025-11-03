import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaMoneyBill, FaCogs, FaChartLine, FaChartPie } from 'react-icons/fa';
import { useNotifications } from '../hooks/useNotifications'; // ✅ WebSocket hook

const Home = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('Admin');
  const [recentActivity, setRecentActivity] = useState([]);

  const modules = [
    { title: 'HR', description: 'Manage employee records, onboarding, and leave requests.', color: '#ff6f61', path: '/hr', icon: <FaUserTie />, roles: ['Admin', 'HR'] },
    { title: 'Finance', description: 'Track budgets, payroll, and expenses across departments.', color: '#4caf50', path: '/finance', icon: <FaMoneyBill />, roles: ['Admin', 'Finance'] },
    { title: 'Operations', description: 'Oversee logistics, workflows, and process optimization.', color: '#2196f3', path: '/operations', icon: <FaCogs />, roles: ['Admin', 'Operations'] },
    { title: 'Sales', description: 'Monitor leads, targets, and revenue performance.', color: '#ff9800', path: '/sales', icon: <FaChartLine />, roles: ['Admin', 'Sales'] },
    { title: 'Analytics', description: 'Visualize KPIs, trends, and strategic insights.', color: '#9c27b0', path: '/analytics', icon: <FaChartPie />, roles: ['Admin', 'Analyst'] },
  ];

  useEffect(() => {
    // Initial static activity
    setRecentActivity([
      'Priya Desai submitted leave request',
      'Finance team updated Q3 budget',
      'Sales closed deal with Acme Corp',
    ]);
  }, []);

  // ✅ Live WebSocket notifications
  useNotifications((msg) => {
    setRecentActivity(prev => [msg, ...prev]);
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to MyApp Portal</h1>
      <p style={styles.subheading}>Choose a module to begin</p>

      <div style={styles.roleBar}>
        <label style={styles.label}>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.select}>
          {['Admin', 'HR', 'Finance', 'Operations', 'Sales', 'Analyst'].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div style={styles.grid}>
        {modules
          .filter(mod => mod.roles.includes(role))
          .map((mod, index) => (
            <div
              key={index}
              style={{ ...styles.card, borderLeft: `8px solid ${mod.color}` }}
              onClick={() => navigate(mod.path)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{ ...styles.icon, color: mod.color }}>{mod.icon}</div>
              <h2 style={{ ...styles.cardTitle, color: mod.color }}>{mod.title}</h2>
              <p style={styles.cardText}>{mod.description}</p>
              <button style={{ ...styles.button, backgroundColor: mod.color }}>Go to {mod.title}</button>
            </div>
          ))}
      </div>

      <div style={styles.activitySection}>
        <h3 style={styles.activityTitle}>Recent Activity</h3>
        <ul style={styles.activityList}>
          {recentActivity.map((item, i) => (
            <li key={i} style={styles.activityItem}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginLeft: '220px',
    padding: '40px',
    paddingTop: '100px',
    paddingBottom: '150px',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(to bottom right, #e0f7fa, #f0f8ff)',
    minHeight: 'calc(100vh - 140px)',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    color: '#1a2025',
  },
  subheading: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#555',
  },
  roleBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '30px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  select: {
    padding: '8px',
    borderRadius: '6px',
    fontSize: '1rem',
    border: '1px solid #ccc',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '260px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  icon: {
    fontSize: '1.8rem',
    marginBottom: '10px',
  },
  cardTitle: {
    fontSize: '1.6rem',
    marginBottom: '12px',
  },
  cardText: {
    fontSize: '1rem',
    marginBottom: '16px',
    color: '#333',
  },
  button: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  activitySection: {
    marginTop: '40px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '600px',
  },
  activityTitle: {
    fontSize: '1.4rem',
    marginBottom: '12px',
    color: '#1a2025',
  },
  activityList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  activityItem: {
    fontSize: '1rem',
    padding: '6px 0',
    borderBottom: '1px solid #eee',
  },
};

export default Home;
