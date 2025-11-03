import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ToggleButton = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} style={{
      padding: '10px 16px',
      borderRadius: '6px',
      backgroundColor: darkMode ? '#333' : '#ccc',
      color: darkMode ? '#fff' : '#000',
      border: 'none',
      cursor: 'pointer'
    }}>
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ToggleButton;
