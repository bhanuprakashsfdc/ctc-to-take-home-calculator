import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SUPPORTED_COUNTRIES } from '@/constants/countryConstants';
import { convertCurrency, convertCurrencyAsync, formatInternationalCurrency } from '@/utils/internationalSalaryCalculator';

interface CurrencyConverterProps {
  className?: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>('INR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  
  // Update converted amount when inputs change
  useEffect(() => {
    handleConvert();
  }, [amount, fromCurrency, toCurrency]);
  
  const handleConvert = async () => {
    try {
      // Use the async version with live rates
      const result = await convertCurrencyAsync(amount, fromCurrency, toCurrency);
      setConvertedAmount(result);
    } catch (error) {
      // Fallback to static conversion if live rates fail
      console.error('Error converting currency:', error);
      const fallbackResult = convertCurrency(amount, fromCurrency, toCurrency);
      setConvertedAmount(fallbackResult);
    }
  };
  
  return (
    <Card className={`${className}`}>
      <CardContent className="pt-6 space-y-4">
        <h2 className="text-lg font-semibold">Salary Currency Converter</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-lg font-medium"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="from-currency">From Currency</Label>
            <Select
              value={fromCurrency}
              onValueChange={setFromCurrency}
            >
              <SelectTrigger id="from-currency" className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_COUNTRIES.map((country) => (
                  <SelectItem key={country.currency} value={country.currency}>
                    <div className="flex items-center">
                      <span className="mr-2">{country.currencySymbol}</span>
                      <span>{country.currency} ({country.code})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="to-currency">To Currency</Label>
            <Select
              value={toCurrency}
              onValueChange={setToCurrency}
            >
              <SelectTrigger id="to-currency" className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_COUNTRIES.map((country) => (
                  <SelectItem key={country.currency} value={country.currency}>
                    <div className="flex items-center">
                      <span className="mr-2">{country.currencySymbol}</span>
                      <span>{country.currency} ({country.code})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <span className="text-muted-foreground">Converted Amount:</span>
            <div className="text-xl font-bold">
              {formatInternationalCurrency(Math.round(convertedAmount), 
                SUPPORTED_COUNTRIES.find(c => c.currency === toCurrency)?.code || 'US')}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Exchange rates are approximate and for informational purposes only. Actual rates may vary.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;