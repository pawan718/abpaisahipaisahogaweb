import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CompletionScreen.css';

const CompletionScreen = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="completion-screen">
      <div className="completion-container">
        <div className="completion-icon-wrapper">
          <div className="completion-checkmark">✓</div>
        </div>
        <h1 className="completion-title">Form Submitted Successfully!</h1>
        <p className="completion-message">
          Thank you for submitting your expense details. Our expert will contact you within <strong>24-48 hours</strong> for a personalized consultation.
        </p>
        <div className="completion-details">
          <div className="detail-item">
            <span className="detail-icon">📞</span>
            <span className="detail-text">Expert Consultation</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">⏰</span>
            <span className="detail-text">24-48 Hours Response Time</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">💬</span>
            <span className="detail-text">Personalized Financial Advice</span>
          </div>
        </div>
        <button className="home-btn" onClick={handleGoHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default CompletionScreen;


