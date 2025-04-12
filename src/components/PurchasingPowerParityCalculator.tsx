import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CountrySelector from './CountrySelector';
import { SUPPORTED_COUNTRIES, DEFAULT_COUNTRY } from '@/constants/countryConstants';
import { PPP_CITY_PRESETS } from '@/constants/pppConstants';
import { calculatePPPSalary, getPPPDescription, formatPPPFactor } from '@/utils/pppCalculator';

const PurchasingPowerParityCalculator: React.FC = () => {
  const { t } = useTranslation();
  
  // Form state
  const [salary, setSalary] = useState<number>(100000);
  const [fromCountry, setFromCountry] = useState<string>(DEFAULT_COUNTRY);
  const [fromCity, setFromCity] = useState<string>('');
  const [toCountry, setToCountry] = useState<string>('US');
  const [toCity, setToCity] = useState<string>('');
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly');
  
  // Results state
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // Set default cities when countries change
  useEffect(() => {
    setDefaultCity(fromCountry, setFromCity);
  }, [fromCountry]);

  useEffect(() => {
    setDefaultCity(toCountry, setToCity);
  }, [toCountry]);

  const setDefaultCity = (countryCode: string, setCityFn: React.Dispatch<React.SetStateAction<string>>) => {
    const cities = PPP_CITY_PRESETS[countryCode as keyof typeof PPP_CITY_PRESETS] || [];
    if (cities.length > 0) {
      setCityFn(cities[0].name);
    } else {
      setCityFn('Other');
    }
  };

  // Handle calculation
  const handleCalculate = () => {
    try {
      // Adjust salary based on view mode
      const annualSalary = viewMode === 'monthly' ? salary * 12 : salary;
      
      const result = calculatePPPSalary({
        salary: annualSalary,
        fromCountry,
        fromCity,
        toCountry,
        toCity
      });
      
      setCalculationResult(result);
      setHasCalculated(true);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  // Format display values based on view mode
  const getDisplayValue = (value: number, countryCode: string) => {
    const displayValue = viewMode === 'monthly' ? value / 12 : value;
    const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === countryCode);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: countryInfo?.currency || 'USD',
      maximumFractionDigits: 0,
    }).format(Math.round(displayValue));
  };

  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Purchasing Power Parity Calculator</h2>
            <p className="text-muted-foreground">
              Compare salaries across different countries adjusted for cost of living
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Source Country/City */}
            <div className="space-y-4">
              <h3 className="font-medium">Source Location</h3>
              
              <div className="space-y-2">
                <Label htmlFor="fromCountry">Country</Label>
                <CountrySelector
                  id="fromCountry"
                  value={fromCountry}
                  onChange={setFromCountry}
                  disableNavigation={true}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fromCity">City</Label>
                <select
                  id="fromCity"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {PPP_CITY_PRESETS[fromCountry as keyof typeof PPP_CITY_PRESETS]?.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name} - {city.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Country/City */}
            <div className="space-y-4">
              <h3 className="font-medium">Target Location</h3>
              
              <div className="space-y-2">
                <Label htmlFor="toCountry">Country</Label>
                <CountrySelector
                  id="toCountry"
                  value={toCountry}
                  onChange={setToCountry}
                  disableNavigation={true}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="toCity">City</Label>
                <select
                  id="toCity"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {PPP_CITY_PRESETS[toCountry as keyof typeof PPP_CITY_PRESETS]?.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name} - {city.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Salary Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="salary">Salary</Label>
              <RadioGroup
                value={viewMode}
                onValueChange={(value) => setViewMode(value as 'monthly' | 'yearly')}
                className="flex space-x-4"
                defaultValue="yearly"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yearly" id="yearly" />
                  <Label htmlFor="yearly" className="cursor-pointer">Yearly</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex items-center space-x-2">
              <Input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-muted-foreground">
                {SUPPORTED_COUNTRIES.find(c => c.code === fromCountry)?.currencySymbol}
              </span>
            </div>
          </div>

          {/* Calculate Button */}
          <Button 
            onClick={handleCalculate} 
            className="w-full bg-finance-primary hover:bg-finance-primary/90"
          >
            Calculate Equivalent Salary
          </Button>

          {/* Results Section */}
          {hasCalculated && calculationResult && (
            <div className="mt-6 p-4 bg-muted rounded-lg space-y-4">
              <h3 className="text-xl font-semibold text-center">Equivalent Salary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-background rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">
                    {fromCity}, {SUPPORTED_COUNTRIES.find(c => c.code === fromCountry)?.name}
                  </p>
                  <p className="text-2xl font-bold">
                    {getDisplayValue(calculationResult.originalSalary, fromCountry)}
                  </p>
                </div>
                
                <div className="p-3 bg-background rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">
                    {toCity}, {SUPPORTED_COUNTRIES.find(c => c.code === toCountry)?.name}
                  </p>
                  <p className="text-2xl font-bold">
                    {getDisplayValue(calculationResult.convertedSalary, toCountry)}
                  </p>
                </div>
              </div>
              
              <div className="text-sm text-center">
                <p>{getPPPDescription(calculationResult, fromCity, toCity)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <p className="text-muted-foreground">Purchasing Power</p>
                  <p>{formatPPPFactor(calculationResult.pppFactor)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cost of Living</p>
                  <p>{formatPPPFactor(calculationResult.costOfLivingFactor)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Explanation Section */}
          <div className="text-sm text-muted-foreground space-y-2 border-t pt-4">
            <h3 className="font-medium text-foreground">About Purchasing Power Parity</h3>
            <p>
              Purchasing Power Parity (PPP) compares different countries' currencies through a "basket of goods" approach. 
              It helps understand what your salary is actually worth in different countries by accounting for cost of living differences.
            </p>
            <p>
              This calculator combines PPP data with city-specific cost of living indices to give you a more accurate comparison 
              of what your salary would need to be in another location to maintain the same standard of living.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchasingPowerParityCalculator;