import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';

import "./FBSignUp.css";

function FBSignUp({ setUser }) {
  const navigate = useNavigate();
  
  // State to hold all form inputs
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{5,6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 5-6 digits';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@(gmail|email)\.com$/.test(formData.email)) {
      newErrors.email = 'Only @gmail.com or @email.com addresses allowed';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Run validations before hitting Firebase
    if (!validateForm()) {
      setMainError('Please fix the errors below before submitting.');
      return;
    }

    try {
      setLoading(true);

      // 1. Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;

      // 2. Save all extra user details into Firestore Database
      const userData = {
        uid: user.uid,
        username: formData.username,
        fullName: formData.fullName,
        mobile: formData.mobile,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        email: formData.email,
        createdAt: new Date(),
        modifiedAt: null, // <-- Added this exactly as you requested!
        photoURL: null        // <-- Added this for your future image URL!
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      // 3. Update the App state and LocalStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      if (setUser) setUser(userData);

      // 4. Send them back to the Home page using React Router
      navigate('/');
      
    } catch (err) {
      console.error("Sign up error:", err);
      setMainError(err.message.replace('Firebase: ', '')); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create Account</h2>
        <p>Join Buy SomeThing today!</p>

        {mainError && <div className="form-error-message">{mainError}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Choose a username"
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="field-error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="10-digit mobile number"
              className={errors.mobile ? 'input-error' : ''}
            />
            {errors.mobile && <span className="field-error">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street address"
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>

          <div className="form-group row-group">
            <div className="half-width">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className={errors.city ? 'input-error' : ''}
              />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>
            
            <div className="half-width">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className={errors.state ? 'input-error' : ''}
              />
              {errors.state && <span className="field-error">{errors.state}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="5 or 6 digit code"
              className={errors.pincode ? 'input-error' : ''}
            />
            {errors.pincode && <span className="field-error">{errors.pincode}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="text" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your @gmail.com email"
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
              placeholder="Create a password (min 6 characters)"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Type your password again"
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="login-link">
             {/* Using Link instead of <a> fixes the navigation issue */}
             Already have an account? <Link to="/login">Log in here</Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FBSignUp;