import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InternationalCTCCalculatorForm from '@/components/InternationalCTCCalculatorForm';
import CTCDescription from '@/components/CTCDescription';
import CTCSEOContent from '@/components/CTCSEOContent';

const USPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>CTC to Take Home Salary Calculator - USA | Calculate US In-Hand Pay</title>
        <meta name="description" content="Calculate your accurate take-home salary in the United States from your CTC or annual salary. Our calculator includes detailed breakdowns for US federal & state taxes, 401k, and other deductions." />
        <link rel="canonical" href="https://www.ctc-calculator.com/us.html" />
        {/* Add US-specific Meta tags and JSON-LD if needed */}
      </Helmet>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">USA: CTC to Take Home Salary Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your take-home pay in the United States after federal and state taxes.
            </p>
          </div>

          <div id="calculator-section">
            {/* Defaulting country to US for this page */}
            <InternationalCTCCalculatorForm defaultCountry="US" />
          </div>

          {/* Optional: Add US-specific content sections here */}
          {/* Consider adapting CTCDescription and CTCSEOContent or creating US specific ones */}
          <CTCDescription />
          <CTCSEOContent />

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default USPage;