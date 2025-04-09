
import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InternationalCTCCalculatorForm from '@/components/InternationalCTCCalculatorForm';
import CTCDescription from '@/components/CTCDescription';
import CTCSEOContent from '@/components/CTCSEOContent';
import CTCCalculatorForm from '@/components/CTCCalculatorForm';
import CurrencyConverter from '@/components/CurrencyConverter';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);
  
  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>CTC to Take Home Salary Calculator | Global In-Hand Pay Calculation</title>
        <meta name="description" content="Free global CTC to take home calculator. Calculate your in-hand salary with a detailed breakdown of taxes and deductions for various countries." />
        <meta name="keywords" content="ctc to take home calculator, salary calculator, in-hand salary, cost to company, net salary, take home pay calculator, global salary calculator, ctc breakdown" />
        <link rel="canonical" href="https://www.ctc-calculator.com/" />
        <meta property="og:title" content="CTC to Take Home Salary Calculator | Global In-Hand Pay Calculation" />
        <meta property="og:description" content="Free global CTC to take home calculator. Calculate your in-hand salary with a detailed breakdown of taxes and deductions for various countries." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="CTC to Take Home Salary Calculator | Global In-Hand Pay Calculation" />
        <meta name="twitter:description" content="Free global CTC to take home calculator. Calculate your in-hand salary with a detailed breakdown of taxes and deductions for various countries." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "CTC to Take Home Salary Calculator",
            "url": "https://www.ctc-calculator.com/",
            "applicationCategory": "FinanceApplication",
            "description": "Free global CTC to take home calculator that helps employees calculate their in-hand salary with detailed breakdown of all components for various countries.",
            "offers": {
              "@type": "Offer",
              "price": "0"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "1024"
            }
          })}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Global CTC to Take Home Salary Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Accurately convert your Cost-to-Company (CTC) to your actual in-hand salary across different countries.
            </p>
          </div>
          
          <div ref={calculatorRef} id="calculator-section">
            <InternationalCTCCalculatorForm />
          </div>
          
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">How to Calculate Your Take Home Salary?</h2>
            <p className="mb-4">
              Converting your CTC (Cost to Company) to your take home salary involves understanding various country-specific deductions, including:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Income Tax based on local tax laws and brackets</li>
              <li>Social Security / Pension contributions (e.g., EPF, 401k)</li>
              <li>State or Provincial Taxes (where applicable)</li>
              <li>Health Insurance premiums</li>
              <li>Other statutory or company-specific deductions</li>
            </ul>
            <p className="mb-4">
              Our calculator automatically factors in these deductions based on the selected country to show you the estimated amount you'll receive in your bank account each month.
            </p>
            <h3 className="text-xl font-semibold mb-3">Why Trust Our Calculator?</h3>
            <p>
              Our calculator uses up-to-date information for supported countries to provide accurate estimations. Simply select your country and enter your CTC to get a detailed salary breakdown.
            </p>
          </section>
          
          <CTCDescription />
          
          <CTCSEOContent />

          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">CTC to Take Home Calculator: Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">What is the difference between CTC and take home salary?</h3>
                <p className="text-muted-foreground">
                  CTC (Cost to Company) is the total expense a company incurs for an employee annually. It includes direct benefits (like salary) and indirect benefits (like employer pension contributions, insurance). Take home salary (or net pay) is the actual amount an employee receives after all mandatory deductions like taxes and social contributions.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">How is in-hand salary calculated from CTC?</h3>
                <p className="text-muted-foreground">
                  To calculate in-hand salary, subtract all applicable deductions (income tax, social security/pension contributions, mandatory insurance, etc.) from your gross salary (derived from CTC). The exact formula varies by country. Our calculator handles these country-specific calculations automatically when you select a location.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">What percentage of CTC is typically take home salary?</h3>
                <p className="text-muted-foreground">
                  The percentage of CTC that becomes take home pay varies significantly by country due to different tax rates, social security systems, and mandatory deductions. It can range broadly, often between 60% to 85%, but depends heavily on the specific country's regulations and the individual's salary level.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Does this calculator support different tax systems within a country?</h3>
                <p className="text-muted-foreground">
                  Where applicable (like India's old vs. new tax regimes), the calculator aims to support relevant tax systems. Select the country and check the available options or assumptions noted in the results.
                </p>
              </div>
            </div>
          </section>

          <section className="my-10 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Why Use Our CTC to Take Home Calculator?</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Accurate in-hand salary calculations for multiple countries</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Uses up-to-date tax information for supported regions</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Handles country-specific tax systems and deductions</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Detailed breakdown of all salary components</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Free to use with no registration required</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Reliable estimation of social security and tax deductions</span>
              </li>
            </ul>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-bold mb-4">Try Our CTC to Take Home Salary Calculator Now</h2>
            <p className="mb-4">Get a detailed breakdown of your salary components and understand exactly how much you'll receive in your bank account.</p>
            <div className="flex justify-center">
              <button onClick={scrollToCalculator} className="bg-finance-primary hover:bg-finance-primary/90 text-white py-3 px-6 rounded-md font-medium transition-colors">
                Calculate Your Take Home Salary
              </button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
