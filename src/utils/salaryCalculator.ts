
import { 
  OLD_TAX_SLABS, 
  NEW_TAX_SLABS,
  EPF_EMPLOYEE_RATE,
  EPF_EMPLOYER_RATE,
  ESI_EMPLOYEE_RATE,
  BASIC_PERCENT,
  HRA_PERCENT,
  SPECIAL_ALLOWANCE_PERCENT,
  PROFESSIONAL_TAX
} from '../constants/financialConstants';

interface SalaryBreakdown {
  basic: number;
  hra: number;
  specialAllowance: number;
  grossSalary: number;
  epfEmployee: number;
  epfEmployer: number;
  esi: number;
  professionalTax: number;
  totalDeductions: number;
  netSalary: number;
  monthlySalary: number;
}

interface TaxCalculationInput {
  annualSalary: number;
  taxRegime: 'old' | 'new';
  section80C: number;
  section80D: number;
  housingLoan: number;
  nps: number;
}

// Function to calculate basic salary breakdown
export const calculateSalaryBreakdown = (ctc: number): SalaryBreakdown => {
  // Annual components
  const basic = (ctc * BASIC_PERCENT) / 100;
  const hra = (basic * HRA_PERCENT) / 100;
  const specialAllowance = (ctc * SPECIAL_ALLOWANCE_PERCENT) / 100;
  
  // Calculate Gross Salary
  const grossSalary = basic + hra + specialAllowance;
  
  // Calculate EPF
  const epfEmployee = (basic * EPF_EMPLOYEE_RATE) / 100;
  const epfEmployer = (basic * EPF_EMPLOYER_RATE) / 100;
  
  // Calculate ESI if applicable (assuming not applicable for typical CTC calculations)
  const esi = 0;
  
  // Professional Tax (fixed amount annually)
  const professionalTax = PROFESSIONAL_TAX * 12;
  
  // Total deductions (excluding income tax)
  const totalDeductions = epfEmployee + professionalTax + esi;
  
  // Net salary before income tax
  const netSalary = grossSalary - totalDeductions;
  
  // Monthly take-home (before income tax)
  const monthlySalary = netSalary / 12;
  
  return {
    basic,
    hra,
    specialAllowance,
    grossSalary,
    epfEmployee,
    epfEmployer,
    esi,
    professionalTax,
    totalDeductions,
    netSalary,
    monthlySalary
  };
};

// Function to calculate income tax
export const calculateIncomeTax = ({
  annualSalary,
  taxRegime = 'new',
  section80C = 0,
  section80D = 0,
  housingLoan = 0,
  nps = 0
}: TaxCalculationInput): number => {
  let taxableIncome = annualSalary;
  let totalTax = 0;
  
  // Apply deductions for old tax regime
  if (taxRegime === 'old') {
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

// Format currency to Indian Rupees
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
