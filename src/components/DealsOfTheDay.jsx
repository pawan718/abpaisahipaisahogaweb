import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DealsOfTheDay.css';
import { fetchDealsOfTheDay } from '../services/offerService.js';

const DealsOfTheDay = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOfferClick = (deal) => {
    // Store offer data in localStorage for quick access in detail page
    localStorage.setItem(`offer_${deal.id}`, JSON.stringify(deal.toMap ? deal.toMap() : deal));
    navigate(`/offer/${deal.id}`);
  };

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        setError(null);
        const offers = await fetchDealsOfTheDay();
        setDeals(offers);
      } catch (err) {
        console.error('Error loading deals:', err);
        setError(err.message);
        // Fallback to empty array on error
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  if (loading) {
    return (
      <section className="deals-section">
        <div className="container">
          <div className="deals-header">
            <h2 className="deals-title">
              <span className="star-icon">⭐</span>
              Deal Of The Day
            </h2>
          </div>
          <div className="deals-container">
            <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
              Loading deals...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="deals-section">
        <div className="container">
          <div className="deals-header">
            <h2 className="deals-title">
              <span className="star-icon">⭐</span>
              Deal Of The Day
            </h2>
          </div>
          <div className="deals-container">
            <div style={{ textAlign: 'center', padding: '40px', color: '#e53e3e' }}>
              Error loading deals: {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="deals-section">
      <div className="container">
        <div className="deals-header">
          <h2 className="deals-title">
            <span className="star-icon">⭐</span>
            Deal Of The Day
          </h2>
        </div>
        
        <div className="deals-container">
          <div className="deals-scroll">
            {deals.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
                No deals available at the moment.
              </div>
            ) : (
              deals.map((deal, index) => (
                <div 
                  key={deal.id} 
                  className="deal-card"
                  style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
                  onClick={() => handleOfferClick(deal)}
                >
                  <div className="deal-brand">
                    <span className="brand-logo">{deal.brand}</span>
                  </div>
                  
                  <div className="deal-content">
                    <h3 className="deal-title">{deal.title}</h3>
                    {deal.brandLogo ? (
                      <div className="deal-image">
                        <img 
                          src={deal.brandLogo} 
                          alt={deal.brand}
                          style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                        />
                      </div>
                    ) : (
                      <div className="deal-image">🛒</div>
                    )}
                  </div>
                  
                  <div className="deal-pricing">
                    <div className="current-price">
                      <span className="price-amount">{deal.shortDescription}</span>
                    </div>
                  </div>
                  
                  <div className="deal-overlay">
                    <div className="overlay-content">
                      <span className="shop-now">Shop Now</span>
                      <span className="arrow">→</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay; 