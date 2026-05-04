import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './HomePage.css';

function HomePage({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Extract category from URL query parameters
  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryFromURL = urlParams.get('category');
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
    else{
      setSelectedCategory('All');
    }
  }, [location.search]);

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [selectedCategory, searchTerm]);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Buy SomeThing</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <h3>Categories</h3>
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="results-info">
        <p>Showing {filteredProducts.length} products</p>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No products found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
