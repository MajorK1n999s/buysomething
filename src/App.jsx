import React, { useState, useEffect } from 'react';

import { db } from './lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';
//import LoginPage from './pages/LoginPage';
//import RegisterPage from './pages/RegisterPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import FBSignUp from './pages/FBSignUp';
import FBLogin from './pages/FBLogin';
import UpdatePassPage from './pages/UpdatePassPage';

import './App.css';



function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Do not automatically restore a previous session on page load.
  // This forces the user to login each time the app is opened.
  useEffect(() => {
    localStorage.removeItem('currentUser');
    setUser(null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar cartCount={cart.length} user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={user ? <HomePage addToCart={addToCart} /> : <Navigate to="/login" replace />} />
            <Route path="/product/:id" element={user ? <ProductDetailPage addToCart={addToCart} /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <FBLogin setUser={setUser} />} />
            <Route path="/register" element={user ? <Navigate to="/" replace /> : <FBSignUp setUser={setUser} />} />
            <Route path="/profile" element={user ? <ProfilePage user={user} setUser={setUser} /> : <Navigate to="/login" replace />} />
            <Route path="/update-password" element={user ? <UpdatePassPage user={user} /> : <Navigate to="/login" replace /> } />
            <Route path="/about" element={user ? <AboutUsPage /> : <Navigate to="/login" replace />} />
            <Route path="/contact" element={user ? <ContactPage /> : <Navigate to="/login" replace />} />
            <Route path="*" element={user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
