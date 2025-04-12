import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import CountrySelector from './CountrySelector';
import { SUPPORTED_COUNTRIES } from '@/constants/countryConstants';

const PersonalLoanCalculator: React.FC = () => {
  const { t } = useTranslation();
  
  // Form state
  const [loanAmount, setLoanAmount] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [loanTerm, setLoanTerm] = useState<number>(3);
  const [country, setCountry] = useState<string>('US');
  
  // Results state
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Calculate loan details whenever inputs change
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateLoan = () => {
    try {
      const principal = loanAmount;
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
            <h2 className="text-2xl font-bold mb-2">Personal Loan Calculator</h2>
            <p className="text-muted-foreground">
              Calculate your monthly personal loan payments and total interest
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
                <Label htmlFor="loanAmount">Loan Amount</Label>
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
                min={1000}
                max={100000}
                step={1000}
                onValueChange={(value) => setLoanAmount(value[0])}
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
                min={5}
                max={25}
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
                min={1}
                max={7}
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
            <h3 className="font-medium text-foreground">About Personal Loans</h3>
            <p>
              A personal loan is an unsecured loan that provides a lump sum of money to be repaid over a fixed term. 
              Unlike home or car loans, personal loans aren't secured by collateral, which typically results in higher 
              interest rates.
            </p>
            <p>
              Personal loans can be used for various purposes such as debt consolidation, home improvements, 
              medical expenses, or major purchases. The monthly payment includes both principal and interest.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalLoanCalculator;