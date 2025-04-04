// Tax slabs for the old tax regime (India)
export const OLD_TAX_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250001, max: 500000, rate: 5 },
  { min: 500001, max: 750000, rate: 20 },
  { min: 750001, max: 1000000, rate: 20 },
  { min: 1000001, max: 1250000, rate: 30 },
  { min: 1250001, max: 1500000, rate: 30 },
  { min: 1500001, max: Infinity, rate: 30 },
];

// Tax slabs for the new tax regime (India)
export const NEW_TAX_SLABS = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300001, max: 600000, rate: 5 },
  { min: 600001, max: 900000, rate: 10 },
  { min: 900001, max: 1200000, rate: 15 },
  { min: 1200001, max: 1500000, rate: 20 },
  { min: 1500001, max: Infinity, rate: 30 },
];

// Standard deduction amount
export const STANDARD_DEDUCTION = 50000;

// EPF (Employee Provident Fund) rate - percentage of Basic salary
export const EPF_EMPLOYEE_RATE = 12;
export const EPF_EMPLOYER_RATE = 12;
export const EPF_WAGE_CEILING = 15000; // per month

// ESI (Employee State Insurance) rates
export const ESI_EMPLOYEE_RATE = 0.75;
export const ESI_EMPLOYER_RATE = 3.25;
export const ESI_WAGE_CEILING = 21000; // per month

// Professional tax (varies by state, using common value)
export const PROFESSIONAL_TAX = 200; // monthly

// Default salary breakup percentages
export const BASIC_PERCENT = 50; // 50% of CTC
export const HRA_PERCENT = 50;   // 50% of Basic
export const SPECIAL_ALLOWANCE_PERCENT = 30; // Direct percent of CTC

// Other common tax saving investments
export const MAX_80C_DEDUCTION = 150000; // Section 80C
export const MAX_80D_DEDUCTION = 25000;  // Health Insurance premium for self
export const NPS_ADDITIONAL_DEDUCTION = 50000; // Section 80CCD(1B)
