
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PurchasingPowerParityCalculator from '@/components/PurchasingPowerParityCalculator';
import CurrencyConverter from '@/components/CurrencyConverter';
import './PurchasingPowerParity.css';

const PurchasingPowerParity: React.FC = () => {
  return (
    <div className="ppp-page">
      <Helmet>
        <title>Purchasing Power Parity Calculator | Compare Salaries Across Countries</title>
        <meta name="description" content="Compare salaries across different countries with our Purchasing Power Parity calculator. See what your salary is worth in another country adjusted for cost of living." />
        <meta name="keywords" content="purchasing power parity calculator, ppp calculator, international salary comparison, cost of living calculator, salary converter, global salary comparison" />
        <link rel="canonical" href="https://www.ctc-calculator.com/ppp-calculator.html" />
        <meta property="og:title" content="Purchasing Power Parity Calculator | Compare Salaries Across Countries" />
        <meta property="og:description" content="Compare salaries across different countries with our Purchasing Power Parity calculator. See what your salary is worth in another country adjusted for cost of living." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Header />
      
      <main className="ppp-main">
        <div className="ppp-container">
          <div className="ppp-header">
            <h1>Purchasing Power Parity Calculator</h1>
            <p className="ppp-subtitle">
              Compare what your salary is really worth across different countries
            </p>
          </div>
          
          <div className="ppp-calculator-container">
            <PurchasingPowerParityCalculator />
          </div>
          
          <div className="ppp-content">
            <section className="ppp-section">
              <h2>What is Purchasing Power Parity?</h2>
              <p>
                Purchasing Power Parity (PPP) is an economic theory that allows comparison of the purchasing power of different currencies 
                by eliminating the differences in price levels between countries. In simpler terms, it helps you understand what your 
                salary is actually worth in different countries by accounting for cost of living differences.
              </p>
              <p>
                For example, a $100,000 salary in New York might sound much higher than a ₹2,000,000 salary in Mumbai, but when adjusted 
                for the cost of living and purchasing power differences, they might provide a similar standard of living.
              </p>
            </section>
            
            <section className="ppp-section">
              <h2>Why Use Our PPP Calculator?</h2>
              <p>
                Our calculator combines official PPP conversion rates with city-specific cost of living indices to give you a more accurate 
                comparison. Whether you're considering an international job offer, planning to relocate, or just curious about global salary 
                differences, our tool provides valuable insights into what your income is really worth around the world.
              </p>
            </section>
            
            <div className="ppp-two-columns">
              <section className="ppp-section">
                <h2>How to Use the PPP Calculator</h2>
                
                <ol className="ppp-list">
                  <li>Select your current country and city in the "Source Location" section</li>
                  <li>Enter your current salary (choose monthly or yearly view)</li>
                  <li>Select the target country and city you want to compare with</li>
                  <li>View the equivalent salary needed to maintain your standard of living</li>
                </ol>
                
                <p>
                  The calculator will show you not only the equivalent salary but also the factors that influence the conversion, 
                  including currency purchasing power differences and cost of living variations between locations.
                </p>
              </section>

              <section className="ppp-section">
                <h2>Related Tools</h2>
                <div className="ppp-related-tools">
                  <CurrencyConverter className="ppp-currency-converter" />
                </div>
              </section>
            </div>

            <section className="ppp-section">
              <h2>Frequently Asked Questions</h2>
              
              <div className="ppp-faq">
                <div className="ppp-faq-item">
                  <h3>How accurate is the Purchasing Power Parity calculator?</h3>
                  <p>
                    Our calculator uses the latest available PPP conversion rates and cost of living indices. While it provides a good 
                    approximation, personal spending habits and lifestyle preferences can affect your actual experience. The calculator 
                    is most useful as a comparative tool rather than an absolute measure.
                  </p>
                </div>
                
                <div className="ppp-faq-item">
                  <h3>How is PPP different from currency exchange rates?</h3>
                  <p>
                    Currency exchange rates are influenced by many factors including trade, interest rates, and speculation, and can 
                    fluctuate significantly. PPP, on the other hand, focuses on what currencies can actually buy in their respective 
                    countries, providing a more stable and realistic comparison of purchasing power.
                  </p>
                </div>
                
                <div className="ppp-faq-item">
                  <h3>Does the calculator account for taxes?</h3>
                  <p>
                    This basic version of our PPP calculator does not account for taxes, which can vary significantly between countries. 
                    For a more detailed analysis including tax implications, you may want to use our CTC to Take Home calculator in 
                    conjunction with the PPP calculator.
                  </p>
                </div>
                
                <div className="ppp-faq-item">
                  <h3>How often is the PPP data updated?</h3>
                  <p>
                    We update our PPP conversion rates and cost of living indices periodically based on international economic data. 
                    However, economic conditions can change rapidly, so the calculator should be used as a guide rather than a definitive source.
                  </p>
                </div>
              </div>
            </section>

            <section className="ppp-benefits-section">
              <h2>Why Understanding PPP Matters</h2>
              <ul className="ppp-benefits-list">
                <li>
                  <span className="ppp-checkmark">✓</span>
                  <span>Make informed decisions about international job offers</span>
                </li>
                <li>
                  <span className="ppp-checkmark">✓</span>
                  <span>Understand the true value of your salary globally</span>
                </li>
                <li>
                  <span className="ppp-checkmark">✓</span>
                  <span>Plan relocations with realistic financial expectations</span>
                </li>
                <li>
                  <span className="ppp-checkmark">✓</span>
                  <span>Compare living standards across different countries</span>
                </li>
                <li>
                  <span className="ppp-checkmark">✓</span>
                  <span>Negotiate better compensation packages for overseas positions</span>
                </li>
                <li>
                  <span className="ppp-checkmark">✓</span>
                  <span>Gain insights into global economic differences</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PurchasingPowerParity;
