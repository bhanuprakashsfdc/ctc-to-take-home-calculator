
import React from 'react';
import { Helmet } from 'react-helmet';
import HomeLoanCalculator from '@/components/HomeLoanCalculator';
import './HomeLoanCalculator.css';

const HomeLoanCalculatorPage: React.FC = () => {
  return (
    <div className="container">
      <Helmet>
        <title>Home Loan Calculator | CTC Calculator</title>
        <meta name="description" content="Calculate your monthly mortgage payments, total interest, and more with our easy-to-use home loan calculator." />
        <meta name="keywords" content="home loan calculator, mortgage calculator, home loan EMI, mortgage payment calculator" />
        <link rel="canonical" href="https://ctccalculator.com/home-loan-calculator.html" />
      </Helmet>
      
      <div className="calculator-wrapper">
        <div className="header-section">
          <h1 className="page-title">Home Loan Calculator</h1>
          <p className="page-description">
            Calculate your monthly mortgage payments, total interest, and more with our easy-to-use home loan calculator.
          </p>
        </div>
        
        <HomeLoanCalculator />
        
        <div className="content-section">
          <h2>How to Use the Home Loan Calculator</h2>
          <p>
            Our home loan calculator helps you estimate your monthly mortgage payments and understand the total cost of your loan. 
            Here's how to use it:
          </p>
          <ol>
            <li><strong>Enter the home price</strong> - The total cost of the property you're planning to purchase.</li>
            <li><strong>Adjust the down payment</strong> - The initial payment you'll make upfront (typically 5-20% of the home price).</li>
            <li><strong>Set the interest rate</strong> - The annual interest rate offered by your lender.</li>
            <li><strong>Choose the loan term</strong> - The number of years you'll take to repay the loan (typically 15-30 years).</li>
          </ol>
          
          <h2>Understanding Your Home Loan Results</h2>
          <p>
            The calculator provides three key pieces of information:
          </p>
          <ul>
            <li><strong>Monthly Payment</strong> - The amount you'll pay each month, including principal and interest.</li>
            <li><strong>Total Payment</strong> - The total amount you'll pay over the life of the loan.</li>
            <li><strong>Total Interest</strong> - The total interest you'll pay over the life of the loan.</li>
          </ul>
          
          <h2>Factors That Affect Your Mortgage Payment</h2>
          <p>
            Several factors can impact your monthly mortgage payment:
          </p>
          <ul>
            <li><strong>Loan Amount</strong> - A higher loan amount results in higher monthly payments.</li>
            <li><strong>Interest Rate</strong> - Higher interest rates increase your monthly payment and total interest paid.</li>
            <li><strong>Loan Term</strong> - Longer loan terms typically result in lower monthly payments but higher total interest paid.</li>
            <li><strong>Down Payment</strong> - A larger down payment reduces your loan amount and monthly payments.</li>
          </ul>
          
          <p>
            Remember that this calculator provides estimates only. Your actual mortgage payment may include additional costs 
            such as property taxes, homeowners insurance, and private mortgage insurance (PMI) if your down payment is less than 20%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanCalculatorPage;
