import React from 'react';
import './Offers.css';

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "Eye Mask For Relaxation",
      subtitle: "Worth Rs.499 At Just Rs.161",
      time: "1 hour ago",
      originalPrice: "₹499",
      currentPrice: "₹161",
      image: "😴",
      brand: "WX",
      category: "beauty",
      animationDelay: "0s"
    },
    {
      id: 2,
      title: "DC Collection Added",
      subtitle: "Flat 70% Cashback + Rs.250 Coupon OFF",
      time: "2 hours ago",
      originalPrice: "₹2999",
      currentPrice: "₹808",
      image: "👕",
      brand: "STRCH",
      category: "fashion",
      animationDelay: "0.2s"
    },
    {
      id: 3,
      title: "5-Inch Self-Watering Pot (Set of 5)",
      subtitle: "At Just Rs.36 Each",
      time: "2 hours ago",
      originalPrice: "₹2430",
      currentPrice: "₹182",
      image: "🪴",
      brand: "🌱",
      category: "home",
      animationDelay: "0.4s"
    },
    {
      id: 4,
      title: "Hotels In Goa Starting From Rs.201",
      subtitle: "Including Taxes",
      time: "8 hours ago",
      originalPrice: "₹1501",
      currentPrice: "₹201",
      image: "🏖️",
      brand: "IndiGo",
      category: "travel",
      animationDelay: "0.6s"
    },
    {
      id: 5,
      title: "Doctor Consultation Via Amazon",
      subtitle: "Starting From Rs.1 Only",
      time: "3 hours ago",
      originalPrice: "₹799",
      currentPrice: "₹1",
      image: "👨‍⚕️",
      brand: "amazon",
      category: "health",
      animationDelay: "0.8s"
    },
    {
      id: 6,
      title: "Super Exfoliation Combo",
      subtitle: "Glove + Brush At Just Rs.157",
      time: "1 hour ago",
      originalPrice: "₹499",
      currentPrice: "₹157",
      image: "🧤",
      brand: "",
      category: "beauty",
      animationDelay: "1s"
    },
    {
      id: 7,
      title: "Crystal Studded Brass 4.5 Inch Akhand Diya",
      subtitle: "At Just Rs.172",
      time: "2 hours ago",
      originalPrice: "₹2999",
      currentPrice: "₹172",
      image: "🕯️",
      brand: "",
      category: "home",
      animationDelay: "1.2s"
    },
    {
      id: 8,
      title: "Lifetime Free Card",
      subtitle: "Grab Your Rs.1100 FKM Rewards!",
      time: "2 hours ago",
      originalPrice: "₹2430",
      currentPrice: "₹182",
      image: "💳",
      brand: "",
      category: "finance",
      animationDelay: "1.4s"
    },
    {
      id: 9,
      title: "Kitchen Sponge Wipes (Pack of 25)",
      subtitle: "At Just Rs.25 Each",
      time: "8 hours ago",
      originalPrice: "₹1501",
      currentPrice: "₹25",
      image: "🧽",
      brand: "",
      category: "home",
      animationDelay: "1.6s"
    },
    {
      id: 10,
      title: "Peptide Lip Pop Rose & Lavender (Pack of 2)",
      subtitle: "At Just Rs.141 Each",
      time: "3 hours ago",
      originalPrice: "₹799",
      currentPrice: "₹141",
      image: "💄",
      brand: "Jivisa",
      category: "beauty",
      animationDelay: "1.8s"
    }
  ];

  return (
    <section id="offers" className="offers section">
      <div className="container">
        <div className="offers-header">
          <h2 className="offers-title">HOT DEALS</h2>
          <div className="offers-nav">
            <button className="nav-tab active">HOT DEALS</button>
            <button className="nav-tab">100% CASHBACK</button>
            <button className="nav-tab">TRENDING DEALS</button>
            <button className="nav-tab">COUPONS</button>
          </div>
        </div>
        
        <div className="offers-grid">
          {offers.map((offer) => (
            <div 
              key={offer.id} 
              className="offer-card" 
              data-category={offer.category}
              style={{ animationDelay: offer.animationDelay }}
            >
              <div className="offer-badges">
                <div className="cashback-badge">Cashback</div>
                <div className="question-badge">?</div>
              </div>
              
              <div className="offer-image">
                <span className="product-icon">{offer.image}</span>
              </div>
              
              <div className="offer-content">
                <div className="offer-header">
                  <h3 className="offer-title">{offer.title}</h3>
                  <p className="offer-subtitle">{offer.subtitle}</p>
                </div>
                
                <div className="offer-meta">
                  {offer.brand && (
                    <span className="offer-brand">{offer.brand}</span>
                  )}
                  <span className="offer-time">{offer.time}</span>
                </div>
                
                <div className="offer-pricing">
                  <span className="original-price">{offer.originalPrice}</span>
                  <span className="current-price">{offer.currentPrice}</span>
                </div>
                
                <button className="offer-action">
                  {offer.category === 'health' || offer.category === 'beauty' ? 'Shop Now' : 'Read More'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers; 