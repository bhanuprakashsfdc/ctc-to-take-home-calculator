
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Calculator, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const NavLinks = () => (
    <ul className="flex flex-col md:flex-row items-start md:items-center flex-wrap gap-6 md:gap-6 text-sm">
      <li>
        <Link 
          to="/" 
          className={`transition-colors ${isActive('/') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
          aria-label="CTC to Take Home Calculator"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
      </li>
      <li>
        <Link 
          to="/about.html" 
          className={`transition-colors ${isActive('/about.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
          aria-label="About CTC to Take Home Calculator"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
      </li>
      <li>
        <Link 
          to="/privacy-policy.html" 
          className={`transition-colors ${isActive('/privacy-policy.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Privacy Policy
        </Link>
      </li>
      <li>
        <Link 
          to="/terms.html" 
          className={`transition-colors ${isActive('/terms.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Terms
        </Link>
      </li>
      <li>
        <Link 
          to="/contact.html" 
          className={`transition-colors ${isActive('/contact.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
          aria-label="Contact CTC Calculator Support"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
      </li>
      {isMobile && (
        <li className="pt-4">
          <ThemeToggle />
        </li>
      )}
    </ul>
  );
  
  return (
    <header className="w-full py-4 px-4 md:px-6 flex flex-row justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Calculator className="h-5 w-5 md:h-6 md:w-6 text-finance-primary" />
        <Link to="/" className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-finance-primary to-finance-secondary bg-clip-text text-transparent no-underline">
          CTC to Take Home Calculator
        </Link>
      </div>
      
      {isMobile ? (
        <div className="flex items-center">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-foreground" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] px-6 py-8">
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <NavLinks />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="ml-2 hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      ) : (
        <nav className="mt-0">
          <div className="flex items-center gap-4">
            <NavLinks />
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
