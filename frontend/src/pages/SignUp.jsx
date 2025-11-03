import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SignUp Data:', formData);
    // Add your signup logic here
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={styles.select}
          required
        >
          <option value="">Select Role</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
          <option value="Sales">Sales</option>
          <option value="Analytics">Analytics</option>
        </select>
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      <p style={styles.switchText}>
        Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
  marginTop: '350px', // ⬅️ Increased to push form below the fixed header
  padding: '40px',
  maxWidth: '400px',
  margin: 'auto',
  background: 'linear-gradient(to right, #1a2025ff, #00f2fe)',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  color: '#fff',
  fontFamily: 'Arial, sans-serif',
},
  heading: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '1rem',
  },
  select: {
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '1rem',
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    padding: '12px',
    backgroundColor: '#ffe600',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  switchText: {
    marginTop: '16px',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#fff',
  },
  link: {
    color: '#ffe600',
    textDecoration: 'underline',
    marginLeft: '4px',
  },
};

export default SignUp;
