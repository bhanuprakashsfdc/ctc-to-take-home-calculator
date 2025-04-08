
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Calculator, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  
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
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 transition-colors ${isActive('/ppp-calculator.html') || isActive('/salary-to-hourly-calculator.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}>
              Tools <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link 
                  to="/ppp-calculator.html" 
                  className="w-full"
                  aria-label="Purchasing Power Parity Calculator"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PPP Calculator
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/salary-to-hourly-calculator.html" 
                  className="w-full"
                  aria-label="Salary to Hourly Rate Calculator"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Salary to Hourly Calculator
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 transition-colors ${isActive('/ppp-calculator.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}>
              Tools <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link 
                  to="/ppp-calculator.html" 
                  className="w-full"
                  aria-label="Purchasing Power Parity Calculator"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PPP Calculator
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/salary-to-hourly-calculator.html" 
                  className="w-full"
                  aria-label="Salary to Hourly Rate Calculator"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Salary to Hourly Calculator
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </li>
      )}
    </ul>
  );
  
  return (
    <header className="w-full py-4 px-4 md:px-6 flex flex-row justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Calculator className="h-5 w-5 md:h-6 md:w-6 text-finance-primary" />
        <Link to="/" className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-finance-primary to-finance-secondary bg-clip-text text-transparent no-underline">
          {t('common.ctcCalculator')}
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
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : (
        <nav className="mt-0">
          <div className="flex items-center gap-4">
            <NavLinks />
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
