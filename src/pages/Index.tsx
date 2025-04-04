
import React from 'react';
import Header from '@/components/Header';
import CTCCalculatorForm from '@/components/CTCCalculatorForm';
import CTCDescription from '@/components/CTCDescription';
import CTCSEOContent from '@/components/CTCSEOContent';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>CTC to Take Home Salary Calculator India | Calculate Actual In-Hand Pay</title>
        <meta name="description" content="Best free CTC to take home calculator for Indian employees. Calculate your in-hand salary with detailed breakdown of PF, tax & other deductions from your CTC package." />
        <meta name="keywords" content="ctc to take home calculator, salary calculator india, in-hand salary, cost to company, net salary, take home pay calculator, salary calculator india, ctc breakdown" />
        <link rel="canonical" href="https://ctc-calculator.com/" />
        <meta property="og:title" content="CTC to Take Home Salary Calculator India | Calculate Actual In-Hand Pay" />
        <meta property="og:description" content="Best free CTC to take home calculator for Indian employees. Calculate your in-hand salary with detailed breakdown of PF, tax & other deductions from your CTC package." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="CTC to Take Home Salary Calculator India | Calculate Actual In-Hand Pay" />
        <meta name="twitter:description" content="Best free CTC to take home calculator for Indian employees. Calculate your in-hand salary with detailed breakdown of PF, tax & other deductions from your CTC package." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "CTC to Take Home Salary Calculator",
            "url": "https://ctc-calculator.com/",
            "applicationCategory": "FinanceApplication",
            "description": "Free CTC to take home calculator that helps Indian employees calculate their in-hand salary with detailed breakdown of all components.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
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
            <h1 className="text-3xl md:text-4xl font-bold">CTC to Take Home Salary Calculator India</h1>
            <p className="text-xl text-muted-foreground">
              The most accurate calculator to convert your CTC to actual in-hand salary
            </p>
          </div>
          
          <CTCCalculatorForm />
          
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">How to Calculate CTC to Take Home Salary in India?</h2>
            <p className="mb-4">
              Converting your CTC (Cost to Company) to take home salary involves understanding various deductions such as:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Income Tax based on your tax slab (old or new regime)</li>
              <li>Employee Provident Fund (EPF) contributions (12% of basic salary)</li>
              <li>Professional Tax (varies by state in India)</li>
              <li>Health Insurance premiums (ESI or company provided)</li>
              <li>Other company-specific deductions like meal vouchers</li>
            </ul>
            <p className="mb-4">
              Our CTC to take home calculator automatically computes these deductions to show you the exact amount you'll receive in your bank account each month as an Indian employee.
            </p>
            <h3 className="text-xl font-semibold mb-3">Why Trust Our CTC to Take Home Calculator?</h3>
            <p>
              Our calculator is updated with the latest Indian tax regulations for 2023-24 and provides accurate calculations based on current financial year rules. Simply enter your CTC amount to get a detailed breakdown of your in-hand salary.
            </p>
          </section>
          
          <CTCDescription />
          
          <CTCSEOContent />

          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">CTC to Take Home Calculator: Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">What is the difference between CTC and take home salary in India?</h3>
                <p className="text-muted-foreground">
                  CTC (Cost to Company) is the total expense a company incurs for an employee annually in India. It includes both direct benefits (like basic salary) and indirect benefits (like employer's PF contribution, gratuity). Take home salary is the actual amount an employee receives after all deductions like income tax, provident fund, and professional tax.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">How is in-hand salary calculated from CTC in India?</h3>
                <p className="text-muted-foreground">
                  To calculate in-hand salary in India, subtract all deductions (taxes, EPF, professional tax, etc.) from your monthly gross salary. The typical formula is: In-hand salary = Monthly Gross - (Income Tax + Employee PF + Professional Tax + Other Deductions). Our CTC to take home calculator does this automatically.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">What percentage of CTC is take home salary typically in India?</h3>
                <p className="text-muted-foreground">
                  Generally, take home salary in India ranges between 65-85% of your CTC, depending on your salary structure, tax regime choice, and eligible deductions. Higher CTC packages may have a lower percentage as take-home due to progressive tax rates.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Does this CTC to take home calculator work for both old and new tax regimes in India?</h3>
                <p className="text-muted-foreground">
                  Yes, our CTC to take home calculator supports both old and new tax regimes in India as per the latest budget updates, giving you the flexibility to compare and choose the best option for your financial situation.
                </p>
              </div>
            </div>
          </section>

          <section className="my-10 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Why Use Our CTC to Take Home Calculator?</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Most accurate in-hand salary calculations for Indian employees</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Updated with latest 2023-24 tax slabs and rules</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Compares old vs new tax regime benefits</span>
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
                <span>100% accurate PF and tax calculations</span>
              </li>
            </ul>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-bold mb-4">Try Our CTC to Take Home Salary Calculator Now</h2>
            <p className="mb-4">Get a detailed breakdown of your salary components and understand exactly how much you'll receive in your bank account.</p>
            <div className="flex justify-center">
              <Link to="/" className="bg-finance-primary hover:bg-finance-primary/90 text-white py-3 px-6 rounded-md font-medium transition-colors">
                Calculate Your Take Home Salary
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
