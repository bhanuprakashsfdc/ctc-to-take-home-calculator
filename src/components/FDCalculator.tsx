import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FDResult {
  principalAmount: number;
  totalInterest: number;
  maturityValue: number;
  interestRate: number;
}

interface CurrencyFormat {
  code: string;
  symbol: string;
  locale: string;
}

const FDCalculator: React.FC = () => {
  const [principalAmount, setPrincipalAmount] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('7.5');
  const [tenure, setTenure] = useState<string>('5');
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('quarterly');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyFormat>({
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN'
  });

  const currencies: CurrencyFormat[] = [
    { code: 'INR', symbol: '₹', locale: 'en-IN' },
    { code: 'USD', symbol: '$', locale: 'en-US' },
    { code: 'EUR', symbol: '€', locale: 'en-EU' },
    { code: 'GBP', symbol: '£', locale: 'en-GB' }
  ];
  const [result, setResult] = useState<FDResult | null>(null);

  useEffect(() => {
    calculateFD();
  }, [principalAmount, interestRate, tenure, compoundingFrequency, selectedCurrency]);

  const calculateFD = () => {
    const P = parseFloat(principalAmount);
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(tenure);
    
    if (isNaN(P) || isNaN(r) || isNaN(t)) {
      return;
    }

    let n: number;
    switch (compoundingFrequency) {
      case 'annually':
        n = 1;
        break;
      case 'semi-annually':
        n = 2;
        break;
      case 'quarterly':
        n = 4;
        break;
      case 'monthly':
        n = 12;
        break;
      default:
        n = 4; // Default to quarterly
    }

    const maturityValue = P * Math.pow(1 + (r / n), n * t);
    const totalInterest = maturityValue - P;

    setResult({
      principalAmount: P,
      totalInterest,
      maturityValue,
      interestRate: r * 100
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(selectedCurrency.locale, {
      style: 'currency',
      currency: selectedCurrency.code,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FD Calculator | Fixed Deposit Interest Calculator</title>
        <meta name="description" content="Calculate your Fixed Deposit (FD) returns with our easy-to-use calculator. Plan your investments and estimate your interest earnings from bank FDs." />
        <link rel="canonical" href="https://www.ctc-calculator.com/fd-calculator.html" />
      </Helmet>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Fixed Deposit Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your FD returns and plan your secure investments
            </p>
          </div>

          <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Fixed Deposit Calculator</h2>
        
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="principalAmount">Principal Amount ({selectedCurrency.symbol})</Label>
            <Input
              id="principalAmount"
              type="number"
              value={principalAmount}
              onChange={(e) => setPrincipalAmount(e.target.value)}
              placeholder="Enter principal amount"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="interestRate">Interest Rate (% p.a.)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="tenure">Tenure (Years)</Label>
            <Input
              id="tenure"
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter tenure in years"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={selectedCurrency.code}
              onValueChange={(value) => setSelectedCurrency(currencies.find(c => c.code === value) || currencies[0])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
            <Select
              value={compoundingFrequency}
              onValueChange={setCompoundingFrequency}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select compounding frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annually">Annually</SelectItem>
                <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>


        </div>

        {result && (
          <div className="mt-6 space-y-4 p-4 bg-muted rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Investment Summary</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Principal Amount</p>
                <p className="text-lg font-semibold">{formatCurrency(result.principalAmount)}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Interest Rate</p>
                <p className="text-lg font-semibold">{result.interestRate.toFixed(2)}%</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-lg font-semibold text-green-600">{formatCurrency(result.totalInterest)}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Maturity Value</p>
                <p className="text-lg font-semibold text-finance-primary">{formatCurrency(result.maturityValue)}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FDCalculator;