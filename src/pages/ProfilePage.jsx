import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validations } from '../utils/validations'; 
import { db } from '../lib/firebase'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './ProfilePage.css';

function ProfilePage({ user, setUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [uploading, setUploading] = useState(false);

  // States for form and image
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData({
              username: data.username || '',
              fullName: data.fullName || '',
              email: data.email || '',
              mobile: data.mobile || '',
              address: data.address || '',
              city: data.city || '',
              state: data.state || '',
              pincode: data.pincode || '',
            });
            setProfileImage(data.photoURL || null);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
      setLoadingData(false);
    };

    fetchUserData();
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image is too large! Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) return;
    try {
      setUploading(true);
      const userRef = doc(db, 'users', user.uid);
      const updatePayload = {
        fullName: formData.fullName,
        mobile: formData.mobile,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        photoURL: profileImage,  
        modifiedAt: new Date()     
      };
      await updateDoc(userRef, updatePayload);
      const updatedUser = { ...user, ...updatePayload };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="login-container">
          <h2>Welcome!</h2>
          <p>Please log in to view your profile and settings.</p>
          <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    );
  }

  if (loadingData) {
    return <div className="profile-page"><p style={{textAlign: 'center', marginTop: '2rem'}}>Loading profile...</p></div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button className="logout-btn-header" onClick={handleLogout}>Logout</button>
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
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <span className="upload-text">Set Pic</span>
              </label>
            )}
          </div>

          <div className="profile-info">
            {isEditing ? (
              <form className="edit-form">
                <div className="form-group">
                  <label>Username (Read-only)</label>
                  <input type="text" value={formData.username} disabled style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }} />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={errors.fullName ? 'input-error' : ''} />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>
                <div className="form-group">
                  <label>Email (Read-only)</label>
                  <input type="text" value={formData.email} disabled style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }} />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="10-digit mobile number" className={errors.mobile ? 'input-error' : ''} />
                  {errors.mobile && <span className="field-error">{errors.mobile}</span>}
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className={errors.address ? 'input-error' : ''} />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={errors.city ? 'input-error' : ''} />
                    {errors.city && <span className="field-error">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} className={errors.state ? 'input-error' : ''} />
                    {errors.state && <span className="field-error">{errors.state}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className={errors.pincode ? 'input-error' : ''} />
                  {errors.pincode && <span className="field-error">{errors.pincode}</span>}
                </div>

                <div className="form-actions">
                  <button type="button" className="save-btn" onClick={handleSaveProfile} disabled={uploading}>
                    {uploading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => { setIsEditing(false); setErrors({}); }}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                <div className="detail-item">
                  <span className="label">Username:</span>
                  <span className="value">{formData.username}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Full Name:</span>
                  <span className="value">{formData.fullName || 'Not provided'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{formData.email}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Mobile:</span>
                  <span className="value">{formData.mobile || 'Not provided'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Address:</span>
                  <span className="value">{formData.address || 'Not provided'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">City:</span>
                  <span className="value">{formData.city || 'Not provided'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">State:</span>
                  <span className="value">{formData.state || 'Not provided'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Pincode:</span>
                  <span className="value">{formData.pincode || 'Not provided'}</span>
                </div>

                {/* NEW BUTTONS SECTION */}
                <div className="profile-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                  <button className="change-password-btn" onClick={() => navigate('/update-password')}>
                    Set Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;