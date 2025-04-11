import React from 'react';
import { Helmet } from 'react-helmet-async';
import CurrencyConverterNew from '@/components/CurrencyConverter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CurrencyConverter: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Currency Converter | Real-Time Exchange Rates</title>
        <meta name="description" content="Convert between currencies with our real-time currency converter. Get accurate exchange rates for all major world currencies." />
        <link rel="canonical" href="https://www.ctc-calculator.com/currency-converter.html" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Currency Converter</h1>
            <p className="text-xl text-muted-foreground">
              Convert between currencies with real-time exchange rates
            </p>
          </div>
          
          <CurrencyConverterNew />
          
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">About Currency Conversion</h2>
            <p className="mb-4">
              Our currency converter provides real-time exchange rates for major world currencies. 
              Use this tool to quickly convert between different currencies for travel planning, 
              international business, or personal finance management.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CurrencyConverter;
