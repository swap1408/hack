import React, { useState } from 'react';

const OperationsPage = () => {
  const [role, setRole] = useState('Manager');

  const tasks = {
    Manager: [
      { title: 'Approve vendor contract', status: 'To Do' },
      { title: 'Review logistics report', status: 'In Progress' },
      { title: 'Finalize Q4 strategy', status: 'Done' },
    ],
    Coordinator: [
      { title: 'Schedule delivery', status: 'To Do' },
      { title: 'Update inventory sheet', status: 'In Progress' },
      { title: 'Confirm shipment arrival', status: 'Done' },
    ],
    Analyst: [
      { title: 'Analyze workflow efficiency', status: 'To Do' },
      { title: 'Generate cost report', status: 'In Progress' },
      { title: 'Submit optimization proposal', status: 'Done' },
    ],
  };

  const statusColors = {
    'To Do': '#90caf9',
    'In Progress': '#42a5f5',
    'Done': '#1e88e5',
  };

  const renderColumn = (status) => {
    return (
      <div style={styles.column}>
        <h3 style={{ ...styles.columnTitle, backgroundColor: statusColors[status] }}>{status}</h3>
        {tasks[role].filter(task => task.status === status).map((task, index) => (
          <div key={index} style={styles.card}>
            <span style={{ ...styles.statusDot, backgroundColor: statusColors[status] }}></span>
            <p>{task.title}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.badge}>Operations</div>
      <h2 style={styles.heading}>Operations Dashboard</h2>
      <p style={styles.description}>
        Welcome to the Operations section. Oversee logistics, workflows, and process optimization. Monitor daily operations and ensure smooth execution across departments.
      </p>

      <div style={styles.filterBar}>
        <label style={styles.label}>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.select}>
          {['Manager', 'Coordinator', 'Analyst'].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div style={styles.kanban}>
        {['To Do', 'In Progress', 'Done'].map(status => renderColumn(status))}
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
    minHeight: 'calc(100vh - 140px)',
    background: 'linear-gradient(to bottom right, #f0f8ff, #dbe9f4)',
    boxShadow: 'inset 0 0 60px rgba(0,0,0,0.05)',
    color: '#333',
  },
  badge: {
    backgroundColor: '#2196f3',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '8px',
    fontWeight: 'bold',
    display: 'inline-block',
    marginBottom: '24px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '2.2rem',
    marginBottom: '16px',
    fontWeight: 'bold',
    color: '#1a2025',
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    maxWidth: '700px',
  },
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
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
  kanban: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  columnTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    padding: '10px',
    borderRadius: '8px',
    color: '#fff',
    marginBottom: '12px',
  },
  card: {
    backgroundColor: '#e3f2fd',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '10px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    position: 'relative',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    position: 'absolute',
    top: '12px',
    left: '12px',
  },
};

export default OperationsPage;
