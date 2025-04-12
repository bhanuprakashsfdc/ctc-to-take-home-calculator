
import React from 'react';

interface LoanSummaryProps {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  formatCurrency: (value: number) => string;
}

const LoanSummary: React.FC<LoanSummaryProps> = ({
  monthlyPayment,
  totalPayment,
  totalInterest,
  formatCurrency
}) => {
  return (
    <div className="mt-6 p-4 bg-muted rounded-lg space-y-4">
      <h3 className="text-xl font-semibold text-center">Loan Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-background rounded-md">
          <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
          <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
        </div>
        
        <div className="p-3 bg-background rounded-md">
          <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
          <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
        </div>
        
        <div className="p-3 bg-background rounded-md">
          <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
          <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;
