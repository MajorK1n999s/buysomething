import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validations } from '../utils/validations';
import './ProfilePage.css';

function ProfilePage({ user, setUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.photo || user?.image || null);
  // Extract country code and mobile number from stored mobile
  const extractMobileParts = (mobile) => {
    if (!mobile) return { countryCode: '+91', mobile: '' };
    // If mobile starts with +, extract country code
    if (mobile.startsWith('+')) {
      const match = mobile.match(/^(\+\d{1,3})(\d{10})$/);
      if (match) {
        return { countryCode: match[1], mobile: match[2] };
      }
    }
    // If mobile is 10 digits, use default country code
    if (/^\d{10}$/.test(mobile)) {
      return { countryCode: '+91', mobile: mobile };
    }
    // Otherwise, try to extract last 10 digits
    const digits = mobile.replace(/\D/g, '');
    if (digits.length >= 10) {
      return { countryCode: '+91', mobile: digits.slice(-10) };
    }
    return { countryCode: '+91', mobile: mobile };
  };

  const mobileParts = extractMobileParts(user?.mobile);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || user?.name || '',
    email: user?.email || '',
    countryCode: user?.countryCode || mobileParts.countryCode,
    mobile: mobileParts.mobile,
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    country: user?.country || '',
    pincode: user?.pincode || '',
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // upload to backend
      const form = new FormData();
      form.append('image', file);
      // include user id when available
      if (user?.id) form.append('userId', user.id);
      setUploading(true);
      fetch('http://localhost:5000/api/auth/upload-profile', {
        method: 'POST', body: form
      })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            const url = data.path; // path is /uploads/filename
            setProfileImage(window.location.origin + url);
          } else {
            alert('Upload failed');
          }
        })
        .catch(err => { console.error(err); alert('Upload failed'); })
        .finally(() => setUploading(false));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const nameValidation = validations.fullName(formData.fullName);
    if (!nameValidation.valid) newErrors.fullName = nameValidation.error;

    const emailValidation = validations.email(formData.email);
    if (!emailValidation.valid) newErrors.email = emailValidation.error;

    const mobileValidation = validations.mobile(formData.mobile);
    if (!mobileValidation.valid) newErrors.mobile = mobileValidation.error;

    const addressValidation = validations.address(formData.address);
    if (!addressValidation.valid) newErrors.address = addressValidation.error;

    const cityValidation = validations.city(formData.city);
    if (!cityValidation.valid) newErrors.city = cityValidation.error;

    const stateValidation = validations.state(formData.state);
    if (!stateValidation.valid) newErrors.state = stateValidation.error;

    const countryValidation = validations.country(formData.country);
    if (!countryValidation.valid) newErrors.country = countryValidation.error;

    const pincodeValidation = validations.pincode(formData.pincode);
    if (!pincodeValidation.valid) newErrors.pincode = pincodeValidation.error;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    if (!validateForm()) {
      return;
    }

    const updatedUser = {
      ...user,
      ...formData,
      photo: profileImage,
      mobile: formData.countryCode + formData.mobile,
    };

    // Update current user session
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update user in the permanent users database
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...updatedUser } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
    alert('Logged out successfully');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Remove user from localStorage users database
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.filter(u => u.id !== user.id);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Clear current user session
      localStorage.removeItem('currentUser');
      setUser(null);
      navigate('/login');
      alert('Account deleted successfully. You cannot login again with this account.');
    }
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="login-container">
          <h2>Welcome!</h2>
          <p>Please log in to view your profile and settings.</p>
          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', marginTop: '2rem' }}>
            <button 
              className="login-btn" 
              onClick={() => navigate('/login')}
              style={{ padding: '0.75rem', fontSize: '1rem' }}
            >
              Login
            </button>
            <button 
              className="login-btn" 
              onClick={() => navigate('/register')}
              style={{ padding: '0.75rem', fontSize: '1rem', backgroundColor: '#667eea' }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button
            className="logout-btn-header"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-image-section">
            <div className="profile-image-container">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-image-placeholder">👤</div>
              )}
            </div>
            {isEditing && (
              <label className="image-upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <span className="upload-text">Change Photo</span>
              </label>
            )}
          </div>

          <div className="profile-info">
            {isEditing ? (
              <form className="edit-form">
                <div className="form-group">
                  <label>Username (Read-only)</label>
                  <input
                    type="text"
                    value={user.username || ''}
                    disabled
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={errors.fullName ? 'input-error' : ''}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Mobile</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '100px'
                      }}
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+61">+61</option>
                      <option value="+86">+86</option>
                      <option value="+81">+81</option>
                    </select>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className={errors.mobile ? 'input-error' : ''}
                      style={{ flex: 1 }}
                    />
                  </div>
                  {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'input-error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'input-error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={errors.state ? 'input-error' : ''}
                    />
                    {errors.state && <span className="error-message">{errors.state}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={errors.country ? 'input-error' : ''}
                    />
                    {errors.country && <span className="error-message">{errors.country}</span>}
                  </div>

                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={errors.pincode ? 'input-error' : ''}
                    />
                    {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="save-btn"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                <div className="detail-item">
                  <span className="label">Username:</span>
                  <span className="value">{user.username}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Full Name:</span>
                  <span className="value">{user.fullName || user.name || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </div>
                {user.mobile && (
                  <div className="detail-item">
                    <span className="label">Mobile:</span>
                    <span className="value">
                      {(() => {
                        const mobile = user.mobile;
                        const digits = mobile.replace(/\D/g, '');
                        const code = user.countryCode || (mobile.match(/^\+(\d{1,3})/) ? '+' + mobile.match(/^\+(\d{1,3})/)[1] : '+91');
                        const number = digits.length >= 10 ? digits.slice(-10) : digits;
                        return `${code} ${number}`;
                      })()}
                    </span>
                  </div>
                )}
                {user.phone && (
                  <div className="detail-item">
                    <span className="label">Phone:</span>
                    <span className="value">{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="detail-item">
                    <span className="label">Address:</span>
                    <span className="value">{user.address}</span>
                  </div>
                )}
                {user.city && (
                  <div className="detail-item">
                    <span className="label">City:</span>
                    <span className="value">{user.city}</span>
                  </div>
                )}
                {user.state && (
                  <div className="detail-item">
                    <span className="label">State:</span>
                    <span className="value">{user.state}</span>
                  </div>
                )}
                {user.country && (
                  <div className="detail-item">
                    <span className="label">Country:</span>
                    <span className="value">{user.country}</span>
                  </div>
                )}
                {user.pincode && (
                  <div className="detail-item">
                    <span className="label">Pincode:</span>
                    <span className="value">{user.pincode}</span>
                  </div>
                )}

                <div className="profile-actions">
                  <button
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="danger-zone">
          <h3>Danger Zone</h3>
          <button
            className="delete-account-btn"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
