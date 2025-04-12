import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import CountrySelector from './CountrySelector';
import { SUPPORTED_COUNTRIES } from '@/constants/countryConstants';

const EducationLoanCalculator: React.FC = () => {
  const { t } = useTranslation();
  
  // Form state
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(10);
  const [country, setCountry] = useState<string>('US');
  const [deferPayment, setDeferPayment] = useState<boolean>(true);
  const [deferPeriod, setDeferPeriod] = useState<number>(4); // 4 years for typical degree
  
  // Results state
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [deferredInterest, setDeferredInterest] = useState<number>(0);

  // Calculate loan details whenever inputs change
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, deferPayment, deferPeriod]);

  const calculateLoan = () => {
    try {
      let principal = loanAmount;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;
      let deferredInterestAmount = 0;
      
      // Calculate deferred interest if applicable
      if (deferPayment && deferPeriod > 0) {
        const deferredMonths = deferPeriod * 12;
        deferredInterestAmount = principal * (Math.pow(1 + monthlyRate, deferredMonths) - 1);
        principal += deferredInterestAmount; // Add deferred interest to principal
      }
      
      // Calculate monthly payment using the formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
      const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
                           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - loanAmount; // Original loan amount, not including deferred interest
      
      setMonthlyPayment(monthlyPayment);
      setTotalPayment(totalPayment);
      setTotalInterest(totalInterest);
      setDeferredInterest(deferredInterestAmount);
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
            <h2 className="text-2xl font-bold mb-2">Education Loan Calculator</h2>
            <p className="text-muted-foreground">
              Calculate your student loan payments and total interest
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
                min={5000}
                max={200000}
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
                min={2}
                max={12}
                step={0.1}
                onValueChange={(value) => setInterestRate(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="loanTerm">Repayment Term (years)</Label>
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
                max={25}
                step={1}
                onValueChange={(value) => setLoanTerm(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="deferPayment">Defer Payments During School</Label>
                <Switch
                  id="deferPayment"
                  checked={deferPayment}
                  onCheckedChange={setDeferPayment}
                />
              </div>
              {deferPayment && (
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="deferPeriod">School Period (years)</Label>
                    <span className="text-sm font-medium">{deferPeriod} years</span>
                  </div>
                  <Slider
                    value={[deferPeriod]}
                    min={1}
                    max={6}
                    step={1}
                    onValueChange={(value) => setDeferPeriod(value[0])}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="mt-6 p-4 bg-muted rounded-lg space-y-4">
            <h3 className="text-xl font-semibold text-center">Loan Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
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
              
              {deferPayment && (
                <div className="p-3 bg-background rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">Deferred Interest</p>
                  <p className="text-2xl font-bold">{formatCurrency(deferredInterest)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Explanation Section */}
          <div className="text-sm text-muted-foreground space-y-2 border-t pt-4">
            <h3 className="font-medium text-foreground">About Education Loans</h3>
            <p>
              Education loans help students pay for college, graduate school, and other educational expenses. 
              Many student loans allow you to defer payments while you're in school, but interest may still accrue 
              during this period and be added to your principal balance when repayment begins.
            </p>
            <p>
              The repayment term for education loans is typically longer than other personal loans, 
              allowing for more manageable monthly payments after graduation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationLoanCalculator;