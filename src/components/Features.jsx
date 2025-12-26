import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '💳',
      title: 'Smart Banking',
      description: 'Manage your accounts with intelligent insights and automated recommendations.',
      color: '#667eea'
    },
    {
      icon: '📊',
      title: 'Investment Portfolio',
      description: 'Diversify your investments with our expert-curated portfolio options.',
      color: '#764ba2'
    },
    {
      icon: '🎯',
      title: 'Goal Planning',
      description: 'Set financial goals and track your progress with personalized milestones.',
      color: '#f093fb'
    },
    {
      icon: '📱',
      title: 'Mobile App',
      description: 'Access your finances anywhere with our secure mobile application.',
      color: '#4facfe'
    },
    {
      icon: '🔒',
      title: 'Secure Transactions',
      description: 'Bank-grade security ensures your money and data are always protected.',
      color: '#43e97b'
    },
    {
      icon: '📈',
      title: 'Analytics Dashboard',
      description: 'Get detailed insights into your spending patterns and financial health.',
      color: '#fa709a'
    }
  ];

  return (
    <section id="features" className="features section">
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>
        <p className="section-subtitle">
          Discover the features that make Ab Paisa Hi Paisa Hoga the perfect choice 
          for your financial journey.
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
        
        <div className="features-cta">
          <h3>Ready to Start Your Financial Journey?</h3>
          <p>Join thousands of users who have already transformed their financial lives.</p>
          <a href="#contact" className="btn">Get Started Today</a>
        </div>
      </div>
    </section>
  );
};

export default Features; 