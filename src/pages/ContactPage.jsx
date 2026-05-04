import React, { useState } from 'react';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.subject && formData.message) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 3000);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch with us today!</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p><a href="mailto:mahebubbashasaache@gmail.com">mahebubbashasaache@gmail.com</a></p>
            <p className="small">We'll respond within 24 hours</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Phone</h3>
            <p><a href="tel:+917385772505">+91 7385772505</a></p>
            <p className="small">Monday - Friday, 9 AM - 6 PM</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Address</h3>
            <p>Ausa Market Yard<br />Ausa City, Ausa 413520</p>
            <p className="small">International Delivery Unavailable !</p>
          </div>

          <div className="social-contact-card">
            <h3>Follow Us</h3>
            <div className="social-links-contact">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon-contact">f</span>
                <span>Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon-contact">𝕏</span>
                <span>Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon-contact">📷</span>
                <span>Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon-contact">in</span>
                <span>LinkedIn</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon-contact">▶</span>
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <h2>Send us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us your message..."
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>

            {submitted && (
              <div className="success-message">
                ✓ Thank you! Your message has been sent successfully.
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-items">
          <div className="faq-item">
            <h4>How long does shipping take?</h4>
            <p>Standard shipping typically takes 5-7 business days. Express shipping is available for an additional fee with 2-3 business day delivery.</p>
          </div>
          <div className="faq-item">
            <h4>What is your return policy?</h4>
            <p>We offer a 30-day return policy on most items. Products must be in original condition with all packaging intact.</p>
          </div>
          <div className="faq-item">
            <h4>Do you ship internationally?</h4>
            <p>Yes! We ship to over 100 countries worldwide. International shipping rates vary by location.</p>
          </div>
          <div className="faq-item">
            <h4>How do I track my order?</h4>
            <p>You'll receive a tracking number via email once your order ships. You can track your package in real-time.</p>
          </div>
          <div className="faq-item">
            <h4>Is my payment information secure?</h4>
            <p>Yes! We use industry-standard SSL encryption to protect all payment information. Your data is completely secure.</p>
          </div>
          <div className="faq-item">
            <h4>Do you offer customer support?</h4>
            <p>Absolutely! Our customer support team is available 24/7 via email, phone, or live chat.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
