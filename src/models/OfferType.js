/**
 * OfferType - JavaScript equivalent of Dart OfferType enum
 */
export const OfferType = {
  DEAL_OF_THE_DAY: 'dealOfTheDay',
  BANNER_OFFER: 'bannerOffer',
  SPECIAL_OFFER: 'specialOffer',
};

/**
 * Get display name for offer type
 * @param {string} offerType - The offer type value
 * @returns {string} Display name
 */
export const getOfferTypeDisplayName = (offerType) => {
  switch (offerType) {
    case OfferType.DEAL_OF_THE_DAY:
      return 'Deal of the Day';
    case OfferType.BANNER_OFFER:
      return 'Banner Offer';
    case OfferType.SPECIAL_OFFER:
      return 'Special Offer';
    default:
      return offerType || 'Unknown';
  }
};

/**
 * Parse offer type from string
 * @param {string|null|undefined} value - The offer type string
 * @returns {string|null} Offer type value or null
 */
export const parseOfferType = (value) => {
  if (!value) return null;
  
  switch (value) {
    case 'dealOfTheDay':
      return OfferType.DEAL_OF_THE_DAY;
    case 'bannerOffer':
      return OfferType.BANNER_OFFER;
    case 'specialOffer':
      return OfferType.SPECIAL_OFFER;
    default:
      return null;
  }
};

