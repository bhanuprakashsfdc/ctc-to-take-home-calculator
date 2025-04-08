import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';

interface LumpsumResult {
  investmentAmount: number;
  totalReturns: number;
  maturityValue: number;
}

const LumpsumCalculator: React.FC = () => {
  // ✅ Default values
  const [investmentAmount, setInvestmentAmount] = useState<string>('100000');
  const [duration, setDuration] = useState<string>('10');
  const [expectedReturns, setExpectedReturns] = useState<string>('12');
  const [result, setResult] = useState<LumpsumResult | null>(null);

  useEffect(() => {
    calculateLumpsum();
  }, [investmentAmount, duration, expectedReturns]);

  const calculateLumpsum = () => {
    const P = parseFloat(investmentAmount);
    const t = parseFloat(duration);
    const r = parseFloat(expectedReturns) / 100;

    if (isNaN(P) || isNaN(t) || isNaN(r)) return;

    const maturityValue = P * Math.pow(1 + r, t);
    const totalReturns = maturityValue - P;

    setResult({
      investmentAmount: P,
      totalReturns,
      maturityValue
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Lumpsum Calculator | Calculate One-Time Investment Returns</title>
        <meta name="description" content="Calculate your one-time investment returns with our Lumpsum Calculator. Plan your investments and estimate your wealth growth from a single investment." />
        <link rel="canonical" href="https://www.ctc-calculator.com/lumpsum-calculator.html" />
      </Helmet>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Lumpsum Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your one-time investment returns and plan your financial future
            </p>
          </div>

          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Lumpsum Calculator</h2>

              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="investmentAmount">Investment Amount (₹)</Label>
                  <Input
                    id="investmentAmount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="Enter investment amount"
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
              </div>

              {result && (
                <div className="mt-6 space-y-4 p-4 bg-muted rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Investment Summary</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Investment Amount</p>
                      <p className="text-lg font-semibold">{formatCurrency(result.investmentAmount)}</p>
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

export default LumpsumCalculator;
