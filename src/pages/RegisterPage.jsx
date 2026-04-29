import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validations, validatePhoto } from '../utils/validations';
import './RegisterPage.css';

function RegisterPage({ setUser }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    countryCode: '+91',
    mobile: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing (for better UX)
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validatePhoto(file);
      if (!validation.valid) {
        setErrors({ ...errors, photo: validation.error });
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors({ ...errors, photo: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate each field
    const usernameValidation = validations.username(formData.username);
    if (!usernameValidation.valid) newErrors.username = usernameValidation.error;

    const nameValidation = validations.fullName(formData.fullName);
    if (!nameValidation.valid) newErrors.fullName = nameValidation.error;

    const emailValidation = validations.email(formData.email);
    if (!emailValidation.valid) newErrors.email = emailValidation.error;

    const countryCodeValidation = validations.countryCode(formData.countryCode);
    if (!countryCodeValidation.valid) newErrors.countryCode = countryCodeValidation.error;

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

    const passwordValidation = validations.password(formData.password);
    if (!passwordValidation.valid) newErrors.password = passwordValidation.error;

    const confirmPasswordValidation = validations.confirmPassword(formData.password, formData.confirmPassword);
    if (!confirmPasswordValidation.valid) newErrors.confirmPassword = confirmPasswordValidation.error;

    if (!photoFile) newErrors.photo = 'Please upload a profile photo';

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
      // Save to localStorage
      const userData = {
        id: Date.now(),
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.countryCode + formData.mobile,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        photo: photoPreview,
        registeredAt: new Date().toISOString(),
      };

      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if username or email already exists
      const userExists = existingUsers.some(
        u => u.username === formData.username || u.email === formData.email
      );

      if (userExists) {
        setErrors({ form: 'Username or email already registered' });
        setLoading(false);
        return;
      }

      // Store password separately (in production, this should be hashed on backend)
      userData.password = formData.password;

      existingUsers.push(userData);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem('currentUser', JSON.stringify(userData));

      setUser(userData);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ form: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
      // Auto-hide after 3 seconds
      if (!showPassword) {
        setTimeout(() => setShowPassword(false), 3000);
      }
    } else {
      setShowConfirmPassword(!showConfirmPassword);
      // Auto-hide after 3 seconds
      if (!showConfirmPassword) {
        setTimeout(() => setShowConfirmPassword(false), 3000);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Create Account</h2>
        <p>Join us today! Fill in your information below.</p>

        {errors.form && <div className="form-error-message">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          {/* Photo Upload */}
          <div className="form-group photo-upload-group">
            <label>Profile Photo *</label>
            <div className="photo-upload-box">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="photo-preview" />
              ) : (
                <div className="photo-placeholder">
                  <span>📷 Click to upload</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose Photo
              </button>
            </div>
            {errors.photo && <span className="error-message">{errors.photo}</span>}
          </div>

          {/* Row 1: Username and Full Name */}
          <div className="form-row">
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="e.g., john_doe"
                className={errors.username ? 'input-error' : ''}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g., John Doe"
                className={errors.fullName ? 'input-error' : ''}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g., john@gmail.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Row 3: Mobile Number */}
          <div className="form-row">
            <div className="form-group">
              <label>Country Code *</label>
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className={errors.countryCode ? 'input-error' : ''}
              >
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+81">+81 (Japan)</option>
                <option value="+86">+86 (China)</option>
              </select>
              {errors.countryCode && <span className="error-message">{errors.countryCode}</span>}
            </div>
            <div className="form-group">
              <label>Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="10-digit number"
                maxLength="10"
                className={errors.mobile ? 'input-error' : ''}
              />
              {errors.mobile && <span className="error-message">{errors.mobile}</span>}
            </div>
          </div>

          {/* Row 4: Address */}
          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street address"
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          {/* Row 5: City, State, Country */}
          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className={errors.city ? 'input-error' : ''}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className={errors.state ? 'input-error' : ''}
              />
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
          </div>

          {/* Row 6: Country and Pincode */}
          <div className="form-row">
            <div className="form-group">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                className={errors.country ? 'input-error' : ''}
              />
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>
            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="5-6 digits"
                maxLength="6"
                className={errors.pincode ? 'input-error' : ''}
              />
              {errors.pincode && <span className="error-message">{errors.pincode}</span>}
            </div>
          </div>

          {/* Row 7: Password and Confirm Password */}
          <div className="form-row">
            <div className="form-group password-group">
              <label>Create Password *</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="At least 6 characters"
                  className={errors.password ? 'input-error' : ''}
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => togglePasswordVisibility('password')}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="form-group password-group">
              <label>Confirm Password *</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? 'input-error' : ''}
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Login Link */}
          <div className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
