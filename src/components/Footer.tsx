
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Generate JSON-LD schema for rich results
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CTC to Take Home Salary Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "description": "Calculate your exact in-hand salary from CTC with detailed breakdown of all deductions and taxes.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };
  
  return (
    <footer className="w-full py-8 px-6 border-t mt-8 bg-muted/30">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <div className="container flex flex-col space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-base font-medium mb-3">CTC to Take Home Calculator</h3>
            <p className="text-sm text-muted-foreground">
              The trusted tool for understanding your salary breakdown and calculating accurate take-home pay for Indian employees.
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about.html" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Our Calculator
                </Link>
              </li>
              <li>
                <Link to="/contact.html" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-3">Legal</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/privacy-policy.html" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms.html" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer.html" className="text-muted-foreground hover:text-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CTC to Take Home Salary Calculator. All rights reserved.
            </p>
            <div className="text-sm text-muted-foreground mt-2 md:mt-0">
              <span>This calculator is for educational purposes only.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
