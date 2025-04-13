import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Calculator, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import MegaMenu from './MegaMenu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import "@/megamenu.css";
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
  // Define calculator categories for mobile view
  const calculatorCategories = [
    {
      title: "Finance",
      items: [
        { path: '/ppp-calculator.html', label: 'PPP Calculator' },
        { path: '/salary-to-hourly-calculator.html', label: 'Salary to Hour' },
        { path: '/salary-hike.html', label: 'Salary Hike' },
        { path: '/currency-converter.html', label: 'Currency Converter' },
      ]
    },
    {
      title: "Investment",
      items: [
        { path: '/sip-calculator.html', label: 'SIP Calculator' },
        { path: '/lumpsum-calculator.html', label: 'Lumpsum Calculator' },
        { path: '/fd-calculator.html', label: 'FD Calculator' },
        { path: '/swp-calculator.html', label: 'SWP Calculator' },
      ]
    },
    {
      title: "Loan",
      items: [
        { path: '/home-loan-calculator.html', label: 'Home Loan' },
        { path: '/car-loan-calculator.html', label: 'Car Loan' },
        { path: '/personal-loan-calculator.html', label: 'Personal Loan' },
        { path: '/education-loan-calculator.html', label: 'Education Loan' },
      ]
    }
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
        {isMobile ? (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tools" className="border-b-0">
              <AccordionTrigger className="py-2 hover:no-underline">
                <span className="text-base">Tools</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pl-2">
                  {calculatorCategories.map((category) => (
                    <div key={category.title} className="space-y-2">
                      <h3 className="font-medium text-sm">{category.title}</h3>
                      <ul className="space-y-2 pl-2">
                        {category.items.map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              className={`block text-sm py-1 transition-colors ${isActive(item.path) ? 'text-finance-primary font-medium' : 'text-foreground hover:text-finance-primary'}`}
                              onClick={closeMenu}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <MegaMenu isActive={isActive} closeMenu={closeMenu} />
        )}
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
