import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './OfferDetail.css';
import OfferModel from '../models/OfferModel.js';
import { fetchOffers } from '../services/offerService.js';
import { OfferType, getOfferTypeDisplayName } from '../models/OfferType.js';

const OfferDetail = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOffer = async () => {
      if (!offerId) {
        setError('No offer ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Try to get offer from localStorage first (if passed from navigation)
        const storedOffer = localStorage.getItem(`offer_${offerId}`);
        if (storedOffer) {
          try {
            const parsedOffer = JSON.parse(storedOffer);
            // Use fromMap since stored data is in snake_case format (from toMap())
            setOffer(OfferModel.fromMap(parsedOffer));
            setLoading(false);
            return;
          } catch (e) {
            console.warn('Failed to parse stored offer:', e);
          }
        }

        // If not in localStorage, try fetching from API
        // We'll try different offer types to find the offer
        const offerTypes = [
          OfferType.DEAL_OF_THE_DAY,
          OfferType.BANNER_OFFER,
          OfferType.SPECIAL_OFFER
        ];
        
        for (const offerType of offerTypes) {
          try {
            const offers = await fetchOffers(offerType);
            const foundOffer = offers.find(o => o.id === offerId);
            if (foundOffer) {
              setOffer(foundOffer);
              setLoading(false);
              return;
            }
          } catch (err) {
            console.warn(`Failed to fetch offers for type ${offerType}:`, err);
          }
        }

        // If not found in any type
        setError('Offer not found');
      } catch (err) {
        console.error('Error loading offer:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOffer();
  }, [offerId]);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const primaryImage = offer?.offerScreenshots?.[0] || offer?.brandLogo || null;

  if (loading) {
    return (
      <div className="offer-detail-container">
        <div className="offer-detail-loading">
          <div className="loading-spinner"></div>
          <p>Loading offer details...</p>
        </div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="offer-detail-container">
        <div className="offer-detail-error">
          <h2>Error</h2>
          <p>{error || 'Offer not found'}</p>
          <button className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="offer-detail-container">
      <div className="offer-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="offer-detail-content">
        <div className="offer-main">
          <div className="offer-main-left">
            <h1 className="offer-detail-title">{offer.title}</h1>
            <div className="offer-meta-line">
              <span>⏰ {formatDate(offer.createdAt)}</span>
              {offer.brand && <span>• {offer.brand}</span>}
              <span>• {getOfferTypeDisplayName(offer.offerType)}</span>
              {offer.isExpired && <span className="expired-tag">• Expired</span>}
            </div>

            {offer.shortDescription && (
              <p className="offer-short-description">{offer.shortDescription}</p>
            )}

            {/* HTML Content */}
            {offer.offerLongDescription && (
              <div
                className="offer-long-description"
                dangerouslySetInnerHTML={{ __html: offer.offerLongDescription }}
              />
            )}

            {/* Screenshots Section */}
            {offer.offerScreenshots && offer.offerScreenshots.length > 0 && (
              <div className="offer-screenshots-section">
                <h2 className="offer-section-heading">Screenshots</h2>
                <div className="offer-screenshots-grid">
                  {offer.offerScreenshots.map((screenshot, index) => (
                    <div key={index} className="offer-screenshot-item">
                      <img
                        src={screenshot}
                        alt={`Offer screenshot ${index + 1}`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="offer-main-right">
            <div className="offer-main-image">
              {primaryImage ? (
                <img src={primaryImage} alt={offer.title} />
              ) : (
                <div className="offer-image-placeholder">Offer image</div>
              )}
            </div>
            <button 
              className="offer-main-cta"
              onClick={() => {
                // If redirection URL exists, redirect to that URL
                if (offer.redirectionUrl) {
                  window.open(offer.redirectionUrl, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              SHOP &amp; EARN CASHBACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;

