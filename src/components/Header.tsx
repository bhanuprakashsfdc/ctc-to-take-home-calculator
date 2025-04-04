
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Calculator } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Calculator className="h-6 w-6 text-finance-primary" />
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-finance-primary to-finance-secondary bg-clip-text text-transparent">
          CTC Calculator
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
