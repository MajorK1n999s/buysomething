import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, addToCart }) {
  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 ? '✨' : '');
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
          {product.discount && (
            <div className="discount-badge">{product.discount}% OFF</div>
          )}
        </div>
      </Link>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.shortDescription}</p>

        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="rating-count">({product.reviewCount})</span>
        </div>

        <div className="product-price">
          {product.discount ? (
            <>
              <span className="original-price">${product.originalPrice}</span>
              <span className="current-price">${product.price}</span>
            </>
          ) : (
            <span className="current-price">${product.price}</span>
          )}
        </div>

        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
