import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InternationalCTCCalculatorForm from '@/components/InternationalCTCCalculatorForm';
import CTCDescription from '@/components/CTCDescription';
import CTCSEOContent from '@/components/CTCSEOContent';

const IndiaPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>CTC to Take Home Salary Calculator - India | Calculate Indian In-Hand Pay</title>
        <meta name="description" content="Calculate your accurate take-home salary in India from your CTC package. Our calculator includes detailed breakdowns for Indian tax regulations, PF, and other deductions." />
        <link rel="canonical" href="https://www.ctc-calculator.com/in.html" />
        {/* Add India-specific Meta tags and JSON-LD if needed */}
      </Helmet>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">India: CTC to Take Home Salary Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your in-hand salary in India based on the latest tax rules.
            </p>
          </div>

          <div id="calculator-section">
            {/* Defaulting country to India for this page */}
            <InternationalCTCCalculatorForm defaultCountry="IN" />
          </div>

          {/* Optional: Add India-specific content sections here */}
          <CTCDescription />
          <CTCSEOContent />

        </div>
      </main>

      <Footer />
    </div>
      );
    };
    
export default IndiaPage;