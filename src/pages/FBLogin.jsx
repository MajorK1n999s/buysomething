import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';

import "./FBLogin.css";

function FBLogin({ setUser }) {
  const navigate = useNavigate();
  
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State for loading, main error, and field-specific errors
  const [loading, setLoading] = useState(false);
  const [mainError, setMainError] = useState('');
  const [errors, setErrors] = useState({});

  // Updates state when user types and clears specific field error
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    setMainError('');
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@(gmail|email)\.com$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid @gmail.com or @email.com address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Run validations before hitting Firebase
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // 1. Verify credentials with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;

      // 2. Fetch the extra user details from Firestore Database
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let userData = {
        uid: user.uid,
        email: user.email,
      };

      // If we found their extra data in the database, merge it in
      if (userDocSnap.exists()) {
        userData = { ...userData, ...userDocSnap.data() };
      }

      // 3. Update the App state and LocalStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      if (setUser) setUser(userData);

      // 4. Send them back to the Home page
      navigate('/');
      
    } catch (err) {
      console.error("Login error:", err);
      // Clean up Firebase error messages for the user
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setMainError('Invalid email or password. Please try again.');
      } else {
        setMainError(err.message.replace('Firebase: ', '')); 
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p>Log in to your Buy SomeThing account</p>

        {mainError && <div className="form-error-message">{mainError}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="signup-link">
             Don't have an account? <Link to="/register">Create one here</Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FBLogin;