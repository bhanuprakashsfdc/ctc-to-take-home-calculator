import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InternationalCTCCalculatorForm from '@/components/InternationalCTCCalculatorForm';
import CTCDescription from '@/components/CTCDescription';
import CTCSEOContent from '@/components/CTCSEOContent';

const UKPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Salary to Take Home Calculator - UK | Calculate UK Net Pay</title>
        <meta name="description" content="Calculate your accurate take-home pay in the United Kingdom from your annual salary. Our calculator includes detailed breakdowns for UK income tax (PAYE), National Insurance, and pension contributions." />
        <link rel="canonical" href="https://www.ctc-calculator.com/uk.html" />
        {/* Add UK-specific Meta tags and JSON-LD if needed */}
      </Helmet>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">United Kingdom: Salary to Take Home Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your net pay in the UK after Income Tax and National Insurance.
            </p>
          </div>

          <div id="calculator-section">
            {/* Defaulting country to UK for this page */}
            <InternationalCTCCalculatorForm defaultCountry="UK" />
          </div>

          {/* Optional: Add UK-specific content sections here */}
          {/* Consider adapting CTCDescription and CTCSEOContent or creating UK specific ones */}
          <CTCDescription />
          <CTCSEOContent />

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UKPage;