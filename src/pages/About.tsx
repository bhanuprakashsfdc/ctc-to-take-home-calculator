
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Our CTC to Take Home Salary Calculator | How It Works</title>
        <meta name="description" content="Learn how our CTC to take home salary calculator works. Understand the methodology behind accurate in-hand salary calculations after all deductions." />
        <meta name="keywords" content="ctc to take home calculator, salary breakdown, take home salary calculation, in-hand salary" />
        <link rel="canonical" href="https://ctc-calculator.com/about.html" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">About CTC to Take Home Salary Calculator</h1>
          </div>
          
          <div className="space-y-6">
            <p>
              Our CTC to Take Home Salary Calculator is a dedicated platform designed to help Indian employees understand their salary structure and accurately calculate in-hand pay. Our mission is to provide transparency and clarity in salary calculations.
            </p>
            
            <h2 className="text-xl font-semibold">What is CTC vs Take Home Salary?</h2>
            <p>
              Cost to Company (CTC) is the total amount of money a company spends on an employee in one year. It includes both direct benefits (like basic salary, allowances) and indirect benefits (like employer's PF contribution, gratuity, insurance premiums). Take home salary is the actual amount you receive in your bank account after all deductions.
            </p>
            
            <h2 className="text-xl font-semibold">Our Story</h2>
            <p>
              Launched in {new Date().getFullYear()}, our CTC to Take Home Salary Calculator was created by a team of finance and HR professionals who recognized the complexity of understanding salary structures in India. We saw the need for a simple yet comprehensive tool that would help employees understand their CTC breakdown and accurately calculate their in-hand salary.
            </p>
            
            <h2 className="text-xl font-semibold">How Our CTC to Take Home Calculator Works</h2>
            <p>
              Our calculator uses the latest tax rules and salary structure standards to provide accurate calculations. Simply enter your CTC amount, and our tool will break it down into various components including basic salary, HRA, special allowance, and statutory deductions like PF, professional tax, and income tax – giving you your exact take home salary.
            </p>
            
            <h2 className="text-xl font-semibold">Why Choose Our CTC to Take Home Salary Calculator</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Accurate calculations based on latest tax laws</li>
              <li>Support for both old and new tax regimes</li>
              <li>Detailed breakdown of all salary components</li>
              <li>User-friendly interface with instant results</li>
              <li>Completely free to use with no registration required</li>
              <li>Privacy-focused - no salary data is stored</li>
            </ul>
            
            <h2 className="text-xl font-semibold">Disclaimer</h2>
            <p>
              While we strive for accuracy, the calculations provided by this CTC to take home salary tool are for informational purposes only and should not be considered as financial advice. Tax regulations and salary structures may vary based on your specific circumstances and company policies.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
