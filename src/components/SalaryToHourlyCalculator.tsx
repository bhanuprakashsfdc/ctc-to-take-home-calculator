import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatInternationalCurrency } from '@/utils/internationalSalaryCalculator';
import { SUPPORTED_COUNTRIES } from '@/constants/countryConstants';

interface SalaryToHourlyCalculatorProps {
  className?: string;
}

const SalaryToHourlyCalculator: React.FC<SalaryToHourlyCalculatorProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const [salary, setSalary] = useState<number>(50000);
  const [period, setPeriod] = useState<string>('yearly');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [dailyRate, setDailyRate] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('US');
  
  // Calculate hourly rate when inputs change
  useEffect(() => {
    calculateHourlyRate();
  }, [salary, period, hoursPerWeek, daysPerWeek, selectedCurrency]);
  
  const calculateHourlyRate = () => {
    let annualSalary = salary;
    
    // Convert to annual salary if period is monthly
    if (period === 'monthly') {
      annualSalary = salary * 12;
    }
    
    // Calculate working hours per year
    const weeksPerYear = 52;
    const hoursPerYear = hoursPerWeek * weeksPerYear;
    const daysPerYear = daysPerWeek * weeksPerYear;
    
    // Calculate hourly and daily rates
    const calculatedHourlyRate = annualSalary / hoursPerYear;
    const calculatedDailyRate = annualSalary / daysPerYear;
    
    setHourlyRate(calculatedHourlyRate);
    setDailyRate(calculatedDailyRate);
  };
  
  return (
    <Card className={`${className}`}>
      <CardContent className="pt-6 space-y-4">
        <h2 className="text-lg font-semibold">Salary to Hourly Rate Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Convert your annual or monthly salary to an equivalent hourly rate based on your working hours.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salary">Salary Amount</Label>
            <Input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="text-lg font-medium"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="period">Salary Period</Label>
            <Select
              value={period}
              onValueChange={setPeriod}
            >
              <SelectTrigger id="period" className="w-full">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={selectedCurrency}
              onValueChange={setSelectedCurrency}
            >
              <SelectTrigger id="currency" className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_COUNTRIES.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
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
            <Label htmlFor="hours-per-week">Hours Per Week</Label>
            <Input
              id="hours-per-week"
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="text-lg font-medium"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="days-per-week">Days Per Week</Label>
            <Input
              id="days-per-week"
              type="number"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value))}
              className="text-lg font-medium"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Hourly Rate:</span>
              <div className="text-xl font-bold">
                {formatInternationalCurrency(hourlyRate, selectedCurrency)}/hour
              </div>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Daily Rate:</span>
              <div className="text-xl font-bold">
                {formatInternationalCurrency(dailyRate, selectedCurrency)}/day
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <h3 className="text-md font-semibold">How it's calculated:</h3>
            <p className="text-sm text-muted-foreground">
              {period === 'yearly' ? 'Annual' : 'Monthly'} salary ÷ ({hoursPerWeek} hours × {period === 'yearly' ? '52 weeks' : '52 weeks ÷ 12'}) = Hourly rate
            </p>
            <p className="text-sm text-muted-foreground">
              {period === 'yearly' ? 'Annual' : 'Monthly'} salary ÷ ({daysPerWeek} days × {period === 'yearly' ? '52 weeks' : '52 weeks ÷ 12'}) = Daily rate
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryToHourlyCalculator;