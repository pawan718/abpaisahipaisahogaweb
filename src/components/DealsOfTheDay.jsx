import React from 'react';
import './DealsOfTheDay.css';

const DealsOfTheDay = () => {
  const deals = [
    {
      id: 1,
      brand: "SONAMA",
      title: "Mizu Rice Combo (Total 4 Items)",
      image: "🧴",
      originalPrice: "₹1546",
      currentPrice: "₹99",
      unit: "Each"
    },
    {
      id: 2,
      brand: "VEEBA",
      title: "Cheesy Melt (Pack of 3)",
      image: "🧀",
      originalPrice: "₹370",
      currentPrice: "₹73",
      unit: "Each"
    },
    {
      id: 3,
      brand: "Dabur",
      title: "Mustard Oil (Pack of 3L)",
      image: "🫒",
      originalPrice: "₹930",
      currentPrice: "₹199",
      unit: "/L"
    },
    {
      id: 4,
      brand: "Amazon",
      title: "Amazon Fresh (Order Anything)",
      image: "🛒",
      originalPrice: "",
      currentPrice: "Flat Rs.50",
      unit: "Cashback"
    },
    {
      id: 5,
      brand: "Flipkart",
      title: "Smart LED Bulb Pack (Set of 4)",
      image: "💡",
      originalPrice: "₹1200",
      currentPrice: "₹299",
      unit: "Pack"
    },
    {
      id: 6,
      brand: "Myntra",
      title: "Premium Cotton T-Shirts (Pack of 3)",
      image: "👕",
      originalPrice: "₹1500",
      currentPrice: "₹450",
      unit: "Pack"
    }
  ];

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
            {deals.map((deal, index) => (
              <div 
                key={deal.id} 
                className="deal-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="deal-brand">
                  <span className="brand-logo">{deal.brand}</span>
                </div>
                
                <div className="deal-content">
                  <h3 className="deal-title">{deal.title}</h3>
                  <div className="deal-image">{deal.image}</div>
                </div>
                
                <div className="deal-pricing">
                  {deal.originalPrice && (
                    <span className="original-price">{deal.originalPrice}</span>
                  )}
                  <div className="current-price">
                    <span className="price-amount">{deal.currentPrice}</span>
                    <span className="price-unit">{deal.unit}</span>
                  </div>
                </div>
                
                <div className="deal-overlay">
                  <div className="overlay-content">
                    <span className="shop-now">Shop Now</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay; 