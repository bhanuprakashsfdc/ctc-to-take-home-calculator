import { 
  SUPPORTED_COUNTRIES,
  DEFAULT_COUNTRY,
  US_TAX_BRACKETS,
  US_STANDARD_DEDUCTION,
  US_401K_CONTRIBUTION_LIMIT,
  US_SOCIAL_SECURITY_RATE,
  US_SOCIAL_SECURITY_WAGE_LIMIT,
  US_MEDICARE_RATE,
  UK_TAX_BRACKETS,
  UK_NATIONAL_INSURANCE_BRACKETS,
  CA_FEDERAL_TAX_BRACKETS,
  AU_TAX_BRACKETS,
  SG_TAX_BRACKETS,
  DE_TAX_BRACKETS,
  DE_SOCIAL_SECURITY_RATE,
  CURRENCY_CONVERSION_RATES
} from '../constants/countryConstants';

import {
  OLD_TAX_SLABS,
  NEW_TAX_SLABS,
  EPF_EMPLOYEE_RATE,
  EPF_EMPLOYER_RATE,
  BASIC_PERCENT,
  HRA_PERCENT,
  SPECIAL_ALLOWANCE_PERCENT,
  PROFESSIONAL_TAX
} from '../constants/financialConstants';

// Common interface for all country salary breakdowns
export interface InternationalSalaryBreakdown {
  basic: number;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  monthlySalary: number;
  countrySpecificComponents: Record<string, number>;
  currency: string;
  currencySymbol: string;
}

export interface InternationalTaxCalculationInput {
  annualSalary: number;
  country: string;
  region?: string;
  taxRegime?: 'old' | 'new'; // For countries with multiple tax regimes like India
  deductions?: Record<string, number>; // Country-specific deductions
}

// Format currency based on country
export const formatInternationalCurrency = (amount: number, countryCode: string): string => {
  const country = SUPPORTED_COUNTRIES.find(c => c.code === countryCode) || 
                 SUPPORTED_COUNTRIES.find(c => c.code === DEFAULT_COUNTRY);
  
  return new Intl.NumberFormat(getLocaleFromCountry(countryCode), {
    style: 'currency',
    currency: country?.currency || 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper to get locale from country code
const getLocaleFromCountry = (countryCode: string): string => {
  const localeMap: Record<string, string> = {
    'IN': 'en-IN',
    'US': 'en-US',
    'UK': 'en-GB',
    'CA': 'en-CA',
    'AU': 'en-AU',
    'SG': 'en-SG',
    'DE': 'de-DE'
  };
  
  return localeMap[countryCode] || 'en-US';
};

// Convert salary between currencies
export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  const fromRate = CURRENCY_CONVERSION_RATES[fromCurrency as keyof typeof CURRENCY_CONVERSION_RATES] || 1;
  const toRate = CURRENCY_CONVERSION_RATES[toCurrency as keyof typeof CURRENCY_CONVERSION_RATES] || 1;
  
  return (amount * fromRate) / toRate;
};

// Calculate salary breakdown based on country
export const calculateInternationalSalaryBreakdown = (
  ctc: number,
  country: string,
  region?: string
): InternationalSalaryBreakdown => {
  // Get country info
  const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === country) || 
                      SUPPORTED_COUNTRIES.find(c => c.code === DEFAULT_COUNTRY);
  
  // Default structure for return value
  const defaultBreakdown: InternationalSalaryBreakdown = {
    basic: 0,
    grossSalary: 0,
    totalDeductions: 0,
    netSalary: 0,
    monthlySalary: 0,
    countrySpecificComponents: {},
    currency: countryInfo?.currency || 'USD',
    currencySymbol: countryInfo?.currencySymbol || '$'
  };
  
  // Call country-specific calculation function based on country code
  switch(country) {
    case 'IN':
      return calculateIndianSalaryBreakdown(ctc, region);
    case 'US':
      return calculateUSSalaryBreakdown(ctc, region);
    case 'UK':
      return calculateUKSalaryBreakdown(ctc, region);
    case 'CA':
      return calculateCanadianSalaryBreakdown(ctc, region);
    case 'AU':
      return calculateAustralianSalaryBreakdown(ctc, region);
    case 'SG':
      return calculateSingaporeSalaryBreakdown(ctc, region);
    case 'DE':
      return calculateGermanSalaryBreakdown(ctc, region);
    default:
      return defaultBreakdown;
  }
};

// Calculate income tax based on country
export const calculateInternationalIncomeTax = ({
  annualSalary,
  country,
  region,
  taxRegime = 'new',
  deductions = {}
}: InternationalTaxCalculationInput): number => {
  switch(country) {
    case 'IN':
      return calculateIndianIncomeTax(annualSalary, taxRegime, deductions);
    case 'US':
      return calculateUSIncomeTax(annualSalary, region, deductions);
    case 'UK':
      return calculateUKIncomeTax(annualSalary, deductions);
    case 'CA':
      return calculateCanadianIncomeTax(annualSalary, region, deductions);
    case 'AU':
      return calculateAustralianIncomeTax(annualSalary, deductions);
    case 'SG':
      return calculateSingaporeIncomeTax(annualSalary, deductions);
    case 'DE':
      return calculateGermanIncomeTax(annualSalary, deductions);
    default:
      return 0;
  }
};

// India-specific calculations
const calculateIndianSalaryBreakdown = (ctc: number, region?: string): InternationalSalaryBreakdown => {
  // Annual components
  const basic = (ctc * BASIC_PERCENT) / 100;
  const hra = (basic * HRA_PERCENT) / 100;
  const specialAllowance = (ctc * SPECIAL_ALLOWANCE_PERCENT) / 100;
  
  // Calculate Gross Salary
  const grossSalary = basic + hra + specialAllowance;
  
  // Calculate EPF
  const epfEmployee = (basic * EPF_EMPLOYEE_RATE) / 100;
  const epfEmployer = (basic * EPF_EMPLOYER_RATE) / 100;
  
  // Professional Tax (fixed amount annually)
  const professionalTax = PROFESSIONAL_TAX * 12;
  
  // Total deductions (excluding income tax)
  const totalDeductions = epfEmployee + professionalTax;
  
  // Net salary before income tax
  const netSalary = grossSalary - totalDeductions;
  
  // Monthly take-home (before income tax)
  const monthlySalary = netSalary / 12;
  
  const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === 'IN');
  
  return {
    basic,
    grossSalary,
    totalDeductions,
    netSalary,
    monthlySalary,
    countrySpecificComponents: {
      hra,
      specialAllowance,
      epfEmployee,
      epfEmployer,
      professionalTax
    },
    currency: countryInfo?.currency || 'INR',
    currencySymbol: countryInfo?.currencySymbol || '₹'
  };
};

const calculateIndianIncomeTax = (
  annualSalary: number, 
  taxRegime: 'old' | 'new' = 'new',
  deductions: Record<string, number> = {}
): number => {
  let taxableIncome = annualSalary;
  let totalTax = 0;
  
  // Apply deductions for old tax regime
  if (taxRegime === 'old') {
    const section80C = deductions.section80C || 0;
    const section80D = deductions.section80D || 0;
    const housingLoan = deductions.housingLoan || 0;
    const nps = deductions.nps || 0;
    
    taxableIncome = Math.max(0, taxableIncome - section80C - section80D - housingLoan - nps);
  }
  
  // Select tax slabs based on regime
  const taxSlabs = taxRegime === 'old' ? OLD_TAX_SLABS : NEW_TAX_SLABS;
  
  // Calculate tax based on slabs
  for (let i = 0; i < taxSlabs.length; i++) {
    const { min, max, rate } = taxSlabs[i];
    
    if (taxableIncome > min) {
      const taxableAmount = Math.min(max - min, taxableIncome - min);
      const taxForSlab = (taxableAmount * rate) / 100;
      totalTax += taxForSlab;
    }
  }
  
  // Add education cess (4%)
  totalTax = totalTax + (totalTax * 0.04);
  
  return Math.round(totalTax);
};

// US-specific calculations
const calculateUSSalaryBreakdown = (ctc: number, region?: string): InternationalSalaryBreakdown => {
  // In the US, gross salary is typically the full CTC
  const grossSalary = ctc;
  
  // Basic salary (not typically used in US, but keeping for consistency)
  const basic = grossSalary;
  
  // Calculate Social Security tax (capped at wage limit)
  const socialSecurityWages = Math.min(grossSalary, US_SOCIAL_SECURITY_WAGE_LIMIT);
  const socialSecurityTax = (socialSecurityWages * US_SOCIAL_SECURITY_RATE) / 100;
  
  // Calculate Medicare tax (no wage limit)
  const medicareTax = (grossSalary * US_MEDICARE_RATE) / 100;
  
  // Assume a standard 401k contribution of 5% (this would be configurable in a real app)
  const contribution401k = Math.min(grossSalary * 0.05, US_401K_CONTRIBUTION_LIMIT);
  
  // Total deductions (excluding income tax)
  const totalDeductions = socialSecurityTax + medicareTax + contribution401k;
  
  // Net salary before income tax
  const netSalary = grossSalary - totalDeductions;
  
  // Monthly take-home (before income tax)
  const monthlySalary = netSalary / 12;
  
  const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === 'US');
  
  return {
    basic,
    grossSalary,
    totalDeductions,
    netSalary,
    monthlySalary,
    countrySpecificComponents: {
      socialSecurityTax,
      medicareTax,
      contribution401k
    },
    currency: countryInfo?.currency || 'USD',
    currencySymbol: countryInfo?.currencySymbol || '$'
  };
};

const calculateUSIncomeTax = (
  annualSalary: number,
  region?: string,
  deductions: Record<string, number> = {}
): number => {
  // Apply standard deduction
  let taxableIncome = Math.max(0, annualSalary - US_STANDARD_DEDUCTION);
  
  // Apply 401k deduction if provided
  const contribution401k = deductions.contribution401k || 0;
  taxableIncome = Math.max(0, taxableIncome - contribution401k);
  
  let federalTax = 0;
  
  // Calculate federal tax based on brackets
  for (let i = 0; i < US_TAX_BRACKETS.length; i++) {
    const { min, max, rate } = US_TAX_BRACKETS[i];
    
    if (taxableIncome > min) {
      const taxableAmount = Math.min(max - min, taxableIncome - min);
      const taxForBracket = (taxableAmount * rate) / 100;
      federalTax += taxForBracket;
    }
  }
  
  // Add state tax if applicable (simplified - would be more complex in reality)
  let stateTax = 0;
  if (region) {
    switch(region) {
      case 'California':
        stateTax = taxableIncome * 0.093; // Approximate for high income
        break;
      case 'New York':
        stateTax = taxableIncome * 0.07; // Approximate
        break;
      // No state tax for Texas and Florida
      default:
        stateTax = taxableIncome * 0.05; // Default state tax rate
    }
  }
  
  return Math.round(federalTax + stateTax);
};

// UK-specific calculations
const calculateUKSalaryBreakdown = (ctc: number, region?: string): InternationalSalaryBreakdown => {
  // In the UK, gross salary is typically the full CTC
  const grossSalary = ctc;
  
  // Basic salary (not typically broken down in UK, but keeping for consistency)
  const basic = grossSalary;
  
  // Calculate National Insurance contributions
  let nationalInsurance = 0;
  for (let i = 0; i < UK_NATIONAL_INSURANCE_BRACKETS.length; i++) {
    const { min, max, rate } = UK_NATIONAL_INSURANCE_BRACKETS[i];
    
    if (grossSalary > min) {
      const applicableAmount = Math.min(max - min, grossSalary - min);
      const niForBracket = (applicableAmount * rate) / 100;
      nationalInsurance += niForBracket;
    }
  }
  
  // Assume a standard pension contribution of 5%
  const pensionContribution = grossSalary * 0.05;
  
  // Total deductions (excluding income tax)
  const totalDeductions = nationalInsurance + pensionContribution;
  
  // Net salary before income tax
  const netSalary = grossSalary - totalDeductions;
  
  // Monthly take-home (before income tax)
  const monthlySalary = netSalary / 12;
  
  const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === 'UK');
  
  return {
    basic,
    grossSalary,
    totalDeductions,
    netSalary,
    monthlySalary,
    countrySpecificComponents: {
      nationalInsurance,
      pensionContribution
    },
    currency: countryInfo?.currency || 'GBP',
    currencySymbol: countryInfo?.currencySymbol || '£'
  };
};

const calculateUKIncomeTax = (
  annualSalary: number,
  deductions: Record<string, number> = {}
): number => {
  // Apply pension contribution deduction if provided
  const pensionContribution = deductions.pensionContribution || 0;
  let taxableIncome = Math.max(0, annualSalary - pensionContribution);
  
  let incomeTax = 0;
  
  // Calculate income tax based on brackets
  for (let i = 0; i < UK_TAX_BRACKETS.length; i++) {
    const { min, max, rate } = UK_TAX_BRACKETS[i];
    
    if (taxableIncome > min) {
      const taxableAmount = Math.min(max - min, taxableIncome - min);
      const taxForBracket = (taxableAmount * rate) / 100;
      incomeTax += taxForBracket;
    }
  }
  
  return Math.round(incomeTax);
};

// Placeholder implementations for other countries
// These would be expanded with actual tax rules in a real implementation

const calculateCanadianSalaryBreakdown = (ctc: number, region?: string): InternationalSalaryBreakdown => {
  const grossSalary = ctc;
  const basic = grossSalary;
  const cppContribution = Math.min(grossSalary * 0.057, 3500); // Simplified CPP calculation
  const eiContribution = Math.min(grossSalary * 0.0158, 1002); // Simplified EI calculation
  
  const totalDeductions = cppContribution + eiContribution;
  const netSalary = grossSalary - totalDeductions;
  const monthlySalary = netSalary / 12;
  
  const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === 'CA');
  
  return {
    basic,
    grossSalary,
    totalDeductions,
    netSalary,
    monthlySalary,
    countrySpecificComponents: {
      cppContribution,
      eiContribution
    },
    currency: countryInfo?.currency || 'CAD',
    currencySymbol: countryInfo?.currencySymbol || '$'
  };
};

const calculateCanadianIncomeTax = (
  annualSalary: number,
  region?: string,
  deductions: Record<string, number> = {}
): number => {
  let taxableIncome = annualSalary;
  let federalTax = 0;
  
  // Calculate federal tax based on brackets
  for (let i = 0; i < CA_FEDERAL_TAX_BRACKETS.length; i++) {
    const { min, max, rate } = CA_FEDERAL_TAX_BRACKETS[i];
    
    if (taxableIncome > min) {
      const taxableAmount = Math.min(max - min, taxableIncome - min);
      const taxForBracket = (taxableAmount * rate) / 100;
      federalTax += taxForBracket;
    }
  }
  
  // Simplified provincial tax (would be more complex in reality)
  const provincialTax = taxableIncome * 0.1; // Approximate
  
  return Math.round(federalTax + provincialTax);
};

const calculateAustralianSalaryBreakdown = (ctc: number, region?: string): InternationalSalaryBreakdown => {
  const grossSalary = ctc;
  const basic = grossSalary;
  const superannuation = grossSalary * 0.105; // 10.5% superannuation
  
  const totalDeductions = 0; // Superannuation is employer contribution, not a deduction
  const netSalary = grossSalary;
  const monthlySalary = netSalary / 12;
  
  const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === 'AU');
  
  return {
    basic,
    grossSalary,
    totalDeductions,
    netSalary,
    monthlySalary,
    countrySpecificComponents: {
      superannuation
    },
    currency: countryInfo?.currency || 'AUD',
    currencySymbol: countryInfo?.currencySymbol || '$'
  };
};

const calculateAustralianIncomeTax = (
  annualSalary: number,
  deductions: Record<string, number> = {}
): number => {
  let taxableIncome = annualSalary;
  let incomeTax = 0;
  
  // Calculate income tax based on brackets
  for (let i = 0; i < AU_TAX_BRACKETS.length; i++) {
    const { min, max, rate } = AU_TAX_BRACKETS[i];
    
    if (taxableIncome > min) {
      const taxableAmount = Math.min(max - min, taxableIncome - min);
      const taxForBracket = (taxableAmount * rate) / 100;
      incomeTax += taxForBracket;
    }
  }
  
  // Medicare levy (2%)
  const medicareLevyAmount = taxableIncome * 0.02;
  
  return Math.round(incomeTax + medicareLevyAmount);
};

const calculateSingaporeSalaryBreakdown = (ctc: number, region?: string): InternationalSalaryBreakdown => {
  const grossSalary = ctc;
  const basic = grossSalary;
  const cpfEmployee = Math.min(grossSalary * 0.2, 12000); // Simplified CPF calculation
  
  const totalDeductions = cpfEmployee;
  const netSalary = grossSalary - totalDeductions;
  const monthlySalary = netSalary / 12;
  
  const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === 'SG');
  
  return {
    basic,
    grossSalary,
    totalDeductions,
    netSalary,
    monthlySalary,
    countrySpecificComponents: {
      cpfEmployee
    },
    currency: countryInfo?.currency || 'SGD',
    currencySymbol: countryInfo?.currencySymbol || '$'
  };
};

const calculateSingaporeIncomeTax = (
  annualSalary: number,
  deductions: Record<string, number> = {}
): number => {
  let taxableIncome = annualSalary;
  let incomeTax = 0;
  
  // Calculate income tax based on brackets
  for (let i = 0; i < SG_TAX_BRACKETS.length; i++) {
    const { min, max, rate } = SG_TAX_BRACKETS[i];
    
    if (taxableIncome > min) {
      const taxableAmount = Math.min(max - min, taxableIncome - min);
      const taxForBracket = (taxableAmount * rate) / 100;
      incomeTax += taxForBracket;
    }
  }
  
  return Math.round(incomeTax);
};

const calculateGermanSalaryBreakdown = (ctc: number, region?: string): InternationalSalaryBreakdown => {
  const grossSalary = ctc;
  const basic = grossSalary;
  const socialSecurity = grossSalary * (DE_SOCIAL_SECURITY_RATE / 100);
  
  const totalDeductions = socialSecurity;
  const netSalary = grossSalary - totalDeductions;
  const monthlySalary = netSalary / 12;
  
  const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === 'DE');
  
  return {
    basic,
    grossSalary,
    totalDeductions,
    netSalary,
    monthlySalary,
    countrySpecificComponents: {
      socialSecurity
    },
    currency: countryInfo?.currency || 'EUR',
    currencySymbol: countryInfo?.currencySymbol || '€'
  };
};

const calculateGermanIncomeTax = (
  annualSalary: number,
  deductions: Record<string, number> = {}
): number => {
  let taxableIncome = annualSalary;
  let incomeTax = 0;
  
  // Calculate income tax based on brackets
  for (let i = 0; i < DE_TAX_BRACKETS.length; i++) {
    const { min, max, rate } = DE_TAX_BRACKETS[i];
    
    if (taxableIncome > min) {
      const taxableAmount = Math.min(max - min, taxableIncome - min);
      const taxForBracket = (taxableAmount * rate) / 100;
      incomeTax += taxForBracket;
    }
  }
  
  // Solidarity surcharge (5.5% of income tax)
  const solidaritySurcharge = incomeTax * 0.055;
  
  return Math.round(incomeTax + solidaritySurcharge);
};