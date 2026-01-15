import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '💰',
      title: 'Maximum Cashback',
      description: 'Earn up to 100% cashback on your favorite brands and online purchases. Get real money back in your account.',
      color: '#667eea'
    },
    {
      icon: '🎟️',
      title: 'Exclusive Coupons',
      description: 'Access thousands of verified coupon codes and discount offers from top brands and retailers.',
      color: '#764ba2'
    },
    {
      icon: '🛒',
      title: 'Best Online Deals',
      description: 'Discover the hottest deals, flash sales, and special offers from 1000+ trusted online stores.',
      color: '#f093fb'
    }
  ];

  return (
    <section id="features" className="features section">
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>
        <p className="section-subtitle">
          Get the best cashback, coupons, and deals from top brands. Save more on every purchase 
          with India's trusted cashback and rewards platform.
        </p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{'--accent-color': feature.color}}>
              <div className="feature-icon">
                <span>{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 