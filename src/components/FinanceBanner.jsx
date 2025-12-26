import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FinanceBanner.css';

const FinanceBanner = () => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate('/finance-fill-form');
  };

  return (
    <div className="finance-banner" onClick={handleBannerClick}>
      <div className="finance-banner-content">
        <div className="finance-banner-left">
          <div className="finance-banner-icon">💳</div>
          <div className="finance-banner-text">
            <h3 className="finance-banner-title">Get Free Finance Assistance & Save Money</h3>
            <p className="finance-banner-subtitle">
              Discover the best credit cards for maximum cashback • Manage expenses smartly • Save more with expert tips
            </p>
          </div>
        </div>
        <div className="finance-banner-right">
          <div className="finance-banner-badge">
            <span className="badge-text">100% FREE</span>
          </div>
          <div className="finance-banner-arrow">→</div>
        </div>
      </div>
    </div>
  );
};

export default FinanceBanner;
