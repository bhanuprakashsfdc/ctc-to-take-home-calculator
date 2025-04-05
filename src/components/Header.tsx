
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Calculator, Coffee } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="w-full py-4 px-6 flex flex-col md:flex-row justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Calculator className="h-6 w-6 text-finance-primary" />
        <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-finance-primary to-finance-secondary bg-clip-text text-transparent no-underline">
          CTC to Take Home Calculator
        </Link>
      </div>
      
      <nav className="mt-4 md:mt-0">
        <ul className="flex items-center flex-wrap gap-4 md:gap-6 text-sm">
          <li>
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
              aria-label="CTC to Take Home Calculator"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about.html" 
              className={`transition-colors ${isActive('/about.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
              aria-label="About CTC to Take Home Calculator"
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/privacy-policy.html" 
              className={`transition-colors ${isActive('/privacy-policy.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link 
              to="/terms.html" 
              className={`transition-colors ${isActive('/terms.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
            >
              Terms
            </Link>
          </li>
          <li>
            <Link 
              to="/contact.html" 
              className={`transition-colors ${isActive('/contact.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
              aria-label="Contact CTC Calculator Support"
            >
              Contact
            </Link>
          </li>
          <li>
            <a 
              href="https://www.buymeacoffee.com/bhanuprakash" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              <Coffee size={14} />
              <span>Support</span>
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
