import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SUPPORTED_COUNTRIES } from '@/constants/countryConstants';
import { convertCurrencyWithLiveRates, formatInternationalCurrency } from '@/utils/currencyService';
import { ArrowLeftRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface CurrencyConverterProps {
  className?: string;
}

const CurrencyConverterNew: React.FC<CurrencyConverterProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const handleConvert = useCallback(async () => {
    if (amount <= 0) {
      setConvertedAmount(0);
      return;
    }    
    setIsLoading(true);
    try {
      const result = await convertCurrencyWithLiveRates(amount, fromCurrency, toCurrency);
      setConvertedAmount(result);
      setLastUpdated(new Date());
    } catch (error) {
      toast({
        title: "Error converting currency",
        description: "Please try again later. Using fallback conversion rates.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [amount, fromCurrency, toCurrency, toast]);

  // Update converted amount when inputs change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleConvert();
    }, 500); // Debounce API calls
    
    return () => clearTimeout(debounceTimer);
  }, [amount, fromCurrency, handleConvert, toCurrency]); 

  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleConvert();
    }, 500); // Debounce API calls
    
    return () => clearTimeout(debounceTimer);
  }, [handleConvert]);
  
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  return (
    <Card className={`${className}`}>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Currency Converter</h2>
          {isLoading && <span className="text-sm text-muted-foreground">Converting...</span>}
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-lg font-medium"
              placeholder="Enter amount"
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="w-full md:w-5/12 space-y-2">
              <Label htmlFor="from-currency">From</Label>
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
                        <span>{country.currency} - {country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end justify-center my-2 md:my-0 md:pb-0.5">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwapCurrencies}
                className="rounded-full"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="w-full md:w-5/12 space-y-2">
              <Label htmlFor="to-currency">To</Label>
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
                        <span>{country.currency} - {country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {lastUpdated && (
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              )}
            </div>
            <div className="text-xl font-bold">
              {formatInternationalCurrency(convertedAmount, 
                SUPPORTED_COUNTRIES.find(c => c.currency === toCurrency)?.code || 'US',
                toCurrency)}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Exchange rates are updated in real-time. Some rates may be delayed based on provider availability.
          </p>
        </div>
      </CardContent>
      
      {/* Related Calculators Section */}
      <div className="mt-6 pt-4 border-t border-border/40">
        <h3 className="text-sm font-medium mb-3">Related Calculators:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-finance-primary transition-colors">
            → CTC to Take Home Calculator
          </Link>
          <Link to="/salary-to-hourly.html" className="text-muted-foreground hover:text-finance-primary transition-colors">
            → Salary to Hourly Calculator
          </Link>
          <Link to="/salary-hike.html" className="text-muted-foreground hover:text-finance-primary transition-colors">
            → Salary Hike Calculator
          </Link>
          <Link to="/ppp-calculator.html" className="text-muted-foreground hover:text-finance-primary transition-colors">
            → Purchasing Power Calculator
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CurrencyConverterNew;