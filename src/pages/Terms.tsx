
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
            <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="space-y-6">
            <p>
              Welcome to CTC Calculator. By using our website, you agree to comply with and be bound by the following terms and conditions of use. Please review these terms carefully.
            </p>
            
            <h2 className="text-xl font-semibold">Use of the Calculator</h2>
            <p>
              The CTC Calculator is provided for informational and educational purposes only. The calculations are based on general formulas and tax regulations and may not reflect the exact salary structure or tax liabilities specific to your situation.
            </p>
            
            <h2 className="text-xl font-semibold">No Financial Advice</h2>
            <p>
              The information provided by the CTC Calculator does not constitute financial or tax advice. For specific advice tailored to your circumstances, please consult with a qualified financial advisor or tax professional.
            </p>
            
            <h2 className="text-xl font-semibold">Accuracy of Information</h2>
            <p>
              While we strive to ensure that the information provided by our calculator is accurate and up-to-date, we make no guarantees or warranties regarding the accuracy, completeness, or reliability of any results or information obtained from using the CTC Calculator.
            </p>
            
            <h2 className="text-xl font-semibold">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will post the modified terms on this page. Your continued use of the website after such changes constitutes your acceptance of the new terms.
            </p>
            
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms of Service, please contact us through the information provided on our Contact page.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
