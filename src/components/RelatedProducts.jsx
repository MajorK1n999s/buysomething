import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import './RelatedProducts.css';

function RelatedProducts({ products, addToCart }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft +=
        direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="related-products">
      <h2>Related Products</h2>
      
      <div className="slider-container">
        <button
          className="slider-btn prev-slider-btn"
          onClick={() => scroll('left')}
        >
          ❮
        </button>

        <div className="products-slider" ref={scrollRef}>
          {products.map((product) => (
            <div key={product.id} className="slider-item">
              <ProductCard product={product} addToCart={addToCart} />
            </div>
          ))}
        </div>

        <button
          className="slider-btn next-slider-btn"
          onClick={() => scroll('right')}
        >
          ❯
        </button>
      </div>
    </div>
  );
}

export default RelatedProducts;
