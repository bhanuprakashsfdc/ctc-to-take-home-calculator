
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">About CTC Calculator</h1>
          </div>
          
          <div className="space-y-6">
            <p>
              CTC Calculator is a dedicated platform designed to help Indian employees understand their salary structure and take-home pay. Our mission is to provide transparency and clarity in salary calculations.
            </p>
            
            <h2 className="text-xl font-semibold">What is CTC?</h2>
            <p>
              Cost to Company (CTC) is the total amount of money a company spends on an employee in one year. It includes both direct benefits (like basic salary, allowances) and indirect benefits (like employer's PF contribution, gratuity, insurance premiums).
            </p>
            
            <h2 className="text-xl font-semibold">Our Story</h2>
            <p>
              Launched in {new Date().getFullYear()}, CTC Calculator was created by a team of finance and HR professionals who recognized the complexity of understanding salary structures in India. We saw the need for a simple yet comprehensive tool that would help employees understand their CTC breakdown.
            </p>
            
            <h2 className="text-xl font-semibold">How It Works</h2>
            <p>
              Our calculator uses the latest tax rules and salary structure standards to provide accurate calculations. Simply enter your CTC amount, and our tool will break it down into various components including basic salary, HRA, special allowance, and statutory deductions like PF, professional tax, and income tax.
            </p>
            
            <h2 className="text-xl font-semibold">Disclaimer</h2>
            <p>
              While we strive for accuracy, the calculations provided by this tool are for informational purposes only and should not be considered as financial advice. Tax regulations and salary structures may vary based on your specific circumstances and company policies.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
