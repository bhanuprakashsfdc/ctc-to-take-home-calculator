
import React from 'react';
import Header from '@/components/Header';
import CTCCalculatorForm from '@/components/CTCCalculatorForm';
import CTCDescription from '@/components/CTCDescription';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">CTC Salary Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your in-hand salary and understand your CTC breakdown
            </p>
          </div>
          
          <CTCCalculatorForm />
          
          <CTCDescription />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
