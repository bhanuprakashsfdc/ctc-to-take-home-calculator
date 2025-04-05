
import React from 'react';

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
          For most Indian employees, understanding the difference between CTC and take home salary is crucial for financial planning. 
          CTC (Cost to Company) represents the total expense a company bears for an employee, while take home salary is what actually 
          gets credited to your bank account after all deductions.
        </p>
        
        <h3 className="text-xl font-semibold">Components of CTC in India</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-1">Fixed Components:</h4>
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
        
        <h3 className="text-xl font-semibold">Major Deductions from CTC</h3>
        <p>
          When converting CTC to take home salary, these are the major deductions that reduce your in-hand amount:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Income Tax:</strong> Based on your applicable tax slab (old or new regime)</li>
          <li><strong>Employee's PF Contribution:</strong> 12% of your basic salary</li>
          <li><strong>Professional Tax:</strong> Varies by state, typically between ₹200-300 per month</li>
          <li><strong>Health Insurance Premium:</strong> Either ESI (if applicable) or company-provided insurance</li>
          <li><strong>Other Deductions:</strong> Company-specific deductions like canteen charges, transport facility fees, etc.</li>
        </ul>
        
        <h3 className="text-xl font-semibold">Sample CTC to Take Home Calculation</h3>
        <div className="bg-muted p-4 rounded-lg">
          <p className="font-medium">For a CTC of ₹10,00,000 per annum:</p>
          <ul className="list-none space-y-1">
            <li>- Basic Salary (50% of CTC): ₹5,00,000 per annum</li>
            <li>- HRA (40% of Basic): ₹2,00,000 per annum</li>
            <li>- Special Allowance: ₹2,00,000 per annum</li>
            <li>- Employer's PF (12% of Basic): ₹60,000 per annum</li>
            <li>- Gratuity Provision: ₹24,000 per annum</li>
            <li>- Other Benefits: ₹16,000 per annum</li>
            <li className="border-t pt-1 mt-1">= Monthly Gross: ₹75,833</li>
            <li>- Employee's PF (12% of Basic): ₹5,000 per month</li>
            <li>- Income Tax (approx.): ₹3,500 per month</li>
            <li>- Professional Tax: ₹200 per month</li>
            <li className="font-medium">= Monthly Take Home: ₹67,133</li>
          </ul>
        </div>
      
        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold mb-2">Want to know your exact take home salary?</h3>
          <button onClick={scrollToCalculator} className="bg-finance-primary hover:bg-finance-primary/90 text-white py-2 px-4 rounded-md font-medium transition-colors inline-block">
            Use our CTC to Take Home Calculator
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTCSEOContent;
