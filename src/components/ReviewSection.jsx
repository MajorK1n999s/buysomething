import React, { useState } from 'react';
import './ReviewSection.css';

function ReviewSection({ reviews, productId }) {
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    name: '',
  });
  const [submittedReviews, setSubmittedReviews] = useState(reviews);

  const averageRating =
    submittedReviews.length > 0
      ? (submittedReviews.reduce((sum, r) => sum + r.rating, 0) /
          submittedReviews.length).toFixed(1)
      : 0;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.comment.trim() && newReview.name.trim()) {
      setSubmittedReviews([...submittedReviews, newReview]);
      setNewReview({ rating: 5, comment: '', name: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  const renderStarInput = (value, onChange) => {
    return (
      <div className="star-input">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= value ? 'active' : ''}`}
            onClick={() => onChange(star)}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="review-section">
      <div className="review-header">
        <h3>Customer Reviews</h3>
        <div className="average-rating">
          <span className="avg-score">{averageRating}</span>
          <div className="avg-stars">{renderStars(Math.round(averageRating))}</div>
          <span className="review-count">({submittedReviews.length} reviews)</span>
        </div>
      </div>

      <div className="review-form-container">
        <h4>Write a Review</h4>
        <form className="review-form" onSubmit={handleSubmitReview}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            {renderStarInput(newReview.rating, (rating) =>
              setNewReview({ ...newReview, rating })
            )}
          </div>

          <div className="form-group">
            <label>Your Comment</label>
            <textarea
              placeholder="Share your experience with this product..."
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              rows="4"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-review-btn">
            Submit Review
          </button>
        </form>
      </div>

      <div className="reviews-list">
        {submittedReviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-header-item">
              <div>
                <h5 className="reviewer-name">{review.name}</h5>
                <div className="review-stars">{renderStars(review.rating)}</div>
              </div>
              <span className="review-date">{review.date || 'Recently'}</span>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;
