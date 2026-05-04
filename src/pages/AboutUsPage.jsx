import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUsPage.css';

function AboutUsPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Buy SomeThing</h1>
        <p>Your trusted online shopping destination since 2020</p>
      </div>

      <div className="about-container">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Buy SomeThing was founded with a simple mission: to make shopping easier,
            more convenient, and more enjoyable for everyone. What started as a small
            project has grown into a thriving e-commerce platform trusted by thousands
            of customers worldwide.
          </p>
          <p>
            We believe that quality products and exceptional customer service should
            be accessible to everyone. Our team works tirelessly to bring you the best
            selection of products at competitive prices.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            To provide a seamless online shopping experience by offering:
          </p>
          <ul className="mission-list">
            <li>✓ Wide variety of quality products</li>
            <li>✓ Competitive pricing and regular discounts</li>
            <li>✓ Fast and reliable shipping</li>
            <li>✓ Exceptional customer support</li>
            <li>✓ Secure and safe transactions</li>
            <li>✓ Easy returns and exchanges</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Quality Products</h3>
              <p>Carefully curated selection of high-quality items</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing and frequent special offers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Shipping</h3>
              <p>Quick delivery to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Shopping</h3>
              <p>Safe and encrypted payment processing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Dedicated customer support team</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>Hassle-free return and exchange policy</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <h3>Integrity</h3>
              <p>We conduct business with honesty and transparency</p>
            </div>
            <div className="value-item">
              <h3>Customer First</h3>
              <p>Your satisfaction is our top priority</p>
            </div>
            <div className="value-item">
              <h3>Innovation</h3>
              <p>We continuously improve our platform and services</p>
            </div>
            <div className="value-item">
              <h3>Sustainability</h3>
              <p>We care about environmental responsibility</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            Buy SomeThing is powered by a dedicated team of e-commerce professionals,
            developers, designers, and customer service specialists. We're passionate
            about creating an amazing shopping experience and are always looking for
            ways to improve.
          </p>
          <p>
            Whether you're a new customer or a loyal supporter, we appreciate your
            business and welcome your feedback to help us serve you better!
          </p>
        </section>

        <section className="about-section cta-section">
          <h2>Join Our Community</h2>
          <p>Start shopping today and experience the Buy SomeThing difference!</p>
          <Link to="/" className="cta-button">Start Shopping</Link>
        </section>
      </div>
    </div>
  );
}

export default AboutUsPage;
