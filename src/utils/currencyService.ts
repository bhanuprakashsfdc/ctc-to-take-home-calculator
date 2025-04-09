/**
 * Currency service for fetching exchange rates and converting between currencies
 */

import { CURRENCY_CONVERSION_RATES } from '../constants/countryConstants';

interface ExchangeRateResponse {
  rates?: Record<string, number>;
  success?: boolean;
  error?: {
    code?: string;
    message?: string;
  };
}

// Cache for exchange rates to avoid excessive API calls
let cachedRates: Record<string, number> | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Fetches the latest exchange rates from an external API
 * Uses the free exchangerate-api.com service
 * @returns Promise with exchange rates
 */
export const fetchExchangeRates = async (): Promise<Record<string, number>> => {
  // Check if we have cached rates that are still valid
  const now = Date.now();
  if (cachedRates && (now - cacheTimestamp < CACHE_DURATION)) {
    return cachedRates;
  }
  
  try {
    // Free API from exchangerate-api.com (limited to 1500 requests/month)
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    
    if (response.ok) {
      const data: ExchangeRateResponse = await response.json();
      
      if (data.rates && data.success) {
        // Cache the rates
        cachedRates = data.rates;
        cacheTimestamp = now;
        return data.rates;
      }
    }
    
    // Fallback to hardcoded rates if API fails
    return getHardcodedRates();
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return getHardcodedRates();
  }
};

/**
 * Converts an amount from one currency to another using latest rates
 * @param amount Amount to convert
 * @param fromCurrency Source currency code
 * @param toCurrency Target currency code
 * @returns Converted amount
 */
export const convertCurrencyWithLiveRates = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  try {
    const rates = await fetchExchangeRates();
    
    // Convert to USD first (as base currency)
    const amountInUSD = fromCurrency === 'USD' 
      ? amount 
      : amount / (rates[fromCurrency] || 1);
    
    // Convert from USD to target currency
    return toCurrency === 'USD'
      ? amountInUSD
      : amountInUSD * (rates[toCurrency] || 1);
  } catch (error) {
    console.error('Error converting currency with live rates:', error);
    // Fallback to hardcoded conversion
    return convertCurrencyWithHardcodedRates(amount, fromCurrency, toCurrency);
  }
};

/**
 * Fallback function to convert currency using hardcoded rates
 * @param amount Amount to convert
 * @param fromCurrency Source currency code
 * @param toCurrency Target currency code
 * @returns Converted amount
 */
export const convertCurrencyWithHardcodedRates = (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number => {
  const rates = getHardcodedRates();
  
  // Convert to USD first (as base currency)
  const amountInUSD = fromCurrency === 'USD' 
    ? amount 
    : amount / (rates[fromCurrency] || 1);
  
  // Convert from USD to target currency
  return toCurrency === 'USD'
    ? amountInUSD
    : amountInUSD * (rates[toCurrency] || 1);
};

/**
 * Returns hardcoded exchange rates as a fallback
 * @returns Record of currency codes to exchange rates
 */
const getHardcodedRates = (): Record<string, number> => {
  // Convert the CURRENCY_CONVERSION_RATES to USD-based rates
  const usdRate = CURRENCY_CONVERSION_RATES.USD;
  const rates: Record<string, number> = {};
  
  Object.entries(CURRENCY_CONVERSION_RATES).forEach(([currency, rate]) => {
    rates[currency] = usdRate / rate;
  });
  
  return rates;
};