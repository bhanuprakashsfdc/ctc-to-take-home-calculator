/**
 * Geolocation service for detecting user's country based on IP address
 */

import { SUPPORTED_COUNTRIES, DEFAULT_COUNTRY } from '../constants/countryConstants';

interface GeoLocationResponse {
  country_code?: string;
  country?: string;
  error?: boolean;
}

/**
 * Fetches the user's country based on their IP address
 * Uses the free ipapi.co service with fallback to ipinfo.io
 * @returns Promise with the two-letter country code
 */
export const detectUserCountry = async (): Promise<string> => {
  try {
    // First try with ipapi.co (no API key required, limited to 1000 requests/day)
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data: GeoLocationResponse = await response.json();
      if (data.country_code && !data.error) {
        return data.country_code;
      }
    }
    
    // Fallback to ipinfo.io (no API key required, limited to 50,000 requests/month)
    const fallbackResponse = await fetch('https://ipinfo.io/json');
    if (fallbackResponse.ok) {
      const fallbackData: GeoLocationResponse = await fallbackResponse.json();
      if (fallbackData.country) {
        return fallbackData.country;
      }
    }
    
    // If both APIs fail, use browser language as a hint (current implementation)
    return detectCountryFromBrowserLanguage();
  } catch (error) {
    console.error('Error detecting country:', error);
    return detectCountryFromBrowserLanguage();
  }
};

/**
 * Detects country from browser language (fallback method)
 * @returns Two-letter country code
 */
export const detectCountryFromBrowserLanguage = (): string => {
  const userLanguage = navigator.language || '';
  
  if (userLanguage.startsWith('hi')) {
    return 'IN';
  } else if (userLanguage.startsWith('en-US')) {
    return 'US';
  } else if (userLanguage.startsWith('en-GB')) {
    return 'UK';
  } else if (userLanguage.startsWith('de')) {
    return 'DE';
  } else if (userLanguage.startsWith('fr')) {
    return 'FR';
  } else if (userLanguage.startsWith('es')) {
    return 'ES';
  }
  
  // Default country if no match
  return DEFAULT_COUNTRY;
};

/**
 * Validates if the country code is supported by the application
 * @param countryCode Two-letter country code
 * @returns Valid country code or default country
 */
export const validateCountryCode = (countryCode: string): string => {
  const isSupported = SUPPORTED_COUNTRIES.some(country => country.code === countryCode);
  return isSupported ? countryCode : DEFAULT_COUNTRY;
};