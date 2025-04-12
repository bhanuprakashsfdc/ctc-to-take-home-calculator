
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Footer.css';

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
    <footer className="footer">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-brand-title">CTC to Take Home Calculator</h3>
            <p className="footer-brand-description">
              India's most trusted tool for understanding your CTC to in-hand salary breakdown and calculating accurate take-home pay for Indian employees in all sectors.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  CTC to Take Home Calculator
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/about.html" className="footer-link">
                  About Our Calculator
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/contact.html" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/blog.html" className="footer-link">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-section-title">Tools</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/ppp-calculator.html" className="footer-link">
                  PPP Calculator
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/salary-to-hourly-calculator.html" className="footer-link">
                  Salary to Hourly Calculator
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/salary-hike.html" className="footer-link">
                  Salary Hike Calculator
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/sip-calculator.html" className="footer-link">
                  SIP Calculator
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/currency-converter.html" className="footer-link">
                  Currency Converter
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-section-title">Legal</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/privacy-policy.html" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/terms.html" className="footer-link">
                  Terms of Service
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/disclaimer.html" className="footer-link">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-secondary">
          <div className="footer-secondary-grid">
            <div className="footer-section-small">
              <h4 className="footer-section-small-title">Blog Posts</h4>
              <ul className="footer-section-small-list">
                <li className="footer-section-small-item">
                  <Link to="/blog/gross-vs-net-salary.html" className="footer-link">
                    Gross vs Net Salary
                  </Link>
                </li>
                <li className="footer-section-small-item">
                  <Link to="/blog/hourly-rate-from-annual-salary.html" className="footer-link">
                    Hourly Rate Calculator
                  </Link>
                </li>
                <li className="footer-section-small-item">
                  <Link to="/blog/income-tax-calculation-india.html" className="footer-link">
                    Income Tax Calculation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-section-small">
              <h4 className="footer-section-small-title">Popular Searches</h4>
              <ul className="footer-section-small-list">
                <li className="footer-section-small-item">CTC to take home calculator</li>
                <li className="footer-section-small-item">In hand salary calculator India</li>
                <li className="footer-section-small-item">CTC calculator with tax</li>
              </ul>
            </div>
            <div className="footer-section-small">
              <h4 className="footer-section-small-title">Resources</h4>
              <ul className="footer-section-small-list">
                <li className="footer-section-small-item">Indian Income Tax Slabs {currentYear}</li>
                <li className="footer-section-small-item">EPF Calculator</li>
                <li className="footer-section-small-item">HRA Exemption Rules</li>
              </ul>
            </div>
            <div className="footer-section-small">
              <h4 className="footer-section-small-title">For Companies</h4>
              <ul className="footer-section-small-list">
                <li className="footer-section-small-item">Salary Structure Planning</li>
                <li className="footer-section-small-item">Employee Compensation</li>
                <li className="footer-section-small-item">Tax Saving Options</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-copyright">
          <div className="footer-copyright-container">
            <p className="footer-copyright-text">
              © {currentYear} CTC to Take Home Salary Calculator India developed by <a href="https://bhanuprakashsfdc.com/">Bhanu Prakash</a>. All rights reserved.
            </p>
            <div className="footer-disclaimer">
              <span>This calculator is for educational purposes only.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
