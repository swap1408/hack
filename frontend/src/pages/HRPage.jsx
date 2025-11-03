import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HRPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    roles: [],
  });

  // Runtime API base (empty = same origin). This allows nginx proxy or same-origin calls.
  const API_BASE = (window && window.__API_BASE__) ? window.__API_BASE__.replace(/\/$/, '') : '';

  // Check if current user is admin
  const isAdmin = () => {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles.includes('ROLE_ADMIN');
  };

  // Fetch employees from backend
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = `${API_BASE || ''}/api/employee`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setEmployees(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch employees');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new employee
  const addEmployee = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${API_BASE || ''}/api/employee`;
      const response = await axios.post(url, currentEmployee, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Refresh from backend to reflect DB state
      await fetchEmployees();
      resetForm();
      alert('Employee added successfully!');
    } catch (err) {
      alert('Failed to add employee');
      console.error('Add error:', err);
    }
  };

  // Update employee
  const updateEmployee = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${API_BASE || ''}/api/employee/${currentEmployee.id}`;
      const response = await axios.put(
        url,
        currentEmployee,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // Refresh list from backend
      await fetchEmployees();
      resetForm();
      alert('Employee updated successfully!');
    } catch (err) {
      alert('Failed to update employee');
      console.error('Update error:', err);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const url = `${API_BASE || ''}/api/employee/${id}`;
      await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // Refresh list from backend
      await fetchEmployees();
      alert('Employee deleted successfully!');
    } catch (err) {
      alert('Failed to delete employee');
      console.error('Delete error:', err);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateEmployee();
    } else {
      addEmployee();
    }
  };

  // Reset form and close modal
  const resetForm = () => {
    setCurrentEmployee({
      id: '',
      name: '',
      email: '',
      password: '',
      roles: [],
    });
    setShowModal(false);
    setEditMode(false);
  };

  // Open modal for adding
  const openAddModal = () => {
    setEditMode(false);
    setCurrentEmployee({
      id: '',
      name: '',
      email: '',
      password: '',
      roles: [],
    });
    setShowModal(true);
  };

  // Open modal for editing
  const openEditModal = (employee) => {
    setEditMode(true);
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roles') {
      // Split comma-separated roles into array
      setCurrentEmployee({
        ...currentEmployee,
        roles: value.split(',').map(role => role.trim()).filter(role => role),
      });
    } else {
      setCurrentEmployee({
        ...currentEmployee,
        [name]: value,
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={styles.badge}>HR</div>
          <h2 style={styles.heading}>Employee Management</h2>
          <p style={styles.description}>
            Manage employee records, add new employees, update information, and remove employees.
          </p>
        </div>
        <div style={styles.buttonGroup}>
          <button style={styles.viewAllButton} onClick={fetchEmployees}>
            🔄 View All Employees
          </button>
          {isAdmin() && (
            <button style={styles.addButton} onClick={openAddModal}>
              + Add Employee
            </button>
          )}
        </div>
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {loading && <p style={styles.loading}>Loading employees...</p>}

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Roles</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 && !loading ? (
              <tr>
                <td colSpan="4" style={styles.noData}>No employees found</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} style={styles.tr}>
                  <td style={styles.td}>{emp.name}</td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>
                    {Array.isArray(emp.roles) ? emp.roles.join(', ') : emp.roles}
                  </td>
                  <td style={styles.td}>
                    {isAdmin() && (
                      <>
                        <button
                          style={styles.editButton}
                          onClick={() => openEditModal(emp)}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => deleteEmployee(emp.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {!isAdmin() && <span style={{color: '#999'}}>View Only</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Employee */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalHeading}>
              {editMode ? 'Edit Employee' : 'Add New Employee'}
            </h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={currentEmployee.name}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={currentEmployee.email}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={currentEmployee.password}
                onChange={handleInputChange}
                style={styles.input}
                required={!editMode}
              />
              <input
                type="text"
                name="roles"
                placeholder="Roles (comma-separated, e.g. ROLE_USER, ROLE_ADMIN)"
                value={Array.isArray(currentEmployee.roles) ? currentEmployee.roles.join(', ') : currentEmployee.roles}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <div style={styles.modalActions}>
                <button type="submit" style={styles.submitButton}>
                  {editMode ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    background: 'linear-gradient(to bottom right, #fdfcfb, #e2d1c3)',
    boxShadow: 'inset 0 0 60px rgba(0,0,0,0.05)',
    color: '#333',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
  badge: {
    backgroundColor: '#ff6f61',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '8px',
    fontWeight: 'bold',
    display: 'inline-block',
    marginBottom: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '2.2rem',
    marginBottom: '12px',
    fontWeight: 'bold',
    color: '#1a2025',
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.6',
    maxWidth: '600px',
    color: '#555',
  },
  addButton: {
    padding: '12px 24px',
    backgroundColor: '#ff6f61',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    transition: 'all 0.3s',
  },
  viewAllButton: {
    padding: '12px 24px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    transition: 'all 0.3s',
  },
  error: {
    color: '#d32f2f',
    backgroundColor: '#ffebee',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
  },
  loading: {
    color: '#555',
    fontSize: '1.1rem',
    textAlign: 'center',
    padding: '20px',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#ff6f61',
    color: '#fff',
    padding: '14px',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '0.95rem',
  },
  tr: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '14px',
    fontSize: '0.9rem',
    color: '#333',
  },
  noData: {
    textAlign: 'center',
    padding: '30px',
    color: '#999',
    fontSize: '1rem',
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '8px',
    fontSize: '0.85rem',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    width: '500px',
    maxWidth: '90%',
  },
  modalHeading: {
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#1a2025',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    outline: 'none',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '10px',
  },
  submitButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#ff6f61',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#999',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default HRPage;
