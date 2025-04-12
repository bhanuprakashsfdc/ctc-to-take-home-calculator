import React from 'react';
import { Helmet } from 'react-helmet';
import EducationLoanCalculator from '@/components/EducationLoanCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EducationLoanCalculatorPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
      <Helmet>
        <title>Education Loan Calculator | CTC Calculator</title>
        <meta name="description" content="Calculate your student loan payments, total interest, and more with our easy-to-use education loan calculator." />
        <meta name="keywords" content="education loan calculator, student loan calculator, student loan EMI, education finance calculator" />
        <link rel="canonical" href="https://www.ctccalculator.com/education-loan-calculator.html" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Education Loan Calculator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate your student loan payments, total interest, and more with our easy-to-use education loan calculator.
          </p>
        </div>
        
        <EducationLoanCalculator />
        
        <div className="prose dark:prose-invert max-w-none">
          <h2>How to Use the Education Loan Calculator</h2>
          <p>
            Our education loan calculator helps you estimate your monthly student loan payments and understand the total cost of your loan. 
            Here's how to use it:
          </p>
          <ol>
            <li><strong>Enter the loan amount</strong> - The total amount you need to borrow for your education.</li>
            <li><strong>Set the interest rate</strong> - The annual interest rate offered by your lender.</li>
            <li><strong>Choose the loan term</strong> - The number of years you'll take to repay the loan (typically 5-25 years).</li>
            <li><strong>Defer payments option</strong> - Select if you want to defer payments during your school period.</li>
            <li><strong>School period</strong> - If deferring payments, specify how many years you'll be in school.</li>
          </ol>
          
          <h2>Understanding Your Education Loan Results</h2>
          <p>
            The calculator provides several key pieces of information:
          </p>
          <ul>
            <li><strong>Monthly Payment</strong> - The amount you'll pay each month after graduation.</li>
            <li><strong>Total Payment</strong> - The total amount you'll pay over the life of the loan.</li>
            <li><strong>Total Interest</strong> - The total interest you'll pay over the life of the loan.</li>
            <li><strong>Deferred Interest</strong> - If you defer payments during school, this shows the interest that accrues during that period.</li>
          </ul>
          
          <h2>Factors That Affect Your Education Loan Payment</h2>
          <p>
            Several factors can impact your monthly student loan payment:
          </p>
          <ul>
            <li><strong>Loan Amount</strong> - A higher loan amount results in higher monthly payments.</li>
            <li><strong>Interest Rate</strong> - Higher interest rates increase your monthly payment and total interest paid.</li>
            <li><strong>Loan Term</strong> - Longer loan terms typically result in lower monthly payments but higher total interest paid.</li>
            <li><strong>Deferment Period</strong> - Deferring payments during school adds interest to your principal, increasing your total loan cost.</li>
            <li><strong>Credit Score</strong> - For private student loans, a better credit score can help you qualify for lower interest rates.</li>
          </ul>
          
          <h2>Types of Education Loans</h2>
          <p>
            There are several types of education loans available:
          </p>
          <ul>
            <li><strong>Federal Student Loans</strong> - Government-backed loans with fixed interest rates and various repayment options.</li>
            <li><strong>Private Student Loans</strong> - Loans from banks or financial institutions, often with variable interest rates.</li>
            <li><strong>Parent PLUS Loans</strong> - Federal loans that parents can take out to pay for their child's education.</li>
            <li><strong>Graduate PLUS Loans</strong> - Federal loans for graduate or professional students.</li>
          </ul>
          
          <p>
            Remember that this calculator provides estimates only. Your actual education loan terms may vary based on your credit score, 
            the type of loan, and the lender's policies. It's always a good idea to explore federal student loan options before 
            considering private loans, as federal loans typically offer more flexible repayment plans and forgiveness options.
          </p>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default EducationLoanCalculatorPage;