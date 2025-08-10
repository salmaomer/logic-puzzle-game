import React, { useState, useEffect } from 'react';
import { loginUser, verifyToken } from '../services/authService.js';
import { useNavigate } from 'react-router-dom';
import Navigate from './Navigate.jsx';
import './css/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const result = await verifyToken(token);
          if (result.valid) {
            setIsLoggedIn(true);
            setMessage('You are already logged in!');
          } else {
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error('Token verification failed:', err);
          localStorage.removeItem('token');
        }
      }
    };
    checkToken();
  }, []);

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
    const result = await loginUser(formData);
    console.log("Login API Response:", result); 

    const token = result.token || result.jwt || result.accessToken;

    if (result.success && token) {
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      setMessage(result.message || 'Login successful!');
        setTimeout(() => {
          navigate('/Home');
        }, 500);

    } else {
      setError(result.message || 'Invalid email or password.');
    }
  } catch (err) {
    setError('Server error. Please try again later.');
  }
};

  return (
    <>
      <Navigate to="/" />

      <div className="login-page">
        <div className="login-left">
          <img
            src="/images/LoginImage.png" 
            alt="Login Illustration"
            className="login-image"
          />
        </div>

        <div className="login-right">
          <h2 className="login-title">Welcome Back</h2>
          <div className="login-card">
            <form onSubmit={handleSubmit}>
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
              <button type="submit">Login</button>
            </form>

            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
