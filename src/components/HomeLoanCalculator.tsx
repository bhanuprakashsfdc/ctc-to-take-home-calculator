
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CountrySelector from './CountrySelector';
import Header from './Header';
import Footer from './Footer';
import { SUPPORTED_COUNTRIES } from '@/constants/countryConstants';
import LoanFormField from './calculators/LoanFormField';
import LoanSummary from './calculators/LoanSummary';
import LoanInfoSection from './calculators/LoanInfoSection';
import { calculateLoanDetails } from '@/utils/loanCalculator';

const HomeLoanCalculator: React.FC = () => {
  const { t } = useTranslation();
  
  // Form state
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [country, setCountry] = useState<string>('US');
  
  // Results state
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Calculate loan details whenever inputs change
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  const calculateLoan = () => {
    try {
      const principal = loanAmount - downPayment;
      const { monthlyPayment, totalPayment, totalInterest } = calculateLoanDetails(
        principal,
        interestRate,
        loanTerm
      );
      
      setMonthlyPayment(monthlyPayment);
      setTotalPayment(totalPayment);
      setTotalInterest(totalInterest);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  // Format currency based on selected country
  const formatCurrency = (value: number) => {
    const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === country);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: countryInfo?.currency || 'USD',
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  };

  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Home Loan Calculator</h2>
            <p className="text-muted-foreground">
              Calculate your monthly mortgage payments and total interest
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <CountrySelector
                id="country"
                value={country}
                onChange={setCountry}
                disableNavigation={true}
              />
            </div>
            
            <LoanFormField
              id="loanAmount"
              label="Home Price"
              value={loanAmount}
              onChange={setLoanAmount}
              min={50000}
              max={1000000}
              step={10000}
              formatValue={formatCurrency}
              tooltip="The total purchase price of the home"
            />

            <LoanFormField
              id="downPayment"
              label="Down Payment"
              value={downPayment}
              onChange={setDownPayment}
              min={0}
              max={loanAmount * 0.5}
              step={5000}
              formatValue={formatCurrency}
              tooltip="Initial payment made upfront. Typically 20% of home price for best rates"
            />

            <LoanFormField
              id="interestRate"
              label="Interest Rate (%)"
              value={interestRate}
              onChange={setInterestRate}
              min={1}
              max={15}
              step={0.1}
              unit="%"
              tooltip="Annual interest rate charged by the lender"
            />

            <LoanFormField
              id="loanTerm"
              label="Loan Term (years)"
              value={loanTerm}
              onChange={setLoanTerm}
              min={5}
              max={30}
              step={1}
              unit="years"
              tooltip="Length of time to repay the loan. Common terms are 15 or 30 years"
            />
          </div>

          <LoanSummary
            monthlyPayment={monthlyPayment}
            totalPayment={totalPayment}
            totalInterest={totalInterest}
            formatCurrency={formatCurrency}
          />

          <LoanInfoSection loanType="home" />
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeLoanCalculator;
