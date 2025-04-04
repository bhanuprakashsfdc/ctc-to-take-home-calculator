
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Our CTC to Take Home Salary Calculator | How It Works</title>
        <meta name="description" content="Learn how our CTC to take home calculator works. Understand the methodology behind accurate in-hand salary calculations after all deductions for Indian employees." />
        <meta name="keywords" content="ctc to take home calculator, salary breakdown, take home salary calculation, in-hand salary, salary calculator india" />
        <link rel="canonical" href="https://www.ctc-calculator.com/about.html" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">About CTC to Take Home Salary Calculator</h1>
          </div>
          
          <div className="space-y-6">
            <p>
              Our CTC to Take Home Salary Calculator is the most trusted platform designed specifically for Indian employees to understand their salary structure and accurately calculate in-hand pay. Our mission is to provide transparency and clarity in salary calculations for professionals across India.
            </p>
            
            <h2 className="text-xl font-semibold">What is CTC vs Take Home Salary in India?</h2>
            <p>
              Cost to Company (CTC) is the total amount of money a company spends on an employee in one year in India. It includes both direct benefits (like basic salary, allowances) and indirect benefits (like employer's PF contribution, gratuity, insurance premiums). Take home salary is the actual amount you receive in your bank account after all deductions including income tax, employee PF contribution, and professional tax.
            </p>
            
            <h2 className="text-xl font-semibold">Our Story</h2>
            <p>
              Launched in 2023, our CTC to Take Home Salary Calculator was created by a team of finance and HR professionals who recognized the complexity of understanding salary structures in India. We saw the need for a simple yet comprehensive tool that would help employees understand their CTC breakdown and accurately calculate their in-hand salary according to Indian tax laws.
            </p>
            
            <h2 className="text-xl font-semibold">How Our CTC to Take Home Calculator Works</h2>
            <p>
              Our calculator uses the latest Indian tax rules and salary structure standards to provide accurate calculations. Simply enter your CTC amount, and our tool will break it down into various components including basic salary, HRA, special allowance, and statutory deductions like PF, professional tax, and income tax – giving you your exact take home salary as per Indian payroll standards.
            </p>
            
            <h2 className="text-xl font-semibold">Why Choose Our CTC to Take Home Salary Calculator</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Accurate calculations based on latest Indian tax laws (2023-24)</li>
              <li>Support for both old and new tax regimes as per Indian budget</li>
              <li>Detailed breakdown of all salary components as per standard Indian salary structure</li>
              <li>User-friendly interface with instant results</li>
              <li>Completely free to use with no registration required</li>
              <li>Privacy-focused - no salary data is stored</li>
            </ul>
            
            <div className="bg-muted p-6 rounded-lg my-8">
              <h2 className="text-xl font-semibold mb-4">CTC to Take Home Calculator: Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <span className="text-finance-primary font-bold mr-2">✓</span>
                  <span>Basic salary calculation (50% of CTC as per standard)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-finance-primary font-bold mr-2">✓</span>
                  <span>HRA calculation based on metro/non-metro cities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-finance-primary font-bold mr-2">✓</span>
                  <span>Professional tax as per state regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-finance-primary font-bold mr-2">✓</span>
                  <span>EPF calculations (12% of basic)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-finance-primary font-bold mr-2">✓</span>
                  <span>Income tax calculation with slab rates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-finance-primary font-bold mr-2">✓</span>
                  <span>Special allowance computation</span>
                </li>
              </ul>
            </div>
            
            <h2 className="text-xl font-semibold">Disclaimer</h2>
            <p>
              While we strive for accuracy, the calculations provided by this CTC to take home salary tool are for informational purposes only and should not be considered as financial advice. Tax regulations and salary structures may vary based on your specific circumstances and company policies in India.
            </p>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/" className="bg-finance-primary hover:bg-finance-primary/90 text-white py-3 px-6 rounded-md font-medium transition-colors">
              Calculate Your CTC to Take Home Salary Now
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
