import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Import Firebase tools
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './FBSignUp.css';

function FBSignUp({ setUser }) {
  const navigate = useNavigate();
  
  // State to hold all our form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State for loading button and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Updates state when user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // 1. Simple Validation check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return; // Stop the function here
    }

    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);

      // 2. Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;

      // 3. Save extra user details (like Full Name) into Firestore Database
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        createdAt: new Date()
      });

      // 4. Update the App state (so Navbar shows their name)
      const userData = {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      if (setUser) setUser(userData);

      // 5. Send them back to the Home page
      navigate('/');
      
    } catch (err) {
      console.error("Sign up error:", err);
      // Show Firebase's error message to the user cleanly
      setError(err.message.replace('Firebase: ', '')); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create Account</h2>
        <p>Join Buy SomeThing today!</p>

        {/* Show error box if there is an error */}
        {error && <div className="form-error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password (min 6 characters)"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Type your password again"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="login-link">
            Already have an account? <Link to="/login">Log in here</Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FBSignUp;