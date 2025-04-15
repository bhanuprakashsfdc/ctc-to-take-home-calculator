
import React, { useState } from 'react';
import { Calculator, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import MegaMenu from './MegaMenu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import "@/megamenu.css";
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`header ${isDarkMode ? 'header-dark' : ''}`}>
      <div className="header-logo">
        <Calculator className="header-logo-icon" />
        <Link to="/" className="header-logo-text">
          {t('common.ctcCalculator')}
        </Link>
      </div>

      {isMobile ? (
        <div className="header-nav-mobile">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button className="header-menu-button" aria-label="Menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
        <div className="header-nav">
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
    <ul className="header-nav-list">
      <li className="header-nav-item">
        <Link
          to="/"
          className={`header-nav-link ${isActive('/') ? 'active' : ''}`}
          aria-label="CTC to Take Home Calculator"
          onClick={closeMenu}
        >
          Home
        </Link>
      </li>
      <li className="header-nav-item">
        {isMobile ? (
          <Accordion type="single" collapsible className="header-accordion">
            <AccordionItem value="tools" className="border-b-0">
              <AccordionTrigger className="header-accordion-trigger">
                <span>Tools</span>
              </AccordionTrigger>
              <AccordionContent className="header-accordion-content">
                <div className="space-y-4 pl-2">
                  {calculatorCategories.map((category) => (
                    <div key={category.title} className="header-category">
                      <h3 className="header-category-title">{category.title}</h3>
                      <ul className="header-category-list">
                        {category.items.map((item) => (
                          <li key={item.path} className="header-category-item">
                            <Link
                              to={item.path}
                              className={`header-category-link ${isActive(item.path) ? 'active' : ''}`}
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
      <li className="header-nav-item">
        <Link
          to="/blog.html"
          className={`header-nav-link ${isActive('/blog.html') ? 'active' : ''}`}
          aria-label="Blog"
          onClick={closeMenu}
        >
          Blog
        </Link>
      </li>
      <li className="header-nav-item">
        <Link
          to="/about.html"
          className={`header-nav-link ${isActive('/about.html') ? 'active' : ''}`}
          aria-label="About CTC to Take Home Calculator"
          onClick={closeMenu}
        >
          About
        </Link>
      </li>
      <li className="header-nav-item">
        <Link
          to="/contact.html"
          className={`header-nav-link ${isActive('/contact.html') ? 'active' : ''}`}
          aria-label="Contact CTC Calculator Support"
          onClick={closeMenu}
        >
          Contact
        </Link>
      </li>
      {isMobile && (
        <li className="header-mobile-footer">
          <div className="header-mobile-actions">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </li>
      )}
    </ul>
  );
};

export default Header;
