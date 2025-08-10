import React, { useState } from 'react';
import { registerUser } from '../services/authService.js';
import Navigate from './Navigate.jsx';
import { Link } from 'react-router-dom'; // ✅ Import Link
import './css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const result = await registerUser(formData);
      console.log('Register API result:', result);

      if (result.success) {
        setMessage(result.message || 'Registration successful!');
        setFormData({ username: '', email: '', password: '' });
        
      } else {
        setError(result.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Registration error caught:', err);
      setError('Server error. Please try again later.');
    }
  }

  return (
    <>
      <Navigate to="/" />

      <div className="register-page">
        <div className="register-left">
          <h2 className="register-title">Create an Account</h2>
          <div className="register-card">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Register</button>
            </form>

            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}

            {/* ✅ Login Link */}
            <p className="login-link">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>

        <div className="register-right">
          <img
            src="/images/RegisterImage.png"
            alt="Register Illustration"
            className="register-image"
          />
        </div>
      </div>
    </>
  );
};

export default Register;
