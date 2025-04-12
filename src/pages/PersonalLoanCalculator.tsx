import React from 'react';
import { Helmet } from 'react-helmet';
import PersonalLoanCalculator from '@/components/PersonalLoanCalculator';

const PersonalLoanCalculatorPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Helmet>
        <title>Personal Loan Calculator | CTC Calculator</title>
        <meta name="description" content="Calculate your monthly personal loan payments, total interest, and more with our easy-to-use personal loan calculator." />
        <meta name="keywords" content="personal loan calculator, personal loan EMI, loan payment calculator, unsecured loan calculator" />
        <link rel="canonical" href="https://www.ctccalculator.com/personal-loan-calculator.html" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Personal Loan Calculator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate your monthly personal loan payments, total interest, and more with our easy-to-use personal loan calculator.
          </p>
        </div>
        
        <PersonalLoanCalculator />
        
        <div className="prose dark:prose-invert max-w-none">
          <h2>How to Use the Personal Loan Calculator</h2>
          <p>
            Our personal loan calculator helps you estimate your monthly payments and understand the total cost of your loan. 
            Here's how to use it:
          </p>
          <ol>
            <li><strong>Enter the loan amount</strong> - The total amount you want to borrow.</li>
            <li><strong>Set the interest rate</strong> - The annual interest rate offered by your lender.</li>
            <li><strong>Choose the loan term</strong> - The number of years you'll take to repay the loan (typically 1-7 years).</li>
          </ol>
          
          <h2>Understanding Your Personal Loan Results</h2>
          <p>
            The calculator provides three key pieces of information:
          </p>
          <ul>
            <li><strong>Monthly Payment</strong> - The amount you'll pay each month, including principal and interest.</li>
            <li><strong>Total Payment</strong> - The total amount you'll pay over the life of the loan.</li>
            <li><strong>Total Interest</strong> - The total interest you'll pay over the life of the loan.</li>
          </ul>
          
          <h2>Factors That Affect Your Personal Loan Payment</h2>
          <p>
            Several factors can impact your monthly personal loan payment:
          </p>
          <ul>
            <li><strong>Loan Amount</strong> - A higher loan amount results in higher monthly payments.</li>
            <li><strong>Interest Rate</strong> - Higher interest rates increase your monthly payment and total interest paid.</li>
            <li><strong>Loan Term</strong> - Longer loan terms typically result in lower monthly payments but higher total interest paid.</li>
            <li><strong>Credit Score</strong> - A better credit score can help you qualify for lower interest rates.</li>
          </ul>
          
          <h2>Common Uses for Personal Loans</h2>
          <p>
            Personal loans can be used for various purposes, including:
          </p>
          <ul>
            <li><strong>Debt Consolidation</strong> - Combining multiple high-interest debts into a single, lower-interest loan.</li>
            <li><strong>Home Improvements</strong> - Financing renovations or repairs to your home.</li>
            <li><strong>Major Purchases</strong> - Paying for large expenses like appliances or furniture.</li>
            <li><strong>Medical Expenses</strong> - Covering healthcare costs not covered by insurance.</li>
            <li><strong>Wedding Expenses</strong> - Financing wedding costs.</li>
          </ul>
          
          <p>
            Remember that this calculator provides estimates only. Your actual personal loan terms may vary based on your credit score, 
            income, and the lender's policies. It's always a good idea to shop around and compare offers from multiple lenders before 
            making a decision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanCalculatorPage;