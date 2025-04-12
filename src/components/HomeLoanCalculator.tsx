import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import CountrySelector from './CountrySelector';
import Header from './Header';
import Footer from './Footer';
import { SUPPORTED_COUNTRIES } from '@/constants/countryConstants';

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
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="loanAmount">Home Price</Label>
                <span className="text-sm font-medium">{formatCurrency(loanAmount)}</span>
              </div>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="flex-1"
              />
              <Slider
                value={[loanAmount]}
                min={50000}
                max={1000000}
                step={10000}
                onValueChange={(value) => setLoanAmount(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="downPayment">Down Payment</Label>
                <span className="text-sm font-medium">{formatCurrency(downPayment)}</span>
              </div>
              <Input
                id="downPayment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="flex-1"
              />
              <Slider
                value={[downPayment]}
                min={0}
                max={loanAmount * 0.5}
                step={5000}
                onValueChange={(value) => setDownPayment(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <span className="text-sm font-medium">{interestRate}%</span>
              </div>
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                step="0.1"
                className="flex-1"
              />
              <Slider
                value={[interestRate]}
                min={1}
                max={15}
                step={0.1}
                onValueChange={(value) => setInterestRate(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <span className="text-sm font-medium">{loanTerm} years</span>
              </div>
              <Input
                id="loanTerm"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="flex-1"
              />
              <Slider
                value={[loanTerm]}
                min={5}
                max={30}
                step={1}
                onValueChange={(value) => setLoanTerm(value[0])}
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="mt-6 p-4 bg-muted rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-center">Loan Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-background rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
              </div>
              
              <div className="p-3 bg-background rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
                <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
              </div>
              
              <div className="p-3 bg-background rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
              </div>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="text-sm text-muted-foreground space-y-2 border-t pt-4">
            <h3 className="font-medium text-foreground">About Home Loans</h3>
            <p>
              A home loan or mortgage is a long-term loan used to finance the purchase of a property. 
              The monthly payment includes both principal and interest, and is calculated based on the loan amount, 
              interest rate, and term length.
            </p>
            <p>
              The down payment is the initial upfront payment you make when purchasing a home. A larger down payment 
              typically results in lower monthly payments and less interest paid over the life of the loan.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeLoanCalculator;