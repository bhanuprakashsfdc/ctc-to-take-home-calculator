import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';

interface SIPResult {
  totalInvestment: number;
  totalReturns: number;
  maturityValue: number;
  monthlyInvestment: number;
}

interface CurrencyFormat {
  code: string;
  symbol: string;
  locale: string;
}

const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('5000');
  const [duration, setDuration] = useState<string>('10');
  const [expectedReturns, setExpectedReturns] = useState<string>('12');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyFormat>({
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN'
  });
  const [result, setResult] = useState<SIPResult | null>(null);

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, duration, expectedReturns, selectedCurrency]);

  const currencies: CurrencyFormat[] = [
    { code: 'INR', symbol: '₹', locale: 'en-IN' },
    { code: 'USD', symbol: '$', locale: 'en-US' },
    { code: 'EUR', symbol: '€', locale: 'de-DE' }, // fixed
    { code: 'GBP', symbol: '£', locale: 'en-GB' }
  ];

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const t = parseFloat(duration) * 12;
    const r = parseFloat(expectedReturns) / (12 * 100);

    if (isNaN(P) || isNaN(t) || isNaN(r)) return;

    const maturityValue = P * ((Math.pow(1 + r, t) - 1) / r) * (1 + r);
    const totalInvestment = P * t;
    const totalReturns = maturityValue - totalInvestment;

    setResult({
      totalInvestment,
      totalReturns,
      maturityValue,
      monthlyInvestment: P
    });
  };

  const formatCurrency = (amount: number) => {
    try {
      return new Intl.NumberFormat(selectedCurrency.locale, {
        style: 'currency',
        currency: selectedCurrency.code,
        maximumFractionDigits: 0
      }).format(amount);
    } catch {
      return `${selectedCurrency.symbol}${amount.toFixed(0)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>SIP Calculator | Calculate Systematic Investment Plan Returns</title>
        <meta name="description" content="Calculate your SIP (Systematic Investment Plan) returns with our easy-to-use calculator. Plan your mutual fund investments and estimate your wealth growth." />
        <link rel="canonical" href="https://www.ctc-calculator.com/sip-calculator.html" />
      </Helmet>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">SIP Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your Systematic Investment Plan returns and plan your investments
            </p>
          </div>

          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">SIP Calculator</h2>
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="monthlyInvestment">Monthly Investment ({selectedCurrency.symbol})</Label>
                  <Input
                    id="monthlyInvestment"
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                    placeholder="Enter monthly investment amount"
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="duration">Investment Duration (Years)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Enter investment duration"
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
                    onValueChange={(value) =>
                      setSelectedCurrency(currencies.find(c => c.code === value) || currencies[0])
                    }
                  >
                    <SelectTrigger>
                      {selectedCurrency.symbol} {selectedCurrency.code}
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
              </div>

              {result && (
                <div className="mt-6 space-y-4 p-4 bg-muted rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Investment Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Investment</p>
                      <p className="text-lg font-semibold">{formatCurrency(result.monthlyInvestment)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Investment</p>
                      <p className="text-lg font-semibold">{formatCurrency(result.totalInvestment)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Returns</p>
                      <p className="text-lg font-semibold text-green-600">{formatCurrency(result.totalReturns)}</p>
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

export default SIPCalculator;
