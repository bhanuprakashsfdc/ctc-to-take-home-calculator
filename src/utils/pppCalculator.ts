import { SUPPORTED_COUNTRIES } from '../constants/countryConstants';
import { PPP_CONVERSION_RATES, COST_OF_LIVING_INDEX } from '../constants/pppConstants';
import { formatInternationalCurrency } from './internationalSalaryCalculator';

// Interface for PPP calculation input
export interface PPPCalculationInput {
  salary: number;
  fromCountry: string;
  fromCity: string;
  toCountry: string;
  toCity: string;
}

// Interface for PPP calculation result
export interface PPPCalculationResult {
  originalSalary: number;
  originalCurrency: string;
  originalCurrencySymbol: string;
  convertedSalary: number;
  convertedCurrency: string;
  convertedCurrencySymbol: string;
  pppFactor: number;
  costOfLivingFactor: number;
  formattedOriginalSalary: string;
  formattedConvertedSalary: string;
}

/**
 * Calculate equivalent salary based on Purchasing Power Parity (PPP)
 * and cost of living differences between two locations
 */
export const calculatePPPSalary = ({
  salary,
  fromCountry,
  fromCity,
  toCountry,
  toCity
}: PPPCalculationInput): PPPCalculationResult => {
  // Get country information
  const fromCountryInfo = SUPPORTED_COUNTRIES.find(c => c.code === fromCountry);
  const toCountryInfo = SUPPORTED_COUNTRIES.find(c => c.code === toCountry);
  
  if (!fromCountryInfo || !toCountryInfo) {
    throw new Error('Invalid country code');
  }
  
  // Get PPP conversion rates
  const fromPPP = PPP_CONVERSION_RATES[fromCountryInfo.currency as keyof typeof PPP_CONVERSION_RATES] || 1;
  const toPPP = PPP_CONVERSION_RATES[toCountryInfo.currency as keyof typeof PPP_CONVERSION_RATES] || 1;
  
  // Calculate PPP factor (how many units of target currency equal to source currency in purchasing power)
  const pppFactor = toPPP / fromPPP;
  
  // Get cost of living indices
  const fromCOL = COST_OF_LIVING_INDEX[fromCountry as keyof typeof COST_OF_LIVING_INDEX]?.[fromCity] || 
                 COST_OF_LIVING_INDEX[fromCountry as keyof typeof COST_OF_LIVING_INDEX]?.['Other'] || 100;
  
  const toCOL = COST_OF_LIVING_INDEX[toCountry as keyof typeof COST_OF_LIVING_INDEX]?.[toCity] || 
               COST_OF_LIVING_INDEX[toCountry as keyof typeof COST_OF_LIVING_INDEX]?.['Other'] || 100;
  
  // Calculate cost of living adjustment factor
  const costOfLivingFactor = toCOL / fromCOL;
  
  // Calculate the equivalent salary with both PPP and cost of living adjustment
  const convertedSalary = salary * pppFactor * costOfLivingFactor;
  
  return {
    originalSalary: salary,
    originalCurrency: fromCountryInfo.currency,
    originalCurrencySymbol: fromCountryInfo.currencySymbol,
    convertedSalary,
    convertedCurrency: toCountryInfo.currency,
    convertedCurrencySymbol: toCountryInfo.currencySymbol,
    pppFactor,
    costOfLivingFactor,
    formattedOriginalSalary: formatInternationalCurrency(salary, fromCountry),
    formattedConvertedSalary: formatInternationalCurrency(Math.round(convertedSalary), toCountry)
  };
};

/**
 * Get a description of the PPP conversion
 */
export const getPPPDescription = (result: PPPCalculationResult, fromCity: string, toCity: string): string => {
  const { originalSalary, convertedSalary, originalCurrency, convertedCurrency, pppFactor, costOfLivingFactor } = result;
  
  return `A salary of ${result.formattedOriginalSalary} in ${fromCity} has the equivalent purchasing power of ${result.formattedConvertedSalary} in ${toCity}. This calculation accounts for both currency purchasing power differences (${pppFactor.toFixed(2)}) and cost of living differences (${costOfLivingFactor.toFixed(2)}) between the two locations.`;
};

/**
 * Format PPP factor as a readable string
 */
export const formatPPPFactor = (factor: number): string => {
  if (factor > 1) {
    return `${factor.toFixed(2)}× higher`;
  } else if (factor < 1) {
    return `${(1/factor).toFixed(2)}× lower`;
  } else {
    return 'equivalent';
  }
};