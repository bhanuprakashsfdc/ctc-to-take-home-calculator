import React, { useEffect, useState  } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SWPResult {
  totalInvestment: number;
  monthlyWithdrawal: number;
  remainingAmount: number;
  totalWithdrawal: number;
}

interface CurrencyFormat {
  code: string;
  symbol: string;
  locale: string;
}

const SWPCalculator: React.FC = () => {
  const [totalInvestment, setTotalInvestment] = useState<string>('1000000');
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('10000');
  const [duration, setDuration] = useState<string>('10');
  const [expectedReturns, setExpectedReturns] = useState<string>('8');
  const [withdrawalFrequency, setWithdrawalFrequency] = useState<string>('monthly');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyFormat>({
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN'
  });
  const [result, setResult] = useState<SWPResult | null>(null);

  useEffect(() => {
    calculateSWP();
  }, [totalInvestment, withdrawalAmount, duration, expectedReturns, withdrawalFrequency, selectedCurrency]);

  const currencies: CurrencyFormat[] = [
    { code: 'INR', symbol: '₹', locale: 'en-IN' },
    { code: 'USD', symbol: '$', locale: 'en-US' },
    { code: 'EUR', symbol: '€', locale: 'en-EU' },
    { code: 'GBP', symbol: '£', locale: 'en-GB' }
  ];

  const calculateSWP = () => {
    const P = parseFloat(totalInvestment);
    const W = parseFloat(withdrawalAmount);
    const t = parseFloat(duration);
    const r = parseFloat(expectedReturns) / 100;

    if (isNaN(P) || isNaN(W) || isNaN(t) || isNaN(r)) {
      return;
    }

    let frequency: number;
    switch (withdrawalFrequency) {
      case 'monthly':
        frequency = 12;
        break;
      case 'quarterly':
        frequency = 4;
        break;
      case 'semi-annually':
        frequency = 2;
        break;
      case 'annually':
        frequency = 1;
        break;
      default:
        frequency = 12; // Default to monthly
    }

    const monthlyRate = r / 12;
    const totalPeriods = t * frequency;
    const periodicWithdrawal = W;
    
    let remainingAmount = P;
    let totalWithdrawal = 0;

    for (let i = 0; i < totalPeriods; i++) {
      remainingAmount = remainingAmount * (1 + (r / frequency)) - periodicWithdrawal;
      totalWithdrawal += periodicWithdrawal;
    }

    setResult({
      totalInvestment: P,
      monthlyWithdrawal: W,
      remainingAmount: Math.max(0, remainingAmount),
      totalWithdrawal
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
        <title>SWP Calculator | Systematic Withdrawal Plan Calculator</title>
        <meta name="description" content="Calculate your Systematic Withdrawal Plan (SWP) with our easy-to-use calculator. Plan your regular withdrawals from mutual funds and estimate your investment returns." />
        <link rel="canonical" href="https://www.ctc-calculator.com/swp-calculator.html" />
      </Helmet>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">SWP Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your systematic withdrawal plan and manage your investment withdrawals
            </p>
          </div>

          <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Systematic Withdrawal Plan (SWP) Calculator</h2>
        
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="totalInvestment">Total Investment Amount ({selectedCurrency.symbol})</Label>
            <Input
              id="totalInvestment"
              type="number"
              value={totalInvestment}
              onChange={(e) => setTotalInvestment(e.target.value)}
              placeholder="Enter total investment amount"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="withdrawalAmount">Withdrawal Amount ({selectedCurrency.symbol})</Label>
            <Input
              id="withdrawalAmount"
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              placeholder="Enter withdrawal amount"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="duration">Withdrawal Period (Years)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter withdrawal period"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="expectedReturns">Expected Returns (% p.a.)</Label>
            <Input
              id="expectedReturns"
              type="number"
              value={expectedReturns}
              onChange={(e) => setExpectedReturns(e.target.value)}
              placeholder="Enter expected annual returns"
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
            <Label htmlFor="withdrawalFrequency">Withdrawal Frequency</Label>
            <Select
              value={withdrawalFrequency}
              onValueChange={setWithdrawalFrequency}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select withdrawal frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>

        {result && (
          <div className="mt-6 space-y-4 p-4 bg-muted rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Withdrawal Summary</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <p className="text-lg font-semibold">{formatCurrency(result.totalInvestment)}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Regular Withdrawal</p>
                <p className="text-lg font-semibold text-finance-primary">{formatCurrency(result.monthlyWithdrawal)}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Total Withdrawal</p>
                <p className="text-lg font-semibold text-green-600">{formatCurrency(result.totalWithdrawal)}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Remaining Amount</p>
                <p className="text-lg font-semibold">{formatCurrency(result.remainingAmount)}</p>
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

export default SWPCalculator;