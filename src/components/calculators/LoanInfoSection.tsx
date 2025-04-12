
import React from 'react';

interface LoanInfoSectionProps {
  loanType: 'home' | 'car';
}

const LoanInfoSection: React.FC<LoanInfoSectionProps> = ({ loanType }) => {
  const isHomeLoan = loanType === 'home';
  
  return (
    <div className="text-sm text-muted-foreground space-y-2 border-t pt-4">
      <h3 className="font-medium text-foreground">
        {isHomeLoan ? 'About Home Loans' : 'About Car Loans'}
      </h3>
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
    </div>
  );
};

export default LoanInfoSection;
