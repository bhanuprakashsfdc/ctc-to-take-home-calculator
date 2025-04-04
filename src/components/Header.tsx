
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex flex-col md:flex-row justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Calculator className="h-6 w-6 text-finance-primary" />
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-finance-primary to-finance-secondary bg-clip-text text-transparent">
          CTC Calculator
        </h1>
      </div>
      
      <nav className="mt-4 md:mt-0">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link to="/" className="text-foreground hover:text-finance-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about.html" className="text-foreground hover:text-finance-primary transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy.html" className="text-foreground hover:text-finance-primary transition-colors">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms.html" className="text-foreground hover:text-finance-primary transition-colors">
              Terms
            </Link>
          </li>
          <li>
            <Link to="/contact.html" className="text-foreground hover:text-finance-primary transition-colors">
              Contact
            </Link>
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
