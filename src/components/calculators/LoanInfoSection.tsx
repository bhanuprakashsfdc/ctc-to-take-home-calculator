
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface LoanInfoSectionProps {
  loanType: 'home' | 'car';
}

const LoanInfoSection: React.FC<LoanInfoSectionProps> = ({ loanType }) => {
  const isHomeLoan = loanType === 'home';
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="text-sm text-muted-foreground space-y-2 border-t pt-4 mt-4">
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <h3 className="font-medium text-foreground">
            {isHomeLoan ? 'About Home Loans' : 'About Car Loans'}
          </h3>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>
      
      {expanded && (
        <div className="animate-accordion-down pt-2 space-y-2">
          <p>
            {isHomeLoan 
              ? 'A home loan or mortgage is a long-term loan used to finance the purchase of a property. The monthly payment includes both principal and interest, and is calculated based on the loan amount, interest rate, and term length.'
              : 'A car loan is a type of installment loan used to purchase a vehicle. The lender pays for the car upfront, and you repay the loan over time with interest. The monthly payment includes both principal and interest.'
            }
          </p>
          <p>
            The down payment is the initial upfront payment you make when purchasing a 
            {isHomeLoan ? ' home' : ' car'}. A larger down payment 
            typically results in lower monthly payments and less interest paid over the life of the loan.
          </p>
          <div className="p-3 bg-muted/50 rounded-md mt-2">
            <h4 className="font-medium text-foreground text-xs mb-1">Pro Tips:</h4>
            <ul className="list-disc list-inside text-xs space-y-1">
              <li>Increasing your down payment can significantly reduce your monthly payments</li>
              <li>A shorter loan term means higher monthly payments but less total interest</li>
              <li>Even a small reduction in interest rate can save you thousands over the loan term</li>
              {isHomeLoan && <li>Consider extra payments to reduce your loan term and save on interest</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanInfoSection;
