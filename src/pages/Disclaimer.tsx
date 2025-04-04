
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Disclaimer</h1>
            <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Educational Purpose</h2>
            <p>
              The CTC Calculator is provided for educational and informational purposes only. It is not intended to substitute professional financial or tax advice.
            </p>
            
            <h2 className="text-xl font-semibold">No Guarantee of Accuracy</h2>
            <p>
              While we make every effort to ensure the accuracy of the calculator, we do not guarantee that the information and calculations provided are error-free, complete, or up-to-date. Tax laws, regulations, and salary structures may change, and there might be factors specific to your situation that the calculator doesn't account for.
            </p>
            
            <h2 className="text-xl font-semibold">Limitation of Liability</h2>
            <p>
              By using the CTC Calculator, you agree that we shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages resulting from your use of the calculator or any information derived from it.
            </p>
            
            <h2 className="text-xl font-semibold">Consult Professionals</h2>
            <p>
              For accurate financial planning and tax advice tailored to your specific circumstances, we strongly recommend consulting with a qualified financial advisor, tax professional, or your company's HR department.
            </p>
            
            <h2 className="text-xl font-semibold">No Employer Affiliation</h2>
            <p>
              CTC Calculator is not affiliated with any employer or financial institution. The calculations provided are based on general industry standards and tax regulations, and may not reflect the exact policies or structures of your specific employer.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Disclaimer;
