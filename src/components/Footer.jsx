import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Ab Paisa Hi Paisa Hoga</h3>
            <p className="footer-description">
              Your trusted partner in financial success. We help you make smart 
              decisions and grow your wealth with confidence.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📧</a>
              <a href="#" className="social-link">📱</a>
              <a href="#" className="social-link">💬</a>
              <a href="#" className="social-link">📘</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#">Smart Banking</a></li>
              <li><a href="#">Investment Portfolio</a></li>
              <li><a href="#">Goal Planning</a></li>
              <li><a href="#">Financial Analytics</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📍 123 Financial Street, Money City</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ info@abpaisahipaisahoga.com</p>
              <p>🕒 Mon-Fri: 9AM-6PM</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Ab Paisa Hi Paisa Hoga. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 