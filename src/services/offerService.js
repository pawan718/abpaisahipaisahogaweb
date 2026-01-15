import OfferModel from '../models/OfferModel.js';
import { OfferType } from '../models/OfferType.js';

const SUPABASE_URL = 'https://bbzjpkynmsxwjvzpidwn.supabase.co/functions/v1/get_offers';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiempwa3lubXN4d2p2enBpZHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDYxNDEsImV4cCI6MjA2MzA4MjE0MX0.7QtxPFHHa74ZSabzznjzpmcYnwE76qEJQFI6l-T5PC0';

/**
 * Fetch offers from Supabase API
 * @param {string} offerType - The type of offer to fetch (e.g., "Discount", "Deal of the Day", "Banner")
 * @returns {Promise<OfferModel[]>}
 */
export const fetchOffers = async (offerType) => {
  try {
    const response = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        offer_type: offerType,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}):`, errorText);
      throw new Error(`Failed to fetch offers: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle different response formats
    let offersArray = [];
    if (Array.isArray(data)) {
      offersArray = data;
    } else if (data.data && Array.isArray(data.data)) {
      offersArray = data.data;
    } else if (data.offers && Array.isArray(data.offers)) {
      offersArray = data.offers;
    } else {
      console.warn('Unexpected API response format:', data);
      return [];
    }

    // Convert to OfferModel instances and filter out expired offers
    const offers = offersArray
      .map((item) => OfferModel.fromMap(item))
      .filter((offer) => !offer.isExpired);

    return offers;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};

/**
 * Fetch deals of the day
 * @returns {Promise<OfferModel[]>}
 */
export const fetchDealsOfTheDay = async () => {
  return fetchOffers(OfferType.DEAL_OF_THE_DAY);
};

/**
 * Fetch banner offers
 * @returns {Promise<OfferModel[]>}
 */
export const fetchBannerOffers = async () => {
  return fetchOffers(OfferType.BANNER_OFFER);
};

/**
 * Fetch special offers
 * @returns {Promise<OfferModel[]>}
 */
export const fetchSpecialOffers = async () => {
  return fetchOffers(OfferType.SPECIAL_OFFER);
};

