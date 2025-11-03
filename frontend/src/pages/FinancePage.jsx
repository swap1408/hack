import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const FinancePage = () => {
  const [view, setView] = useState('Monthly');
  const [department, setDepartment] = useState('All');
  const [category, setCategory] = useState('All');

  const budgetData = {
    Monthly: {
      labels: ['HR', 'Tech', 'Sales', 'Ops'],
      data: [5000, 8000, 7000, 6000],
    },
    Quarterly: {
      labels: ['HR', 'Tech', 'Sales', 'Ops'],
      data: [15000, 24000, 21000, 18000],
    },
  };

  const expenseData = {
    Monthly: {
      labels: ['HR', 'Tech', 'Sales', 'Ops'],
      data: [4200, 7500, 6800, 5900],
    },
    Quarterly: {
      labels: ['HR', 'Tech', 'Sales', 'Ops'],
      data: [13000, 23000, 20000, 17000],
    },
  };

  const chartData = (title, dataSet) => ({
    labels: budgetData[view].labels,
    datasets: [
      {
        label: title,
        data: dataSet[view].data,
        backgroundColor: '#4caf50',
      },
    ],
  });

  return (
    <div style={styles.container}>
      <div style={styles.badge}>Finance</div>
      <h2 style={styles.heading}>Finance Dashboard</h2>
      <p style={styles.description}>
        Welcome to the Finance section. Monitor budgets, payroll, expenses, and financial performance across departments.
      </p>

      <div style={styles.tabBar}>
        {['Monthly', 'Quarterly'].map((tab) => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            style={view === tab ? styles.activeTab : styles.tab}
          >
            {tab}
          </button>
        ))}
        <select value={department} onChange={(e) => setDepartment(e.target.value)} style={styles.filter}>
          {['All', 'HR', 'Tech', 'Sales', 'Ops'].map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.filter}>
          {['All', 'Travel', 'Supplies', 'Salaries'].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Budget Overview ({view})</h3>
        <div style={styles.chartBox}>
          <Bar data={chartData('Budget', budgetData)} />
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Expense Tracking ({view})</h3>
        <div style={styles.chartBox}>
          <Bar data={chartData('Expenses', expenseData)} />
        </div>
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
    background: 'linear-gradient(to bottom right, #f0fff0, #d0f0e0)',
    boxShadow: 'inset 0 0 60px rgba(0,0,0,0.05)',
    color: '#333',
  },
  badge: {
    backgroundColor: '#4caf50',
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
  tabBar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    alignItems: 'center',
  },
  tab: {
    padding: '10px 16px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  activeTab: {
    padding: '10px 16px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
  filter: {
    marginLeft: 'auto',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  section: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '1.4rem',
    marginBottom: '12px',
    color: '#4caf50',
  },
  chartBox: {
    maxWidth: '500px',
    margin: '0 auto',
  },
};

export default FinancePage;
