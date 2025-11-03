// import React from 'react';

// const AnalyticsPage = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.badge}>Analytics</div>
//       <h2 style={styles.heading}>Analytics Dashboard</h2>
//       <p style={styles.description}>
//         Welcome to the Analytics section. Explore data visualizations, KPIs, and performance trends to drive smarter decisions across departments.
//       </p>

//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Key Performance Indicators</h3>
//         <p style={styles.sectionText}>
//           Monitor real-time KPIs like user engagement, retention, and conversion rates across business units.
//         </p>
//       </div>

//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Trend Analysis</h3>
//         <p style={styles.sectionText}>
//           Identify patterns in customer behavior, sales cycles, and operational efficiency using historical data.
//         </p>
//       </div>

//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Data Visualization</h3>
//         <p style={styles.sectionText}>
//           Use interactive charts and dashboards to present insights clearly and support strategic planning.
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     marginLeft: '220px',
//     padding: '40px',
//     paddingTop: '100px',
//     fontFamily: 'Arial, sans-serif',
//     minHeight: 'calc(100vh - 140px)',
//     background: 'linear-gradient(to bottom right, #f3e5f5, #ede7f6)',
//     boxShadow: 'inset 0 0 60px rgba(0,0,0,0.05)',
//     color: '#333',
//   },
//   badge: {
//     backgroundColor: '#9c27b0',
//     color: '#fff',
//     padding: '10px 18px',
//     borderRadius: '8px',
//     fontWeight: 'bold',
//     display: 'inline-block',
//     marginBottom: '24px',
//     boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//   },
//   heading: {
//     fontSize: '2.2rem',
//     marginBottom: '16px',
//     fontWeight: 'bold',
//     color: '#1a2025',
//   },
//   description: {
//     fontSize: '1.1rem',
//     lineHeight: '1.6',
//     maxWidth: '700px',
//   },
//   section: {
//     marginTop: '40px',
//     padding: '20px',
//     backgroundColor: '#fff',
//     borderRadius: '12px',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   },
//   sectionTitle: {
//     fontSize: '1.4rem',
//     marginBottom: '12px',
//     color: '#9c27b0',
//   },
//   sectionText: {
//     fontSize: '1rem',
//     color: '#555',
//   },
// };

// export default AnalyticsPage;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsPage = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 15000, 18000],
        backgroundColor: '#ff9800',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Revenue' },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Analytics Dashboard</h1>
      <div style={styles.chartBox}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginLeft: '220px',
    padding: '40px',
    paddingTop: '100px',
    fontFamily: 'Arial, sans-serif',
    minHeight: 'calc(100vh - 140px)',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  chartBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '700px',
  },
};

export default AnalyticsPage;
