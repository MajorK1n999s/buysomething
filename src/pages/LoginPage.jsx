import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validations } from '../utils/validations';
import FBSignUp from './FBSignUp';
import './LoginPage.css';

function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // At least one of username or email is required
    if (!formData.username && !formData.email) {
      newErrors.form = 'Please enter username or email';
    }

    // If username is provided, validate it's not empty
    if (formData.username && formData.username.trim() === '') {
      newErrors.username = 'Username cannot be empty';
    }

    // If email is provided, validate it
    if (formData.email && formData.email.trim() !== '') {
      const emailValidation = validations.email(formData.email);
      if (!emailValidation.valid) newErrors.email = emailValidation.error;
    }

    // Password is required
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      let user = null;
      let errorMessage = '';

      // Logic: 
      // 1. If both username and email provided, find user matching both
      // 2. If only username provided, find user by username
      // 3. If only email provided, find user by email
      
      if (formData.username && formData.email) {
        // Both provided - must match same user
        user = users.find(
          u => (u.username === formData.username || u.email === formData.email) &&
               u.password === formData.password
        );
        errorMessage = 'Invalid username/email or password';
      } else if (formData.username) {
        // Only username provided - strict check
        user = users.find(
          u => u.username === formData.username && u.password === formData.password
        );
        errorMessage = 'Invalid username or password';
      } else if (formData.email) {
        // Only email provided - strict check
        user = users.find(
          u => u.email === formData.email && u.password === formData.password
        );
        errorMessage = 'Invalid email or password';
      }

      if (!user) {
        setErrors({
          username: formData.username ? 'Invalid username' : '',
          email: formData.email && !formData.username ? 'Invalid email' : '',
          password: 'Invalid credentials'
        });
        setLoading(false);
        return;
      }

      // Login successful
      localStorage.setItem('currentUser', JSON.stringify(user));
      setUser(user);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ form: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    // Auto-hide after 3 seconds
    if (!showPassword) {
      setTimeout(() => setShowPassword(false), 3000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <p>Log in to your account</p>

        {errors.form && <div className="form-error-message">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Input */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Email Input */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password Input */}
          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={errors.password ? 'input-error' : ''}
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={togglePasswordVisibility}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Register Link */}
          <div className="register-link">
            Don't have an account? <a href="/FBSignUp">Create one now</a>
          </div>
        </form>
      </div>
    </div>
  );
}


export default LoginPage;
