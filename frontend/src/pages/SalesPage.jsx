// import React, { useState } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

// const SalesPage = () => {
//   const [region, setRegion] = useState('North');
//   const [product, setProduct] = useState('Alpha');
//   const [team, setTeam] = useState('Team A');

//   const revenueData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//     datasets: [
//       {
//         label: `Revenue (${region}, ${product}, ${team})`,
//         data: [12000, 15000, 18000, 17000, 20000],
//         backgroundColor: '#ff9800',
//       },
//     ],
//   };

//   const targetData = {
//     labels: ['Q1', 'Q2', 'Q3', 'Q4'],
//     datasets: [
//       {
//         label: `Sales Targets (${region}, ${product}, ${team})`,
//         data: [30000, 35000, 40000, 45000],
//         borderColor: '#ff9800',
//         backgroundColor: 'rgba(255,152,0,0.2)',
//         fill: true,
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.badge}>Sales</div>
//       <h2 style={styles.heading}>Sales Dashboard</h2>
//       <p style={styles.description}>
//         Welcome to the Sales section. Track leads, conversions, targets, and performance metrics. Empower your sales team with actionable insights and real-time data.
//       </p>

//       <div style={styles.filters}>
//         <select value={region} onChange={(e) => setRegion(e.target.value)} style={styles.select}>
//           {['North', 'South', 'East', 'West'].map((r) => (
//             <option key={r} value={r}>{r}</option>
//           ))}
//         </select>
//         <select value={product} onChange={(e) => setProduct(e.target.value)} style={styles.select}>
//           {['Alpha', 'Beta', 'Gamma'].map((p) => (
//             <option key={p} value={p}>{p}</option>
//           ))}
//         </select>
//         <select value={team} onChange={(e) => setTeam(e.target.value)} style={styles.select}>
//           {['Team A', 'Team B', 'Team C'].map((t) => (
//             <option key={t} value={t}>{t}</option>
//           ))}
//         </select>
//       </div>

//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Monthly Revenue</h3>
//         <Bar data={revenueData} />
//       </div>

//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Quarterly Sales Targets</h3>
//         <Line data={targetData} />
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     marginLeft: '220px',
//     padding: '40px',
//     paddingTop: '100px',
//     paddingBottom: '150px',
//     fontFamily: 'Arial, sans-serif',
//     minHeight: 'calc(100vh - 140px)',
//     background: 'linear-gradient(to bottom right, #fff8e1, #ffe0b2)',
//     boxShadow: 'inset 0 0 60px rgba(0,0,0,0.05)',
//     color: '#333',
//   },
//   badge: {
//     backgroundColor: '#ff9800',
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
//   filters: {
//     display: 'flex',
//     gap: '16px',
//     marginBottom: '32px',
//   },
//   select: {
//     padding: '10px',
//     borderRadius: '6px',
//     border: '1px solid #ccc',
//     fontSize: '1rem',
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
//     color: '#ff9800',
//   },
// };

// export default SalesPage;

import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

const SalesPage = () => {
  const [region, setRegion] = useState('North');
  const [product, setProduct] = useState('Alpha');
  const [team, setTeam] = useState('Team A');

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: `Revenue (${region}, ${product}, ${team})`,
        data: [12000, 15000, 18000, 17000, 20000],
        backgroundColor: '#ff9800',
      },
    ],
  };

  const targetData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: `Sales Targets (${region}, ${product}, ${team})`,
        data: [30000, 35000, 40000, 45000],
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255,152,0,0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <div style={styles.badge}>Sales</div>
      <h2 style={styles.heading}>Sales Dashboard</h2>
      <p style={styles.description}>
        Welcome to the Sales section. Track leads, conversions, targets, and performance metrics. Empower your sales team with actionable insights and real-time data.
      </p>

      <div style={styles.filters}>
        <select value={region} onChange={(e) => setRegion(e.target.value)} style={styles.select}>
          {['North', 'South', 'East', 'West'].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <select value={product} onChange={(e) => setProduct(e.target.value)} style={styles.select}>
          {['Alpha', 'Beta', 'Gamma'].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select value={team} onChange={(e) => setTeam(e.target.value)} style={styles.select}>
          {['Team A', 'Team B', 'Team C'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Monthly Revenue</h3>
        <div style={styles.chartBox}>
          <Bar data={revenueData} />
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Quarterly Sales Targets</h3>
        <div style={styles.chartBox}>
          <Line data={targetData} />
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
    background: 'linear-gradient(to bottom right, #fff8e1, #ffe0b2)',
    boxShadow: 'inset 0 0 60px rgba(0,0,0,0.05)',
    color: '#333',
  },
  badge: {
    backgroundColor: '#ff9800',
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
  filters: {
    display: 'flex',
    gap: '16px',
    marginBottom: '32px',
  },
  select: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
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
    color: '#ff9800',
  },
  chartBox: {
    maxWidth: '500px',
    margin: '0 auto',
  },
};

export default SalesPage;
