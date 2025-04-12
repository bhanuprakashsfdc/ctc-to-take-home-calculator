
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CountrySelector from './CountrySelector';
import { SUPPORTED_COUNTRIES } from '@/constants/countryConstants';
import LoanFormField from './calculators/LoanFormField';
import LoanSummary from './calculators/LoanSummary';
import LoanInfoSection from './calculators/LoanInfoSection';

const CarLoanCalculator: React.FC = () => {
  const { t } = useTranslation();
  
  // Form state
  const [carPrice, setCarPrice] = useState<number>(30000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [downPayment, setDownPayment] = useState<number>(6000);
  const [country, setCountry] = useState<string>('US');
  
  // Results state
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Calculate loan details whenever inputs change
  useEffect(() => {
    calculateLoan();
  }, [carPrice, interestRate, loanTerm, downPayment]);

  const calculateLoan = () => {
    try {
      const principal = carPrice - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;
      
      // Calculate monthly payment using the formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
      const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
                           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - principal;
      
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
            <h2 className="text-2xl font-bold mb-2">Car Loan Calculator</h2>
            <p className="text-muted-foreground">
              Calculate your monthly car loan payments and total interest
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
              id="carPrice"
              label="Car Price"
              value={carPrice}
              onChange={setCarPrice}
              min={5000}
              max={100000}
              step={1000}
              formatValue={formatCurrency}
            />

            <LoanFormField
              id="downPayment"
              label="Down Payment"
              value={downPayment}
              onChange={setDownPayment}
              min={0}
              max={carPrice * 0.5}
              step={500}
              formatValue={formatCurrency}
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
            />

            <LoanFormField
              id="loanTerm"
              label="Loan Term (years)"
              value={loanTerm}
              onChange={setLoanTerm}
              min={1}
              max={8}
              step={1}
              unit="years"
            />
          </div>

          <LoanSummary
            monthlyPayment={monthlyPayment}
            totalPayment={totalPayment}
            totalInterest={totalInterest}
            formatCurrency={formatCurrency}
          />

          <LoanInfoSection loanType="car" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CarLoanCalculator;
