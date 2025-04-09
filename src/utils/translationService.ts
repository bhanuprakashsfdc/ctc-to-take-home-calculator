/**
 * Translation service for managing language preferences and translations
 */

import i18n from 'i18next';
import { SUPPORTED_COUNTRIES } from '../constants/countryConstants';

// Map of country codes to their primary languages
const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  'IN': 'hi', // India - Hindi
  'US': 'en', // United States - English
  'UK': 'en', // United Kingdom - English
  'CA': 'en', // Canada - English (could also be French)
  'AU': 'en', // Australia - English
  'SG': 'en', // Singapore - English
  'DE': 'de', // Germany - German
  'FR': 'fr', // France - French
  'ES': 'es'  // Spain - Spanish
};

// Languages supported by the application
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' }, // Hindi
  { code: 'de', name: 'Deutsch' }, // German
  { code: 'fr', name: 'Français' }, // French
  { code: 'es', name: 'Español' }, // Spanish
  { code: 'zh', name: '中文' } // Chinese
];

/**
 * Changes the application language
 * @param languageCode Language code to set
 */
export const changeLanguage = (languageCode: string): void => {
  console.log('Changing language to:', languageCode);
  console.log('Available languages:', i18n.languages);
  
  // Force reload resources if needed
  if (i18n.hasResourceBundle(languageCode, 'translation')) {
    console.log(`Resource bundle for ${languageCode} exists`);
  } else {
    console.log(`Resource bundle for ${languageCode} does not exist`);
  }
  
  // Change language even if not in i18n.languages list
  i18n.changeLanguage(languageCode)
    .then(() => {
      console.log('Language successfully changed to:', i18n.language);
      // Store the language preference
      localStorage.setItem('preferredLanguage', languageCode);
    })
    .catch((error) => {
      console.error('Error changing language:', error);
    });
};

/**
 * Gets the preferred language based on country code
 * @param countryCode Two-letter country code
 * @returns Language code
 */
export const getLanguageFromCountry = (countryCode: string): string => {
  return COUNTRY_TO_LANGUAGE[countryCode] || 'en';
};

/**
 * Sets the application language based on user's country
 * @param countryCode Two-letter country code
 */
export const setLanguageFromCountry = (countryCode: string): void => {
  const languageCode = getLanguageFromCountry(countryCode);
  changeLanguage(languageCode);
};

/**
 * Gets the user's preferred language from localStorage or browser settings
 * @returns Language code
 */
export const getUserPreferredLanguage = (): string => {
  // Check if user has a stored preference
  const storedLanguage = localStorage.getItem('preferredLanguage');
  if (storedLanguage && i18n.languages.includes(storedLanguage)) {
    return storedLanguage;
  }
  
  // Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (i18n.languages.includes(browserLang)) {
    return browserLang;
  }
  
  // Default to English
  return 'en';
};