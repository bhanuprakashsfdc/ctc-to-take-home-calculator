
import React from 'react';
import Header from '@/components/Header';
import CTCCalculatorForm from '@/components/CTCCalculatorForm';
import CTCDescription from '@/components/CTCDescription';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>CTC to Take Home Salary Calculator | Calculate Actual In-Hand Salary</title>
        <meta name="description" content="Calculate your CTC to take home salary with our free online calculator. Get accurate in-hand salary breakdown after tax, PF and other deductions." />
        <meta name="keywords" content="ctc to take home calculator, salary calculator, in-hand salary, cost to company, net salary, take home pay calculator" />
        <link rel="canonical" href="https://ctc-calculator.com/" />
        <meta property="og:title" content="CTC to Take Home Salary Calculator | Calculate Actual In-Hand Salary" />
        <meta property="og:description" content="Calculate your CTC to take home salary with our free online calculator. Get accurate in-hand salary breakdown after tax, PF and other deductions." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="CTC to Take Home Salary Calculator | Calculate Actual In-Hand Salary" />
        <meta name="twitter:description" content="Calculate your CTC to take home salary with our free online calculator. Get accurate in-hand salary breakdown after tax, PF and other deductions." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">CTC to Take Home Salary Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your in-hand salary and understand your CTC to take home pay breakdown
            </p>
          </div>
          
          <CTCCalculatorForm />
          
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">How to Calculate CTC to Take Home Salary?</h2>
            <p className="mb-4">
              Converting your CTC (Cost to Company) to take home salary involves accounting for various deductions such as:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Income Tax based on your tax slab</li>
              <li>Employee Provident Fund (EPF) contributions (12% of basic)</li>
              <li>Professional Tax (varies by state)</li>
              <li>Health Insurance premiums</li>
              <li>Other company-specific deductions</li>
            </ul>
            <p className="mb-4">
              Our CTC to take home calculator automatically computes these deductions to show you the exact amount you'll receive in your bank account each month.
            </p>
            <h3 className="text-xl font-semibold mb-3">Why Trust Our CTC to Take Home Calculator?</h3>
            <p>
              Our calculator is updated with the latest tax regulations and provides accurate calculations based on current financial year rules. Simply enter your CTC amount to get a detailed breakdown of your in-hand salary.
            </p>
          </section>
          
          <CTCDescription />

          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">What is the difference between CTC and take home salary?</h3>
                <p className="text-muted-foreground">
                  CTC (Cost to Company) is the total expense a company incurs for an employee, including all benefits, allowances, and contributions. Take home salary is the actual amount an employee receives after all deductions like income tax, provident fund, etc.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">How is in-hand salary calculated from CTC?</h3>
                <p className="text-muted-foreground">
                  To calculate in-hand salary, subtract all deductions (taxes, EPF, professional tax, etc.) from your monthly gross salary. Our CTC to take home calculator does this automatically for you.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">What percentage of CTC is take home salary typically?</h3>
                <p className="text-muted-foreground">
                  Generally, take home salary ranges between 60-80% of your CTC, depending on your salary structure, tax regime choice, and eligible deductions.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Does the calculator work for both old and new tax regimes?</h3>
                <p className="text-muted-foreground">
                  Yes, our CTC to take home calculator supports both old and new tax regimes, giving you the flexibility to compare and choose the best option.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
