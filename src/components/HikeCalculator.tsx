import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatInternationalCurrency } from '@/utils/currencyService';
import { Link } from 'react-router-dom';

interface HikeCalculatorProps {
  className?: string;
}

const HikeCalculator: React.FC<HikeCalculatorProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  
  // Form state
  const [currentSalary, setCurrentSalary] = useState<number>(100000);
  const [newSalary, setNewSalary] = useState<number>(200000);
  const [hikePercentage, setHikePercentage] = useState<number>(100);
  const [calculationMode, setCalculationMode] = useState<'findPercentage' | 'findSalary'>('findPercentage');
  
  // Calculate results when inputs change
  useEffect(() => {
    if (calculationMode === 'findPercentage' && currentSalary && newSalary) {
      const percentage = ((newSalary - currentSalary) / currentSalary) * 100;
      setHikePercentage(Number(percentage.toFixed(2)));
    } else if (calculationMode === 'findSalary' && currentSalary && hikePercentage) {
      const calculatedNewSalary = currentSalary * (1 + hikePercentage / 100);
      setNewSalary(Number(calculatedNewSalary.toFixed(2)));
    }
  }, [currentSalary, newSalary, hikePercentage, calculationMode]);

  const handleModeChange = (mode: 'findPercentage' | 'findSalary') => {
    setCalculationMode(mode);
    if (mode === 'findSalary') {
      // Reset new salary when switching to salary calculation mode
      const calculatedNewSalary = currentSalary * (1 + hikePercentage / 100);
      setNewSalary(calculatedNewSalary);
    } else {
      // Reset hike percentage when switching to percentage calculation mode
      const percentage = ((newSalary - currentSalary) / currentSalary) * 100;
      setHikePercentage(Number(percentage.toFixed(2)));
    }
  };

  return (
    <Card className={`${className}`}>
      <CardContent className="pt-6 space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Salary Hike Calculator</h2>
          <p className="text-muted-foreground">
            Calculate your salary hike percentage or new salary after a raise
          </p>
        </div>

        <div className="space-y-6">
          {/* Calculation Mode Selection */}
          <div className="space-y-2">
            <Label>Calculation Mode</Label>
            <RadioGroup
              value={calculationMode}
              onValueChange={(value) => handleModeChange(value as 'findPercentage' | 'findSalary')}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="findPercentage" id="findPercentage" />
                <Label htmlFor="findPercentage" className="cursor-pointer">
                  Find Hike Percentage By Salary
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="findSalary" id="findSalary" />
                <Label htmlFor="findSalary" className="cursor-pointer">
                  Find New Salary by Hike Percentage
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Current Salary Input */}
          <div className="space-y-2">
            <Label htmlFor="currentSalary">Current Salary</Label>
            <Input
              id="currentSalary"
              type="number"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(Number(e.target.value))}
              className="text-lg font-medium"
            />
          </div>

          {/* Conditional Input based on Mode */}
          {calculationMode === 'findPercentage' ? (
            <div className="space-y-2">
              <Label htmlFor="newSalary">New Salary</Label>
              <Input
                id="newSalary"
                type="number"
                value={newSalary}
                onChange={(e) => setNewSalary(Number(e.target.value))}
                className="text-lg font-medium"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="hikePercentage">Hike Percentage (%)</Label>
              <Input
                id="hikePercentage"
                type="number"
                value={hikePercentage}
                onChange={(e) => setHikePercentage(Number(e.target.value))}
                className="text-lg font-medium"
              />
            </div>
          )}

          {/* Results Display */}
          <div className="pt-4 border-t">
            <div className="p-4 bg-muted rounded-lg text-center">
              <span className="text-sm text-muted-foreground">
                {calculationMode === 'findPercentage' ? 'Your Hike Percentage Is' : 'Your New Salary Will Be'}
              </span>
              <div className="text-2xl font-bold mt-1">
                {calculationMode === 'findPercentage' 
                  ? `${hikePercentage}%`
                  : formatInternationalCurrency(newSalary, 'US')}
              </div>
            </div>
          </div>

          {/* Calculation Explanation */}
          <div className="text-sm text-muted-foreground space-y-2">
            <h3 className="font-medium text-foreground">How it's calculated:</h3>
            {calculationMode === 'findPercentage' ? (
              <p>
                Hike % = ((New Salary - Current Salary) / Current Salary) × 100
              </p>
            ) : (
              <p>
                New Salary = Current Salary × (1 + Hike % / 100)
              </p>
            )}
          </div>
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
          <Link to="/swp-calculator.html" className="text-muted-foreground hover:text-finance-primary transition-colors">
            → SWP Calculator
          </Link>
          <Link to="/ppp-calculator.html" className="text-muted-foreground hover:text-finance-primary transition-colors">
            → PPP Converter
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default HikeCalculator;