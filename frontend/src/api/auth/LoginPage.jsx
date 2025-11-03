import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🌐 Dynamically detect backend URL
      const backendUrl =
        window.location.hostname === "localhost"
          ? "//api/auth/login"
          : `http://${window.location.hostname}:8080/api/auth/login`;

      const response = await axios.post(backendUrl, credentials, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login Response:", response.data);

      // Handle response - check if it's an object or string
      let token, roles, username;

      if (typeof response.data === "object" && response.data.token) {
        token = response.data.token;
        roles = response.data.roles || [];
        username = response.data.username || credentials.username;
      } else if (typeof response.data === "string") {
        token = response.data;
        roles = [];
        username = credentials.username;
      }

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("roles", JSON.stringify(roles));

        // Trigger storage event to update Header
        window.dispatchEvent(new Event("storage"));

        alert("✅ Login Successful!");
        navigate("/hr"); // Redirect after login
      } else {
        setError("⚠️ No token received from server.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "❌ Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      <p style={styles.switchText}>
        Don’t have an account?
        <Link to="/signup" style={styles.link}>
          Sign up here
        </Link>
      </p>
    </div>
  );
};

// 🎨 Styles
const styles = {
  container: {
    marginTop: "200px",
    padding: "40px",
    maxWidth: "400px",
    margin: "auto",
    background: "linear-gradient(to right, #1a2025ff, #00f2fe)",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    fontSize: "1rem",
  },
  button: {
    padding: "12px",
    backgroundColor: "#ffe600",
    color: "#000",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  switchText: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#fff",
  },
  link: {
    color: "#ffe600",
    textDecoration: "underline",
    marginLeft: "4px",
  },
  error: {
    color: "#ff4d4d",
    textAlign: "center",
    marginTop: "10px",
    fontSize: "0.9rem",
  },
};

export default Login;

