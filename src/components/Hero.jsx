import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import { fetchBannerOffers, fetchSpecialOffers } from '../services/offerService.js';

const Hero = () => {
  const navigate = useNavigate();
  const bannerScrollRef = useRef(null);
  const [banners, setBanners] = useState([]);
  const [scrollableOffers, setScrollableOffers] = useState([]);
  const [bannersLoading, setBannersLoading] = useState(true);
  const [offersLoading, setOffersLoading] = useState(true);
  const [bannersError, setBannersError] = useState(null);
  const [offersError, setOffersError] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleOfferClick = (offer) => {
    // Navigate to offer detail page (redirection will happen there)
    // Store offer data in localStorage for quick access in detail page
    localStorage.setItem(`offer_${offer.id}`, JSON.stringify(offer.toMap ? offer.toMap() : offer));
    navigate(`/offer/${offer.id}`);
  };

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setBannersLoading(true);
        setBannersError(null);
        const offers = await fetchBannerOffers();
        setBanners(offers);
      } catch (err) {
        console.error('Error loading banners:', err);
        setBannersError(err.message);
        setBanners([]);
      } finally {
        setBannersLoading(false);
      }
    };

    loadBanners();
  }, []);

  useEffect(() => {
    const loadSpecialOffers = async () => {
      try {
        setOffersLoading(true);
        setOffersError(null);
        const offers = await fetchSpecialOffers();
        setScrollableOffers(offers);
      } catch (err) {
        console.error('Error loading special offers:', err);
        setOffersError(err.message);
        setScrollableOffers([]);
      } finally {
        setOffersLoading(false);
      }
    };

    loadSpecialOffers();
  }, []);

  const checkScrollButtons = () => {
    if (bannerScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = bannerScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollBanners = (direction) => {
    if (bannerScrollRef.current) {
      const scrollAmount = bannerScrollRef.current.clientWidth;
      const currentScroll = bannerScrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      bannerScrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      // Check buttons after scroll
      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    // Initial check
    checkScrollButtons();
    
    // Re-check after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      checkScrollButtons();
    }, 100);
    
    const scrollContainer = bannerScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      
      // Also check on window resize
      const handleResize = () => {
        setTimeout(checkScrollButtons, 100);
      };
      window.addEventListener('resize', handleResize);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', handleResize);
        clearTimeout(timeoutId);
      };
    }
    
    return () => clearTimeout(timeoutId);
  }, [banners]);

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
        {/* Top Section with Banner Offers and Special Offers */}
        <div className="offers-top-section">
          {/* Banner Offers */}
          <div className="banner-offers-section">
            {banners.length > 1 && (
              <>
                <button 
                  className="banner-nav-btn banner-nav-left"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollBanners('left');
                  }}
                  style={{ 
                    opacity: canScrollLeft ? 1 : 0.5,
                    pointerEvents: canScrollLeft ? 'auto' : 'none'
                  }}
                  aria-label="Previous banner"
                  disabled={!canScrollLeft}
                >
                  ←
                </button>
                <button 
                  className="banner-nav-btn banner-nav-right"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollBanners('right');
                  }}
                  style={{ 
                    opacity: canScrollRight ? 1 : 0.5,
                    pointerEvents: canScrollRight ? 'auto' : 'none'
                  }}
                  aria-label="Next banner"
                  disabled={!canScrollRight}
                >
                  →
                </button>
              </>
            )}
            <div className="hero-banners-scroll" ref={bannerScrollRef}>
              {bannersLoading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
                  Loading banners...
                </div>
              ) : bannersError ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#e53e3e' }}>
                  Error loading banners: {bannersError}
                </div>
              ) : banners.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
                  No banners available at the moment.
                </div>
              ) : (
                banners.map((banner, idx) => (
                  <div 
                    className="hero-banner" 
                    key={banner.id || idx}
                    style={{ cursor: 'pointer', position: 'relative' }}
                    onClick={() => handleOfferClick(banner)}
                  >
                    {banner.bannerImage ? (
                      <div className="banner-image-container">
                        <img 
                          src={banner.bannerImage} 
                          alt={banner.title || 'Banner offer'}
                          className="banner-image"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="banner-content">
                        <div className="brand-logo">{banner.brand}</div>
                        <div className="promo-text">
                          <h2 className="promo-title">{banner.title}</h2>
                          <div className="main-offer">{banner.shortDescription}</div>
                        </div>
                        <button 
                          className="shop-now-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOfferClick(banner);
                          }}
                        >
                          SHOP NOW
                        </button>
                      </div>
                    )}
                    {!banner.bannerImage && banner.offerScreenshots && banner.offerScreenshots.length > 0 && (
                      <div className="banner-products">
                        {banner.offerScreenshots.slice(0, 3).map((screenshot, pidx) => (
                          <div className="product-item" key={pidx}>
                            <div className="product-icon">
                              <img 
                                src={screenshot} 
                                alt={`${banner.brand} product ${pidx + 1}`}
                                style={{ width: '100%', height: '100%', maxWidth: '40px', maxHeight: '40px', objectFit: 'contain' }}
                              />
                            </div>
                            <div className="product-name">{banner.brand}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Special Offers */}
          <div className="special-offers-section">
            <div className="offers-widget">
              <div className="widget-header">
                <h3>Special Offers</h3>
                <span className="scroll-indicator">↕️</span>
              </div>
              <div className="offers-scroll-container">
                {offersLoading ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>
                    Loading offers...
                  </div>
                ) : offersError ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#e53e3e' }}>
                    Error: {offersError}
                  </div>
                ) : (
                  <div className="offers-list">
                    {scrollableOffers.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>
                        No special offers available.
                      </div>
                    ) : (
                      scrollableOffers.map((offer, index) => {
                        const colorIndex = index % 6;
                        const colorKeys = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];
                        const colors = getOfferColor(colorKeys[colorIndex]);
                        return (
                          <div 
                            key={offer.id} 
                            className="offer-item"
                            style={{ background: colors.bg, cursor: 'pointer' }}
                            onClick={() => handleOfferClick(offer)}
                          >
                            <div className="offer-icon">
                              {offer.brandLogo ? (
                                <img 
                                  src={offer.brandLogo} 
                                  alt={offer.brand}
                                />
                              ) : (
                                '🛒'
                              )}
                            </div>
                            <div className="offer-content">
                              <h4 className="offer-title" style={{ color: colors.text }}>
                                {offer.title}
                              </h4>
                              <p className="offer-description">{offer.shortDescription}</p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
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