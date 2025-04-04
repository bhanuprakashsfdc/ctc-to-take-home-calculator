
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, DollarSign, PieChart, FileText } from 'lucide-react';

const CTCDescription: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What is CTC to Take Home Salary?</h2>
        <p className="text-muted-foreground">
          Cost to Company (CTC) is the total amount of money a company spends on an employee annually in India. 
          It includes both direct benefits (like basic salary) and indirect benefits (like employer's PF contribution).
          Take home salary is what you actually receive in your bank account after all deductions from your CTC.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-highlight">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Calculator className="h-8 w-8 text-finance-primary mb-4" />
            <h3 className="font-semibold">CTC Breakdown</h3>
            <p className="text-sm text-muted-foreground">Understand how your CTC is structured with detailed breakdown of all components</p>
          </CardContent>
        </Card>
        
        <Card className="card-highlight">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <DollarSign className="h-8 w-8 text-finance-primary mb-4" />
            <h3 className="font-semibold">In-Hand Salary</h3>
            <p className="text-sm text-muted-foreground">Calculate your actual take home salary after all tax and PF deductions</p>
          </CardContent>
        </Card>
        
        <Card className="card-highlight">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <PieChart className="h-8 w-8 text-finance-primary mb-4" />
            <h3 className="font-semibold">Tax Optimization</h3>
            <p className="text-sm text-muted-foreground">Compare old vs new tax regime to maximize your in-hand salary</p>
          </CardContent>
        </Card>
        
        <Card className="card-highlight">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <FileText className="h-8 w-8 text-finance-primary mb-4" />
            <h3 className="font-semibold">Salary Structure</h3>
            <p className="text-sm text-muted-foreground">Includes EPF, income tax, HRA and all statutory components</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 space-y-4">
        <h2 className="text-2xl font-bold">CTC to Take Home Salary Calculation in India</h2>
        <p>
          Understanding the conversion from CTC to take home salary is essential for every Indian employee. Your CTC package typically includes:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Basic Salary:</strong> Usually 40-50% of CTC and forms the basis for many other calculations</li>
          <li><strong>HRA (House Rent Allowance):</strong> Tax-exempt component based on your city and rent paid</li>
          <li><strong>Special Allowance:</strong> Flexible component that makes up the remainder of your salary</li>
          <li><strong>PF Contribution:</strong> Both employee (12% of basic) and employer contributions</li>
          <li><strong>Gratuity:</strong> Long-term benefit paid after 5 years of service</li>
          <li><strong>Variable Pay:</strong> Performance-linked incentives or bonuses</li>
        </ul>
        <p>
          To calculate your take home salary from CTC, you need to subtract all deductions including income tax, employee's PF contribution, 
          and professional tax from your monthly gross salary. Our CTC to take home calculator automates this process for accurate results.
        </p>
      </div>
    </div>
  );
};

export default CTCDescription;
