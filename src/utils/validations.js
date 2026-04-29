// Validation functions for registration and login

export const validations = {
  // Username: no digits allowed
  username: (value) => {
    if (!value) return { valid: false, error: 'Username is required' };
    if (value.length < 3) return { valid: false, error: 'Username must be at least 3 characters' };
    if (/\d/.test(value)) return { valid: false, error: 'Username cannot contain digits' };
    if (!/^[a-zA-Z_]+$/.test(value)) return { valid: false, error: 'Username can only contain letters and underscores' };
    return { valid: true, error: '' };
  },

  // Full Name: letters and spaces only
  fullName: (value) => {
    if (!value) return { valid: false, error: 'Full name is required' };
    if (value.length < 2) return { valid: false, error: 'Name must be at least 2 characters' };
    if (!/^[a-zA-Z\s]+$/.test(value)) return { valid: false, error: 'Name can only contain letters and spaces' };
    return { valid: true, error: '' };
  },

  // Email validation - strict format
  email: (value) => {
    if (!value) return { valid: false, error: 'Email is required' };
    // Only allow emails ending with @gmail.com or @email.com and proper format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|email)\.com$/;
    if (!emailRegex.test(value)) return { valid: false, error: 'Only @gmail.com or @email.com addresses allowed (e.g., abc@gmail.com)' };
    return { valid: true, error: '' };
  },

  // Mobile number: exactly 10 digits (ignoring country code)
  mobile: (value) => {
    if (!value) return { valid: false, error: 'Mobile number is required' };
    const digitsOnly = value.replace(/\D/g, '');
    // If more than 10 digits, extract only the last 10 (handles country code)
    const mobileDigits = digitsOnly.length > 10 ? digitsOnly.slice(-10) : digitsOnly;
    if (mobileDigits.length !== 10) return { valid: false, error: 'Mobile number must be exactly 10 digits' };
    return { valid: true, error: '' };
  },

  // Country code
  countryCode: (value) => {
    if (!value) return { valid: false, error: 'Country code is required' };
    return { valid: true, error: '' };
  },

  // Address
  address: (value) => {
    if (!value) return { valid: false, error: 'Address is required' };
    if (value.length < 5) return { valid: false, error: 'Address must be at least 5 characters' };
    return { valid: true, error: '' };
  },

  // City
  city: (value) => {
    if (!value) return { valid: false, error: 'City is required' };
    if (value.length < 2) return { valid: false, error: 'City name is invalid' };
    return { valid: true, error: '' };
  },

  // State
  state: (value) => {
    if (!value) return { valid: false, error: 'State is required' };
    return { valid: true, error: '' };
  },

  // Country
  country: (value) => {
    if (!value) return { valid: false, error: 'Country is required' };
    return { valid: true, error: '' };
  },

  // Pincode: 5-6 digits
  pincode: (value) => {
    if (!value) return { valid: false, error: 'Pincode is required' };
    if (!/^\d{5,6}$/.test(value)) return { valid: false, error: 'Pincode must be 5-6 digits' };
    return { valid: true, error: '' };
  },

  // Password: at least 6 characters
  password: (value) => {
    if (!value) return { valid: false, error: 'Password is required' };
    if (value.length < 6) return { valid: false, error: 'Password must be at least 6 characters' };
    return { valid: true, error: '' };
  },

  // Confirm Password
  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) return { valid: false, error: 'Please confirm password' };
    if (password !== confirmPassword) return { valid: false, error: 'Passwords do not match' };
    return { valid: true, error: '' };
  },
};

// Photo validation
export const validatePhoto = (file) => {
  if (!file) return { valid: false, error: 'Please select a photo' };
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPG and PNG images are allowed' };
  }
  if (file.size > 5 * 1024 * 1024) { // 5MB
    return { valid: false, error: 'Image size must be less than 5MB' };
  }
  return { valid: true, error: '' };
};
