import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HikeCalculator from '@/components/HikeCalculator';

const SalaryHike: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Salary Hike Calculator | Calculate Salary Increase Percentage</title>
        <meta name="description" content="Free salary hike calculator to calculate your salary increase percentage or find out your new salary after a raise. Easy to use salary increment calculator." />
        <meta name="keywords" content="salary hike calculator, salary increase calculator, pay raise calculator, salary increment calculator, percentage increase calculator" />
        <link rel="canonical" href="https://www.ctc-calculator.com/salary-hike-calculator" />
        <meta property="og:title" content="Salary Hike Calculator | Calculate Salary Increase Percentage" />
        <meta property="og:description" content="Free salary hike calculator to calculate your salary increase percentage or find out your new salary after a raise. Easy to use salary increment calculator." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Salary Hike Calculator | Calculate Salary Increase Percentage" />
        <meta name="twitter:description" content="Free salary hike calculator to calculate your salary increase percentage or find out your new salary after a raise. Easy to use salary increment calculator." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Salary Hike Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your salary increase percentage or determine your new salary after a raise
            </p>
          </div>
          
          <HikeCalculator />
          
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">Understanding Salary Hikes</h2>
            <p className="mb-4">
              A salary hike, also known as a salary increase or raise, represents the percentage increase in your compensation. Understanding how to calculate these changes helps you:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Evaluate job offers and promotions</li>
              <li>Negotiate salary increases effectively</li>
              <li>Track your career progression</li>
              <li>Compare compensation adjustments with market standards</li>
              <li>Plan your financial future</li>
            </ul>
          </section>
          
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">How to Calculate Salary Hike Percentage</h2>
            <div className="space-y-4">
              <p>
                The salary hike percentage is calculated using this formula:
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium">
                  Hike Percentage = ((New Salary - Current Salary) / Current Salary) × 100
                </p>
              </div>
              <p>
                For example, if your current salary is $50,000 and your new salary is $60,000:
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <p>
                  Hike Percentage = (($60,000 - $50,000) / $50,000) × 100
                  <br />
                  = ($10,000 / $50,000) × 100
                  <br />
                  = 0.2 × 100
                  <br />
                  = 20%
                </p>
              </div>
            </div>
          </section>

          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">What is a good salary hike percentage?</h3>
                <p className="text-muted-foreground">
                  A good salary hike percentage varies by industry, experience level, and economic conditions. Generally, annual raises of 3-5% are common for cost of living adjustments, while promotional increases or job changes might warrant 10-20% or more. However, these numbers can vary significantly based on your specific situation and market conditions.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">How often should I expect a salary hike?</h3>
                <p className="text-muted-foreground">
                  Most companies conduct annual salary reviews, though some may offer bi-annual increases. Performance-based raises or promotional increases may occur outside these regular cycles. It's important to discuss performance and compensation expectations with your employer during regular reviews.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Should I include bonuses when calculating my hike?</h3>
                <p className="text-muted-foreground">
                  Typically, salary hike calculations focus on base salary rather than total compensation. However, when evaluating job offers or career moves, it's important to consider the total compensation package, including bonuses, benefits, and other perks.
                </p>
              </div>
            </div>
          </section>

          <section className="my-10 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Tips for Salary Negotiations</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Research industry standards for your role and experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Document your achievements and contributions</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Consider the entire compensation package</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Time your negotiation appropriately</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Be prepared to discuss market rates</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Have a clear understanding of your value proposition</span>
              </li>
            </ul>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SalaryHike;