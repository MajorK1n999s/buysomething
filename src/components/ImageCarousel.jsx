import React, { useState } from 'react';
import './ImageCarousel.css';

function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="main-image-container">
        <img
          src={images[currentImageIndex]}
          alt={`Product View ${currentImageIndex + 1}`}
          className="main-image"
        />
        
        {images.length > 1 && (
          <>
            <button className="carousel-btn prev-btn" onClick={prevImage}>
              ❮
            </button>
            <button className="carousel-btn next-btn" onClick={nextImage}>
              ❯
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="thumbnail-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => goToImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
