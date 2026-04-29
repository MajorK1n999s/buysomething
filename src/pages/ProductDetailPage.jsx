import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import ReviewSection from '../components/ReviewSection';
import RelatedProducts from '../components/RelatedProducts';
import { getProductById, getRelatedProducts } from '../data/products';
import './ProductDetailPage.css';

function ProductDetailPage({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState('');

  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(parseInt(id), 6);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setCartMessage('✓ Added to cart!');
    setTimeout(() => setCartMessage(''), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // In a real app, redirect to checkout
    alert('Proceeding to checkout with ' + quantity + ' item(s)');
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 ? '✨' : '');
  };

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <button onClick={() => navigate('/')}>Home</button>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span>{product.title}</span>
      </div>

      <div className="product-container">
        <div className="product-images">
          <ImageCarousel images={product.images} />
        </div>

        <div className="product-details">
          <div className="product-header">
            <h1>{product.title}</h1>
            <div className="rating-section">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="rating-value">{product.rating} / 5</span>
              <span className="review-count">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="price-section">
            {product.discount > 0 ? (
              <>
                <span className="original-price">${product.originalPrice}</span>
                <span className="current-price">${product.price}</span>
                <span className="discount-tag">{product.discount}% OFF</span>
              </>
            ) : (
              <span className="current-price">${product.price}</span>
            )}
          </div>

          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                min="1"
                className="qty-input"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            <button className="buy-now-button" onClick={handleBuyNow}>
              💳 Buy Now
            </button>
          </div>

          {cartMessage && <div className="success-message">{cartMessage}</div>}

          <div className="description-section">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      <ReviewSection reviews={product.reviews} productId={product.id} />

      <RelatedProducts products={relatedProducts} addToCart={addToCart} />
    </div>
  );
}

export default ProductDetailPage;
