
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, DollarSign, PieChart, FileText } from 'lucide-react';

const CTCDescription: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What is CTC?</h2>
        <p className="text-muted-foreground">
          Cost to Company (CTC) is the total amount of money a company spends on an employee annually. 
          It includes both direct benefits (like basic salary) and indirect benefits (like employer's PF contribution).
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-highlight">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Calculator className="h-8 w-8 text-finance-primary mb-4" />
            <h3 className="font-semibold">Salary Breakdown</h3>
            <p className="text-sm text-muted-foreground">Understand how your CTC is structured with detailed breakdown</p>
          </CardContent>
        </Card>
        
        <Card className="card-highlight">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <DollarSign className="h-8 w-8 text-finance-primary mb-4" />
            <h3 className="font-semibold">Take-home Salary</h3>
            <p className="text-sm text-muted-foreground">Calculate your actual in-hand salary after all deductions</p>
          </CardContent>
        </Card>
        
        <Card className="card-highlight">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <PieChart className="h-8 w-8 text-finance-primary mb-4" />
            <h3 className="font-semibold">Tax Planning</h3>
            <p className="text-sm text-muted-foreground">Compare tax regimes and optimize your tax deductions</p>
          </CardContent>
        </Card>
        
        <Card className="card-highlight">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <FileText className="h-8 w-8 text-finance-primary mb-4" />
            <h3 className="font-semibold">Accurate Breakdown</h3>
            <p className="text-sm text-muted-foreground">Includes EPF, income tax, and all statutory deductions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CTCDescription;
