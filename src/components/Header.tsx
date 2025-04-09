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

  return (
    <nav className="flex items-center justify-between w-full px-4 py-3 md:py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              <button className="p-2 text-foreground hover:bg-accent rounded-md" aria-label="Menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] px-4 py-6">
              <div className="flex flex-col h-full overflow-y-auto">
                <NavLinks isMobile={isMobile} isActive={isActive} closeMenu={() => setIsMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <NavLinks isMobile={isMobile} isActive={isActive} closeMenu={() => setIsMenuOpen(false)} />
          <LanguageSelector />
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

interface NavLinksProps {
  isMobile: boolean;
  isActive: (path: string) => boolean;
  closeMenu: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isMobile, isActive, closeMenu }) => {
  const toolsMenuItems = [
    { path: '/ppp-calculator.html', label: 'PPP Calculator', ariaLabel: 'Purchasing Power Parity Calculator' },
    { path: '/salary-to-hourly-calculator.html', label: 'Salary to Hourly Calculator', ariaLabel: 'Salary to Hourly Rate Calculator' },
    { path: '/salary-hike.html', label: 'Salary Hike Calculator', ariaLabel: 'Salary Hike Calculator' },
    { path: '/sip-calculator.html', label: 'SIP Calculator', ariaLabel: 'SIP Calculator' },
    { path: '/lumpsum-calculator.html', label: 'Lumpsum Calculator', ariaLabel: 'Lumpsum Calculator' },
    { path: '/fd-calculator.html', label: 'FD Calculator', ariaLabel: 'Fixed Deposit Calculator' },
    { path: '/swp-calculator.html', label: 'SWP Calculator', ariaLabel: 'Systematic Withdrawal Plan Calculator' },
  ];

  return (
    <ul className="flex flex-col md:flex-row items-start md:items-center flex-wrap gap-4 md:gap-6 text-base md:text-sm p-2 md:p-0">
      <li className="w-full md:w-auto">
        <Link
          to="/"
          className={`block w-full md:w-auto transition-colors ${isActive('/') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
          aria-label="CTC to Take Home Calculator"
          onClick={closeMenu}
        >
          Home
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`flex items-center justify-between w-full md:w-auto gap-1 transition-colors ${toolsMenuItems.some(item => isActive(item.path)) ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
          >
            Tools <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[200px] w-full md:w-auto">
            {toolsMenuItems.map((item) => (
              <DropdownMenuItem key={item.path} asChild>
                <Link
                  to={item.path}
                  className="w-full block py-2"
                  aria-label={item.ariaLabel}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
      <li className="w-full md:w-auto">
        <Link
          to="/blog.html"
          className={`block w-full md:w-auto transition-colors ${isActive('/blog.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
          aria-label="Blog"
          onClick={closeMenu}
        >
          Blog
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <Link
          to="/about.html"
          className={`block w-full md:w-auto transition-colors ${isActive('/about.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
          aria-label="About CTC to Take Home Calculator"
          onClick={closeMenu}
        >
          About
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <Link
          to="/contact.html"
          className={`block w-full md:w-auto transition-colors ${isActive('/contact.html') ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
          aria-label="Contact CTC Calculator Support"
          onClick={closeMenu}
        >
          Contact
        </Link>
      </li>
      {isMobile && (
        <li className="w-full pt-4 border-t mt-4">
          <div className="flex items-center justify-start space-x-4 pt-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </li>
      )}
    </ul>
  );
};

export default Header;
