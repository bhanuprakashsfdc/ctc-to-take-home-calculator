// Country-specific financial constants and tax rules

// Country codes for the selector
export const SUPPORTED_COUNTRIES = [
  { code: 'IN', name: 'India', currency: 'INR', currencySymbol: '₹' },
  { code: 'US', name: 'United States', currency: 'USD', currencySymbol: '$' },
  { code: 'UK', name: 'United Kingdom', currency: 'GBP', currencySymbol: '£' },
  { code: 'CA', name: 'Canada', currency: 'CAD', currencySymbol: '$' },
  { code: 'AU', name: 'Australia', currency: 'AUD', currencySymbol: '$' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', currencySymbol: '$' },
  { code: 'DE', name: 'Germany', currency: 'EUR', currencySymbol: '€' },
];

// Default country
export const DEFAULT_COUNTRY = 'IN';

// US Tax Constants
export const US_TAX_BRACKETS = [
  { min: 0, max: 11000, rate: 10 },
  { min: 11001, max: 44725, rate: 12 },
  { min: 44726, max: 95375, rate: 22 },
  { min: 95376, max: 182100, rate: 24 },
  { min: 182101, max: 231250, rate: 32 },
  { min: 231251, max: 578125, rate: 35 },
  { min: 578126, max: Infinity, rate: 37 },
];

export const US_STANDARD_DEDUCTION = 13850;
export const US_401K_CONTRIBUTION_LIMIT = 22500;
export const US_SOCIAL_SECURITY_RATE = 6.2;
export const US_SOCIAL_SECURITY_WAGE_LIMIT = 160200;
export const US_MEDICARE_RATE = 1.45;

// UK Tax Constants
export const UK_TAX_BRACKETS = [
  { min: 0, max: 12570, rate: 0 }, // Personal Allowance
  { min: 12571, max: 50270, rate: 20 }, // Basic rate
  { min: 50271, max: 125140, rate: 40 }, // Higher rate
  { min: 125141, max: Infinity, rate: 45 }, // Additional rate
];

export const UK_NATIONAL_INSURANCE_BRACKETS = [
  { min: 0, max: 12570, rate: 0 },
  { min: 12571, max: 50270, rate: 12 },
  { min: 50271, max: Infinity, rate: 2 },
];

// Canada Tax Constants
export const CA_FEDERAL_TAX_BRACKETS = [
  { min: 0, max: 53359, rate: 15 },
  { min: 53360, max: 106717, rate: 20.5 },
  { min: 106718, max: 165430, rate: 26 },
  { min: 165431, max: 235675, rate: 29 },
  { min: 235676, max: Infinity, rate: 33 },
];

// Australia Tax Constants
export const AU_TAX_BRACKETS = [
  { min: 0, max: 18200, rate: 0 },
  { min: 18201, max: 45000, rate: 19 },
  { min: 45001, max: 120000, rate: 32.5 },
  { min: 120001, max: 180000, rate: 37 },
  { min: 180001, max: Infinity, rate: 45 },
];

// Singapore Tax Constants
export const SG_TAX_BRACKETS = [
  { min: 0, max: 20000, rate: 0 },
  { min: 20001, max: 30000, rate: 2 },
  { min: 30001, max: 40000, rate: 3.5 },
  { min: 40001, max: 80000, rate: 7 },
  { min: 80001, max: 120000, rate: 11.5 },
  { min: 120001, max: 160000, rate: 15 },
  { min: 160001, max: 200000, rate: 18 },
  { min: 200001, max: 240000, rate: 19 },
  { min: 240001, max: 280000, rate: 19.5 },
  { min: 280001, max: 320000, rate: 20 },
  { min: 320001, max: Infinity, rate: 22 },
];

// Germany Tax Constants
export const DE_TAX_BRACKETS = [
  { min: 0, max: 10908, rate: 0 },
  { min: 10909, max: 15999, rate: 14 },
  { min: 16000, max: 62809, rate: 24 },
  { min: 62810, max: 277825, rate: 42 },
  { min: 277826, max: Infinity, rate: 45 },
];

export const DE_SOCIAL_SECURITY_RATE = 20.5; // Approximate combined rate

// Region-based presets
export const REGION_PRESETS = {
  IN: [
    { name: 'Mumbai', description: 'Metro city with higher HRA exemption' },
    { name: 'Delhi', description: 'Metro city with higher HRA exemption' },
    { name: 'Bangalore', description: 'Metro city with higher HRA exemption' },
    { name: 'Chennai', description: 'Metro city with higher HRA exemption' },
    { name: 'Other', description: 'Non-metro city with standard HRA exemption' },
  ],
  UK: [
    { name: 'London', description: 'Higher cost of living and London weighting' },
    { name: 'Manchester', description: 'Northern city with lower cost of living' },
    { name: 'Edinburgh', description: 'Scottish tax rates apply' },
    { name: 'Other', description: 'Standard UK rates' },
  ],
  US: [
    { name: 'California', description: 'High state income tax' },
    { name: 'Texas', description: 'No state income tax' },
    { name: 'New York', description: 'High state and city income taxes' },
    { name: 'Florida', description: 'No state income tax' },
    { name: 'Other', description: 'Standard federal rates' },
  ],
};

// Currency conversion rates (approximate, would need to be updated regularly in production)
export const CURRENCY_CONVERSION_RATES = {
  INR: 1,
  USD: 83.5,
  GBP: 105.2,
  CAD: 61.3,
  AUD: 54.8,
  SGD: 62.1,
  EUR: 90.4,
};