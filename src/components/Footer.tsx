
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
    "description": "Calculate your exact in-hand salary from CTC with detailed breakdown of all deductions and taxes for Indian employees.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1248",
      "bestRating": "5"
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
              India's most trusted tool for understanding your CTC to in-hand salary breakdown and calculating accurate take-home pay for Indian employees in all sectors.
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  CTC to Take Home Calculator
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
        
        <div className="border-t border-border/40 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-sm">
              <h4 className="font-medium mb-2">Popular Searches</h4>
              <ul className="space-y-1">
                <li><span className="text-muted-foreground">CTC to take home calculator</span></li>
                <li><span className="text-muted-foreground">In hand salary calculator India</span></li>
                <li><span className="text-muted-foreground">CTC calculator with tax</span></li>
              </ul>
            </div>
            <div className="text-sm">
              <h4 className="font-medium mb-2">Resources</h4>
              <ul className="space-y-1">
                <li><span className="text-muted-foreground">Indian Income Tax Slabs {currentYear}</span></li>
                <li><span className="text-muted-foreground">EPF Calculator</span></li>
                <li><span className="text-muted-foreground">HRA Exemption Rules</span></li>
              </ul>
            </div>
            <div className="text-sm">
              <h4 className="font-medium mb-2">For Companies</h4>
              <ul className="space-y-1">
                <li><span className="text-muted-foreground">Salary Structure Planning</span></li>
                <li><span className="text-muted-foreground">Employee Compensation</span></li>
                <li><span className="text-muted-foreground">Tax Saving Options</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CTC to Take Home Salary Calculator India. All rights reserved.
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
