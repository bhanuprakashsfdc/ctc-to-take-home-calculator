
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 px-6 border-t mt-8">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} CTC Calculator. All rights reserved.
        </p>
        <div className="text-sm text-muted-foreground mt-2 md:mt-0">
          <span>This calculator is for educational purposes only.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
