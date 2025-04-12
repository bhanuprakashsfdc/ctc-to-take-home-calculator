
/**
 * Calculates loan details based on principal, interest rate, and loan term
 * 
 * @param principal The loan amount after down payment
 * @param annualInterestRate Annual interest rate as a percentage (e.g., 4.5 for 4.5%)
 * @param loanTermYears Loan term in years
 * @returns Object containing monthly payment, total payment, and total interest
 */
export const calculateLoanDetails = (
  principal: number,
  annualInterestRate: number,
  loanTermYears: number
): { monthlyPayment: number; totalPayment: number; totalInterest: number } => {
  // Convert annual interest rate to monthly and percentage to decimal
  const monthlyRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  
  // Calculate monthly payment using the formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
                       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;
  
  return {
    monthlyPayment,
    totalPayment,
    totalInterest
  };
};

/**
 * Formats a currency value based on the specified country code
 * 
 * @param value The numeric value to format
 * @param currencyCode The currency code (e.g., 'USD', 'EUR')
 * @returns Formatted currency string
 */
export const formatCurrencyValue = (
  value: number,
  currencyCode: string = 'USD'
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
};
