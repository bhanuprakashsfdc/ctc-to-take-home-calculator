
import React from 'react';
import { Link } from 'react-router-dom';

const CTCSEOContent: React.FC = () => {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculator-section');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-6 py-4">
      <h2 className="text-2xl font-bold">Understanding CTC to Take Home Salary Conversion</h2>
      
      <div className="space-y-4">
        <p>
          Understanding the difference between CTC (Cost to Company) and take home salary is crucial for financial planning, wherever you work. 
          CTC represents the total expense a company bears for an employee, while take home salary is the net amount 
          credited to your bank account after all applicable deductions.
        </p>
        
        <h3 className="text-xl font-semibold">Common Components of CTC</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-1">Typical Fixed Components:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Basic Salary (typically 40-50% of CTC)</li>
              <li>House Rent Allowance (HRA)</li>
              <li>Dearness Allowance (DA)</li>
              <li>Conveyance Allowance</li>
              <li>Medical Allowance</li>
              <li>Special Allowance</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Variable Components:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Performance Bonus</li>
              <li>Employer's PF Contribution</li>
              <li>Gratuity</li>
              <li>Health Insurance Premium</li>
              <li>Leave Travel Allowance (LTA)</li>
              <li>Food Coupons/Meal Vouchers</li>
            </ul>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold">Major Deductions from Gross Salary</h3>
        <p>
          The primary deductions that reduce your take home pay vary significantly by country but often include:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Income Tax:</strong> Federal/National and sometimes State/Provincial taxes based on local laws. Learn more in our <Link to="/blog/income-tax-calculation-india.html" className="text-finance-primary hover:underline">Income Tax Calculation Guide</Link>.</li>
          <li><strong>Social Security / Pension Contributions:</strong> Mandatory contributions (e.g., EPF, 401k, National Insurance). Check our <Link to="/blog/pf-calculator.html" className="text-finance-primary hover:underline">PF Calculator Guide</Link>.</li>
          <li><strong>Mandatory Health Insurance:</strong> Premiums or related taxes for public/private health systems.</li>
          <li><strong>Other Statutory Deductions:</strong> Country or region-specific mandatory deductions.</li>
          <li><strong>Voluntary Deductions:</strong> Optional deductions like loan repayments, additional insurance, etc.</li>
        </ul>
        
        <h3 className="text-xl font-semibold">Example Calculation (Simplified)</h3>
        <div className="bg-muted p-4 rounded-lg">
          <p>
            Calculating take-home pay involves subtracting country-specific deductions from gross salary (which is derived from CTC). Learn more about the <Link to="/blog/gross-vs-net-salary.html" className="text-finance-primary hover:underline">difference between gross and net salary</Link>.
          </p>
          <p className="mt-2">
            For instance, if your gross monthly salary is $5,000 in a specific country, deductions might include income tax (e.g., $800), social security (e.g., $300), and health insurance contributions (e.g., $100), resulting in a take-home pay of $3,800.
          </p>
          <p className="mt-2 italic text-sm">
            Note: This is a generic example. Tax rates, contribution percentages, and types of deductions vary greatly by country. Use the calculator and select your country for a more accurate estimation. For international comparisons, try our <Link to="/ppp-calculator.html" className="text-finance-primary hover:underline">Purchasing Power Parity Calculator</Link>.
          </p>
        </div>
      
        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold mb-2">Want to estimate your take home salary?</h3>
          <button onClick={scrollToCalculator} className="bg-finance-primary hover:bg-finance-primary/90 text-white py-2 px-4 rounded-md font-medium transition-colors inline-block">
            Use Our Global CTC Calculator
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTCSEOContent;
