// Purchasing Power Parity (PPP) constants

// PPP conversion factors (relative to USD)
// These values represent how many units of local currency are needed to buy
// the same amount of goods and services that 1 USD would buy in the United States
// Data from World Bank 2023 PPP conversion factors
export const PPP_CONVERSION_RATES = {
  USD: 1.00,    // United States (baseline)
  INR: 20.20,   // India (20.2025584710366)
  GBP: 0.68,    // United Kingdom (0.682911)
  CAD: 1.14,    // Canada (1.137311)
  AUD: 1.37,    // Australia (1.369197)
  SGD: 0.80,    // Singapore (0.8037836176702)
  EUR: 0.73,    // Germany (0.728102)
};

// Cost of living index (relative to New York City = 100)
export const COST_OF_LIVING_INDEX = {
  'US': {
    'New York': 100.0,
    'San Francisco': 95.0,
    'Chicago': 80.0,
    'Austin': 70.0,
    'Other': 75.0
  },
  'IN': {
    'Mumbai': 45.0,
    'Delhi': 40.0,
    'Bangalore': 43.0,
    'Chennai': 38.0,
    'Other': 35.0
  },
  'UK': {
    'London': 85.0,
    'Manchester': 65.0,
    'Edinburgh': 70.0,
    'Other': 67.0
  },
  'CA': {
    'Toronto': 75.0,
    'Vancouver': 78.0,
    'Montreal': 65.0,
    'Other': 70.0
  },
  'AU': {
    'Sydney': 80.0,
    'Melbourne': 75.0,
    'Brisbane': 70.0,
    'Other': 72.0
  },
  'SG': {
    'Singapore': 85.0,
    'Other': 85.0
  },
  'DE': {
    'Munich': 75.0,
    'Berlin': 70.0,
    'Frankfurt': 72.0,
    'Other': 68.0
  }
};

// City presets for PPP calculator
export const PPP_CITY_PRESETS = {
  'US': [
    { name: 'New York', description: 'Highest cost of living in the US' },
    { name: 'San Francisco', description: 'Tech hub with high housing costs' },
    { name: 'Chicago', description: 'Major city with moderate costs' },
    { name: 'Austin', description: 'Growing tech hub with lower costs' },
    { name: 'Other', description: 'Average US city' },
  ],
  'IN': [
    { name: 'Mumbai', description: 'Financial capital with highest costs' },
    { name: 'Delhi', description: 'Capital with high living costs' },
    { name: 'Bangalore', description: 'Tech hub with rising costs' },
    { name: 'Chennai', description: 'Major city with moderate costs' },
    { name: 'Other', description: 'Average Indian city' },
  ],
  'UK': [
    { name: 'London', description: 'Highest cost of living in the UK' },
    { name: 'Manchester', description: 'Northern city with lower costs' },
    { name: 'Edinburgh', description: 'Scottish capital with moderate costs' },
    { name: 'Other', description: 'Average UK city' },
  ],
  'CA': [
    { name: 'Toronto', description: 'Financial hub with high housing costs' },
    { name: 'Vancouver', description: 'High cost of living and housing' },
    { name: 'Montreal', description: 'Lower cost of living' },
    { name: 'Other', description: 'Average Canadian city' },
  ],
  'AU': [
    { name: 'Sydney', description: 'Highest cost of living in Australia' },
    { name: 'Melbourne', description: 'High cost of living' },
    { name: 'Brisbane', description: 'More affordable major city' },
    { name: 'Other', description: 'Average Australian city' },
  ],
  'SG': [
    { name: 'Singapore', description: 'City-state with high cost of living' },
    { name: 'Other', description: 'Other areas of Singapore' },
  ],
  'DE': [
    { name: 'Munich', description: 'Highest cost of living in Germany' },
    { name: 'Berlin', description: 'Capital with moderate costs' },
    { name: 'Frankfurt', description: 'Financial hub with high costs' },
    { name: 'Other', description: 'Average German city' },
  ],
};