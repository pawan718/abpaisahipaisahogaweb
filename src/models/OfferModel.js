/**
 * OfferModel - JavaScript equivalent of Dart OfferModel
 * Represents an offer with all its properties
 */
class OfferModel {
  constructor({
    id,
    createdAt,
    title,
    brand,
    shortDescription,
    isExpired,
    brandLogo,
    offerLongDescription,
    offerScreenshots,
    offerType,
    bannerImage,
    redirectionUrl,
  }) {
    this.id = id;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.title = title;
    this.brand = brand;
    this.shortDescription = shortDescription;
    this.isExpired = isExpired ?? false;
    this.brandLogo = brandLogo ?? null;
    this.offerLongDescription = offerLongDescription ?? '';
    this.offerScreenshots = Array.isArray(offerScreenshots) ? offerScreenshots : [];
    this.offerType = offerType ?? '';
    this.bannerImage = bannerImage ?? null;
    this.redirectionUrl = redirectionUrl ?? null;
  }

  /**
   * Create OfferModel from API response map
   * @param {Object} map - API response object
   * @returns {OfferModel}
   */
  static fromMap(map) {
    // Normalize offer_ss to Array<string>
    const rawScreenshots = map.offer_ss || map.offerScreenshots;
    let screenshots = [];

    if (rawScreenshots == null) {
      screenshots = [];
    } else if (Array.isArray(rawScreenshots)) {
      screenshots = rawScreenshots.map((e) => String(e));
    } else if (typeof rawScreenshots === 'string') {
      // Handle legacy single string stored
      screenshots = [rawScreenshots];
    } else {
      screenshots = [];
    }

    return new OfferModel({
      id: map.id || map.ID || '',
      createdAt: map.created_at || map.createdAt,
      title: map.title || '',
      brand: map.brand || '',
      shortDescription: map.short_description || map.shortDescription || '',
      isExpired: map.is_expired ?? map.isExpired ?? false,
      brandLogo: map.brand_logo || map.brandLogo || null,
      offerLongDescription: map.offer_long_description || map.offerLongDescription || '',
      offerScreenshots: screenshots,
      offerType: map.offer_type || map.offerType || '',
      bannerImage: map.banner_image || map.bannerImage || null,
      redirectionUrl: map.redirection_url || map.redirectionUrl || map.redirection_url || null,
    });
  }

  /**
   * Convert OfferModel to map/object
   * @returns {Object}
   */
  toMap() {
    return {
      id: this.id,
      created_at: this.createdAt.toISOString(),
      title: this.title,
      brand: this.brand,
      short_description: this.shortDescription,
      is_expired: this.isExpired,
      brand_logo: this.brandLogo,
      offer_long_description: this.offerLongDescription,
      offer_ss: this.offerScreenshots,
      offer_type: this.offerType,
      banner_image: this.bannerImage,
      redirection_url: this.redirectionUrl,
    };
  }

  /**
   * Create a copy with updated fields
   * @param {Object} updates - Fields to update
   * @returns {OfferModel}
   */
  copyWith(updates) {
    return new OfferModel({
      id: updates.id ?? this.id,
      createdAt: updates.createdAt ?? this.createdAt,
      title: updates.title ?? this.title,
      brand: updates.brand ?? this.brand,
      shortDescription: updates.shortDescription ?? this.shortDescription,
      isExpired: updates.isExpired ?? this.isExpired,
      brandLogo: updates.brandLogo ?? this.brandLogo,
      offerLongDescription: updates.offerLongDescription ?? this.offerLongDescription,
      offerScreenshots: updates.offerScreenshots ?? this.offerScreenshots,
      offerType: updates.offerType ?? this.offerType,
      bannerImage: updates.bannerImage ?? this.bannerImage,
      redirectionUrl: updates.redirectionUrl ?? this.redirectionUrl,
    });
  }
}

export default OfferModel;

