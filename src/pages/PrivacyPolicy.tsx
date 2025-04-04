
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="space-y-6">
            <p>
              At CTC Calculator, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
            </p>
            
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <p>
              Our CTC Calculator is designed with privacy in mind. We do not store any salary information that you enter into our calculator. All calculations are performed locally in your browser, and the data is not sent to our servers.
            </p>
            
            <h2 className="text-xl font-semibold">Use of Cookies</h2>
            <p>
              We use cookies to enhance your experience on our website. These cookies help us analyze website traffic and improve our services. You can choose to disable cookies through your browser settings, although this may affect some functionality of the website.
            </p>
            
            <h2 className="text-xl font-semibold">Third-Party Services</h2>
            <p>
              We use analytics tools to understand how our website is used. These third-party services may collect information sent by your browser as part of their analytics. Their use of this information is governed by their respective privacy policies.
            </p>
            
            <h2 className="text-xl font-semibold">Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
            
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions or concerns about our Privacy Policy, please contact us through the information provided on our Contact page.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
