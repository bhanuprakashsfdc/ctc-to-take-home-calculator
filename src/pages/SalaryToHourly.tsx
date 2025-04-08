import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SalaryToHourlyCalculator from '@/components/SalaryToHourlyCalculator';

const SalaryToHourly: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Salary to Hourly Rate Calculator | Convert Annual or Monthly Salary to Hourly Pay</title>
        <meta name="description" content="Free salary to hourly calculator. Convert your annual or monthly salary to hourly rate based on your working hours per week. Calculate your equivalent hourly wage easily." />
        <meta name="keywords" content="salary to hourly calculator, annual salary to hourly rate, monthly salary to hourly wage, hourly rate calculator, salary converter" />
        <link rel="canonical" href="https://www.ctc-calculator.com/salary-to-hourly-calculator.html" />
        <meta property="og:title" content="Salary to Hourly Rate Calculator | Convert Annual or Monthly Salary to Hourly Pay" />
        <meta property="og:description" content="Free salary to hourly calculator. Convert your annual or monthly salary to hourly rate based on your working hours per week. Calculate your equivalent hourly wage easily." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Salary to Hourly Rate Calculator | Convert Annual or Monthly Salary to Hourly Pay" />
        <meta name="twitter:description" content="Free salary to hourly calculator. Convert your annual or monthly salary to hourly rate based on your working hours per week. Calculate your equivalent hourly wage easily." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Salary to Hourly Rate Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Convert your annual or monthly salary to an equivalent hourly rate
            </p>
          </div>
          
          <SalaryToHourlyCalculator />
          
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">How to Convert Salary to Hourly Rate</h2>
            <p className="mb-4">
              Converting your salary to an hourly rate helps you understand your earnings on a more granular level. The calculation depends on how many hours you work per week and whether your salary is annual or monthly.
            </p>
            <h3 className="text-xl font-semibold mb-3">The Formula</h3>
            <p className="mb-4">
              For an annual salary: <br />
              <strong>Hourly Rate = Annual Salary ÷ (Hours Worked Per Week × 52 weeks)</strong>
            </p>
            <p className="mb-4">
              For a monthly salary: <br />
              <strong>Hourly Rate = (Monthly Salary × 12) ÷ (Hours Worked Per Week × 52 weeks)</strong>
            </p>
            <p className="mb-4">
              Our calculator automatically handles these calculations for you, allowing you to adjust your working hours per week and days per week to get the most accurate conversion.
            </p>
          </section>
          
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">Why Convert Salary to Hourly Rate?</h2>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Compare job offers with different salary structures</li>
              <li>Evaluate part-time vs. full-time opportunities</li>
              <li>Understand the value of your time at work</li>
              <li>Calculate overtime rates more accurately</li>
              <li>Budget your time and money more effectively</li>
            </ul>
          </section>
          
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">How do I convert my annual salary to an hourly rate?</h3>
                <p className="text-muted-foreground">
                  To convert an annual salary to an hourly rate, divide your annual salary by the number of working hours in a year. For a standard 40-hour work week, that's 2,080 hours (40 hours × 52 weeks). For example, a $50,000 annual salary divided by 2,080 hours equals approximately $24.04 per hour.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Does this calculator account for holidays and vacation time?</h3>
                <p className="text-muted-foreground">
                  This calculator provides a basic conversion based on the number of working hours per week throughout the year. It doesn't automatically account for paid holidays, vacation time, or other paid time off. For a more precise calculation that includes these factors, you would need to subtract your paid time off hours from the total annual working hours.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">How can I use this calculator for part-time work?</h3>
                <p className="text-muted-foreground">
                  For part-time work, simply enter your actual working hours per week. For example, if you work 20 hours per week, enter "20" in the Hours Per Week field. The calculator will then provide your equivalent hourly rate based on your part-time schedule.
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

export default SalaryToHourly;