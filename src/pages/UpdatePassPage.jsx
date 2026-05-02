import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import './UpdatePassPage.css';

function UpdatePassPage({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setError("You must be logged in to change your password.");
        return;
      }

      // Step 1: Re-authenticate to prove identity
      const credential = EmailAuthProvider.credential(currentUser.email, passwords.currentPassword);
      await reauthenticateWithCredential(currentUser, credential);

      // Step 2: Update the password securely
      await updatePassword(currentUser, passwords.newPassword);

      setSuccess('Password updated successfully!');
      
      // Clear form
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });

      // Redirect back to profile after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);

    } catch (err) {
      console.error("Password update error:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Your current password was incorrect.');
      } else {
        setError('Failed to update password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Security check: if no user is passed down, don't show the form
  if (!user) {
    return (
      <div className="update-pass-page">
        <div className="update-pass-container">
          <h2>Access Denied</h2>
          <p>You must be logged in to view this page.</p>
          <button className="back-btn" onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="update-pass-page">
      <div className="update-pass-container">
        <h2>Set New Password</h2>
        <p>Update your account security credentials</p>

        {error && <div className="form-error-message">{error}</div>}
        {success && <div className="form-success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="update-pass-form">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter current password"
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleInputChange}
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
              placeholder="Type new password again"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn" disabled={loading || success}>
              {loading ? 'Updating...' : 'Update Password'}
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/profile')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassPage;