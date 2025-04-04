
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  calculateSalaryBreakdown, 
  calculateIncomeTax, 
  formatCurrency 
} from '@/utils/salaryCalculator';

const CTCCalculatorForm: React.FC = () => {
  const [ctc, setCtc] = useState<number>(1500000);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [section80C, setSection80C] = useState<number | "">("");
  const [section80D, setSection80D] = useState<number | "">("");
  const [housingLoan, setHousingLoan] = useState<number | "">("");
  const [nps, setNps] = useState<number | "">("");
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  
  // Calculate salary breakdown based on inputs
  const salaryBreakdown = calculateSalaryBreakdown(ctc);
  
  // Calculate income tax - convert empty string to 0 for calculation
  const incomeTax = calculateIncomeTax({
    annualSalary: salaryBreakdown.grossSalary,
    taxRegime,
    section80C: typeof section80C === 'string' ? 0 : section80C,
    section80D: typeof section80D === 'string' ? 0 : section80D,
    housingLoan: typeof housingLoan === 'string' ? 0 : housingLoan,
    nps: typeof nps === 'string' ? 0 : nps,
  });
  
  // Total deductions including income tax
  const totalDeductions = salaryBreakdown.totalDeductions + incomeTax;
  
  // Final in-hand salary after all deductions
  const finalNetSalary = salaryBreakdown.grossSalary - totalDeductions;
  
  // Format numbers for display, based on view mode (monthly/yearly)
  const getDisplayValue = (value: number) => {
    const displayValue = viewMode === 'monthly' ? value / 12 : value;
    return formatCurrency(Math.round(displayValue));
  };

  // Handle numeric input change with empty string support
  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number | "">>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "") {
        setter("");
      } else {
        setter(Number(value));
      }
    };

  return (
    <div className="space-y-6 ctc-calculator">
      <Card className="card-highlight">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ctc">Annual Cost to Company (CTC)</Label>
              <Input
                id="ctc"
                type="number"
                value={ctc}
                onChange={(e) => setCtc(Number(e.target.value))}
                className="text-lg font-medium"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="viewMode">View Mode</Label>
              <div className="flex items-center space-x-2">
                <Label htmlFor="viewMode" className={`${viewMode === 'monthly' ? 'text-finance-primary font-medium' : ''}`}>
                  Monthly
                </Label>
                <Switch
                  id="viewMode"
                  checked={viewMode === 'yearly'}
                  onCheckedChange={(checked) => setViewMode(checked ? 'yearly' : 'monthly')}
                />
                <Label htmlFor="viewMode" className={`${viewMode === 'yearly' ? 'text-finance-primary font-medium' : ''}`}>
                  Yearly
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-highlight">
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold text-finance-primary">Earnings</h2>
            
            <div className="space-y-2">
              <div className="result-row">
                <span className="result-label">Basic Salary</span>
                <span className="result-value addition">{getDisplayValue(salaryBreakdown.basic)}</span>
              </div>
              
              <div className="result-row">
                <span className="result-label">HRA</span>
                <span className="result-value addition">{getDisplayValue(salaryBreakdown.hra)}</span>
              </div>
              
              <div className="result-row">
                <span className="result-label">Special Allowance</span>
                <span className="result-value addition">{getDisplayValue(salaryBreakdown.specialAllowance)}</span>
              </div>
              
              <div className="result-row font-bold">
                <span className="result-label">Gross Salary</span>
                <span className="result-value addition">{getDisplayValue(salaryBreakdown.grossSalary)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-highlight">
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold text-finance-warning">Deductions</h2>
            
            <div className="space-y-2">
              <div className="result-row">
                <span className="result-label">EPF (Employee)</span>
                <span className="result-value deduction">{getDisplayValue(salaryBreakdown.epfEmployee)}</span>
              </div>
              
              <div className="result-row">
                <span className="result-label">Professional Tax</span>
                <span className="result-value deduction">{getDisplayValue(salaryBreakdown.professionalTax)}</span>
              </div>
              
              <div className="result-row">
                <span className="result-label">Income Tax (TDS)</span>
                <span className="result-value deduction">{getDisplayValue(incomeTax)}</span>
              </div>
              
              <div className="result-row font-bold">
                <span className="result-label">Total Deductions</span>
                <span className="result-value deduction">{getDisplayValue(totalDeductions)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-highlight bg-finance-primary text-white">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-xl font-bold mb-2 md:mb-0">Net Take-Home Salary</h2>
            <div className="text-2xl font-bold">{getDisplayValue(finalNetSalary)}</div>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        variant="outline" 
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full"
      >
        {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
      </Button>
      
      {showAdvanced && (
        <Card className="card-highlight">
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">Tax Options</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tax Regime</Label>
                <RadioGroup 
                  value={taxRegime} 
                  onValueChange={(value) => setTaxRegime(value as 'old' | 'new')}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">New Tax Regime (Lower rates, no deductions)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="old" id="old" />
                    <Label htmlFor="old">Old Tax Regime (Higher rates with deductions)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {taxRegime === 'old' && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-medium">Tax Saving Investments & Deductions</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="section80c">Section 80C (PF, ELSS, etc.)</Label>
                    <Input
                      id="section80c"
                      type="number"
                      value={section80C}
                      onChange={handleNumberChange(setSection80C)}
                      placeholder="Enter amount"
                      max={150000}
                    />
                    <p className="text-xs text-muted-foreground">Max: ₹1,50,000</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="section80d">Section 80D (Health Insurance)</Label>
                    <Input
                      id="section80d"
                      type="number"
                      value={section80D}
                      onChange={handleNumberChange(setSection80D)}
                      placeholder="Enter amount"
                      max={25000}
                    />
                    <p className="text-xs text-muted-foreground">Max: ₹25,000</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="housingLoan">Home Loan Interest</Label>
                    <Input
                      id="housingLoan"
                      type="number"
                      value={housingLoan}
                      onChange={handleNumberChange(setHousingLoan)}
                      placeholder="Enter amount"
                      max={200000}
                    />
                    <p className="text-xs text-muted-foreground">Max: ₹2,00,000</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nps">NPS Contribution</Label>
                    <Input
                      id="nps"
                      type="number"
                      value={nps}
                      onChange={handleNumberChange(setNps)}
                      placeholder="Enter amount"
                      max={50000}
                    />
                    <p className="text-xs text-muted-foreground">Max: ₹50,000</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CTCCalculatorForm;
