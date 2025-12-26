import React from 'react';
import './Hero.css';

const Hero = () => {
  // Banner data array
  const banners = [
    {
      brand: "koparo clean",
      promoTitle: "Up To 50% OFF Sitewide",
      mainOffer: "FLAT 40% CASHBACK",
      extraOffer: "EXTRA 30% COUPON OFF",
      products: [
        { icon: "🧴", name: "koparo clean FLOOR CLEANER" },
        { icon: "🧼", name: "koparo LIQUID DETERGENT" },
        { icon: "🍋", name: "koparo DISHWASH LIQUID" },
      ]
    },
    {
      brand: "koparo fresh",
      promoTitle: "Buy 1 Get 1 Free",
      mainOffer: "BOGO OFFER",
      extraOffer: "EXTRA 20% OFF",
      products: [
        { icon: "🧽", name: "koparo MULTI-PURPOSE CLEANER" },
        { icon: "🪣", name: "koparo BATHROOM CLEANER" },
        { icon: "🧻", name: "koparo TOILET CLEANER" },
      ]
    },
    {
      brand: "koparo shine",
      promoTitle: "Free Delivery on Orders Above ₹499",
      mainOffer: "FREE DELIVERY",
      extraOffer: "EXTRA 10% CASHBACK",
      products: [
        { icon: "🧊", name: "koparo GLASS CLEANER" },
        { icon: "🪟", name: "koparo WINDOW CLEANER" },
        { icon: "🫧", name: "koparo HANDWASH" },
      ]
    },
    {
      brand: "koparo kids",
      promoTitle: "Student Discount",
      mainOffer: "EXTRA 15% OFF",
      extraOffer: "FIRST ORDER BONUS ₹100",
      products: [
        { icon: "🧸", name: "koparo TOY CLEANER" },
        { icon: "🍼", name: "koparo BOTTLE CLEANER" },
        { icon: "🧃", name: "koparo JUICE CLEANER" },
      ]
    }
  ];

  const scrollableOffers = [
    {
      id: 1,
      title: "Flash Sale - 70% OFF",
      description: "Limited time offer on electronics",
      discount: "70%",
      image: "⚡",
      color: "red"
    },
    {
      id: 2,
      title: "Buy 2 Get 1 Free",
      description: "On all fashion items",
      discount: "B2G1",
      image: "👕",
      color: "blue"
    },
    {
      id: 3,
      title: "Free Delivery",
      description: "On orders above ₹499",
      discount: "FREE",
      image: "🚚",
      color: "green"
    },
    {
      id: 4,
      title: "Cashback Up to ₹500",
      description: "Use code CASHBACK",
      discount: "₹500",
      image: "💰",
      color: "purple"
    },
    {
      id: 5,
      title: "Student Discount",
      description: "Extra 10% off for students",
      discount: "10%",
      image: "🎓",
      color: "orange"
    },
    {
      id: 6,
      title: "First Order Bonus",
      description: "Get ₹100 off on first order",
      discount: "₹100",
      image: "🎁",
      color: "pink"
    }
  ];

  const getOfferColor = (color) => {
    const colorMap = {
      red: { bg: "linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)", text: "#c53030" },
      blue: { bg: "linear-gradient(135deg, #bee3f8 0%, #90cdf4 100%)", text: "#2b6cb0" },
      green: { bg: "linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)", text: "#22543d" },
      purple: { bg: "linear-gradient(135deg, #e9d8fd 0%, #d6bcfa 100%)", text: "#553c9a" },
      orange: { bg: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)", text: "#c05621" },
      pink: { bg: "linear-gradient(135deg, #fed7e2 0%, #fbb6ce 100%)", text: "#b83280" }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          {/* Left - Promotional Banner */}
          <div className="hero-banners-scroll">
            {banners.map((banner, idx) => (
              <div className="hero-banner" key={idx}>
                <div className="banner-content">
                  <div className="brand-logo">{banner.brand}</div>
                  <div className="promo-text">
                    <h2 className="promo-title">{banner.promoTitle}</h2>
                    <div className="main-offer">{banner.mainOffer}</div>
                    <div className="extra-offer">{banner.extraOffer}</div>
                  </div>
                  <button className="shop-now-btn">SHOP NOW</button>
                </div>
                <div className="banner-products">
                  {banner.products.map((product, pidx) => (
                    <div className="product-item" key={pidx}>
                      <div className="product-icon">{product.icon}</div>
                      <div className="product-name">{product.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Right - Special Offers Sidebar */}
          <div className="special-offers-sidebar">
            {/* Scrollable Offers Widget */}
            <div className="offers-widget">
              <div className="widget-header">
                <h3>Special Offers</h3>
                <span className="scroll-indicator">↕️</span>
              </div>
              <div className="offers-scroll-container">
                <div className="offers-list">
                  {scrollableOffers.map((offer) => {
                    const colors = getOfferColor(offer.color);
                    return (
                      <div 
                        key={offer.id} 
                        className="offer-item"
                        style={{ background: colors.bg }}
                      >
                        <div className="offer-icon">{offer.image}</div>
                        <div className="offer-content">
                          <h4 className="offer-title" style={{ color: colors.text }}>
                            {offer.title}
                          </h4>
                          <p className="offer-description">{offer.description}</p>
                          <div className="offer-discount" style={{ color: colors.text }}>
                            {offer.discount}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Separator Section */}
      <div className="hero-separator">
        <div className="separator-text">
          Best Online Deals, Free Stuff And Top Cashback Offers
        </div>
      </div>
      
      <div className="hero-bg">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
      </div>
    </section>
  );
};

export default Hero; 