import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ cartCount, user, onLogout }) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const categoryRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside or scrolling
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    function handleScroll() {
      setCategoryOpen(false);
      setProfileOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-name">Buy SomeThing</span>
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>

          <li className="navbar-item dropdown" ref={categoryRef}>
            <button
              className="navbar-link dropdown-toggle"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              Category ▼
            </button>
            {categoryOpen && (
              <ul className="dropdown-menu">
                {categories.map(cat => (
                  <li key={cat} className="dropdown-item">
                    <Link to={`/?category=${cat}`} className="dropdown-link" onClick={() => setCategoryOpen(false)}>
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="navbar-item">
            <Link to="/about" className="navbar-link">About Us</Link>
          </li>

          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">Contact</Link>
          </li>

          <li className="navbar-item dropdown" ref={profileRef}>
            <button
              className="navbar-link dropdown-toggle"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              {user ? (user.fullName || user.name || user.username) : 'Profile'} ▼
            </button>
            {profileOpen && (
              <ul className="dropdown-menu profile-menu">
                {user ? (
                  <>
                    <li className="dropdown-item">
                      <Link to="/profile" className="dropdown-link" onClick={() => setProfileOpen(false)}>
                        Edit Profile
                      </Link>
                    </li>
                    <li className="divider"></li>
                    <li className="dropdown-item">
                      <button className="dropdown-link logout-btn" onClick={() => { setProfileOpen(false); onLogout?.(); }}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="dropdown-item">
                      <Link to="/profile" className="dropdown-link" onClick={() => setProfileOpen(false)}>
                        Login / Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </li>

          <li className="navbar-item">
            <Link to="/" className="navbar-link cart-link">
              🛒 Cart ({cartCount})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
