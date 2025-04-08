import React from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SIPCalculator from '@/components/SIPCalculator';
import LumpsumCalculator from '@/components/LumpsumCalculator';
import FDCalculator from '@/components/FDCalculator';
import SWPCalculator from '@/components/SWPCalculator';

const InvestmentCalculators: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Investment Calculators | SIP, Lumpsum, FD & SWP Calculator</title>
        <meta name="description" content="Calculate your investment returns with our comprehensive suite of financial calculators including SIP, Lumpsum, Fixed Deposit (FD), and Systematic Withdrawal Plan (SWP) calculators." />
        <meta name="keywords" content="sip calculator, lumpsum calculator, fd calculator, swp calculator, investment calculator, mutual fund calculator, fixed deposit calculator" />
        <link rel="canonical" href="https://www.ctc-calculator.com/investment-calculators" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Investment Calculators</h1>
            <p className="text-xl text-muted-foreground">
              Plan your investments wisely with our comprehensive suite of financial calculators
            </p>
          </div>

          <Tabs defaultValue="sip" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="sip">SIP</TabsTrigger>
              <TabsTrigger value="lumpsum">Lumpsum</TabsTrigger>
              <TabsTrigger value="fd">FD</TabsTrigger>
              <TabsTrigger value="swp">SWP</TabsTrigger>
            </TabsList>
            <TabsContent value="sip" className="mt-6">
              <SIPCalculator />
            </TabsContent>
            <TabsContent value="lumpsum" className="mt-6">
              <LumpsumCalculator />
            </TabsContent>
            <TabsContent value="fd" className="mt-6">
              <FDCalculator />
            </TabsContent>
            <TabsContent value="swp" className="mt-6">
              <SWPCalculator />
            </TabsContent>
          </Tabs>

          <section className="my-10">
            <h2 className="text-2xl font-bold mb-4">Understanding Different Investment Options</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Systematic Investment Plan (SIP)</h3>
                <p className="text-muted-foreground">
                  SIP allows you to invest a fixed amount regularly in mutual funds. It helps in building wealth through
                  disciplined investing and benefits from rupee cost averaging.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Lumpsum Investment</h3>
                <p className="text-muted-foreground">
                  Lumpsum investment involves investing a large amount at once. It's suitable when you have a significant
                  amount ready to invest and believe in the potential of the market.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Fixed Deposit (FD)</h3>
                <p className="text-muted-foreground">
                  Fixed Deposits offer guaranteed returns at a fixed interest rate for a specified period. They are one of
                  the safest investment options, ideal for risk-averse investors.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">Systematic Withdrawal Plan (SWP)</h3>
                <p className="text-muted-foreground">
                  SWP allows you to withdraw a fixed amount regularly from your mutual fund investments. It's useful for
                  generating regular income from your investments while keeping the remaining amount invested.
                </p>
              </div>
            </div>
          </section>

          <section className="my-10 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Why Use Our Investment Calculators?</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Accurate calculations based on compound interest</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Easy to use interface with instant results</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Comprehensive investment planning tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-finance-primary font-bold mr-2">✓</span>
                <span>Helps make informed investment decisions</span>
              </li>
            </ul>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InvestmentCalculators;