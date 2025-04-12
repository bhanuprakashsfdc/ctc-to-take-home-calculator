import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Calculator, Home, Car, GraduationCap, Wallet, LineChart, PiggyBank } from 'lucide-react';

interface MegaMenuProps {
  isActive: (path: string) => boolean;
  closeMenu: () => void;
}

interface MenuItemType {
  path: string;
  label: string;
  ariaLabel: string;
  icon?: React.ReactNode;
  description?: string;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isActive, closeMenu }) => {
  // Define calculator categories and their items
  const calculatorCategories = [
    {
      title: "Finance",
      icon: <Wallet className="h-5 w-5 text-finance-primary" />,
      description: "Financial calculators to help you manage your money",
      items: [
        { path: '/ppp-calculator.html', label: 'PPP Calculator', ariaLabel: 'Purchasing Power Parity Calculator', icon: <Calculator className="h-4 w-4" />, description: 'Compare purchasing power across countries' },
        { path: '/salary-to-hourly-calculator.html', label: 'Salary to Hour', ariaLabel: 'Salary to Hourly Rate Calculator', icon: <Calculator className="h-4 w-4" />, description: 'Convert annual salary to hourly rate' },
        { path: '/salary-hike.html', label: 'Salary Hike', ariaLabel: 'Salary Hike Calculator', icon: <Calculator className="h-4 w-4" />, description: 'Calculate your salary after a percentage increase' },
        { path: '/currency-converter.html', label: 'Currency Converter', ariaLabel: 'Currency Converter Calculator', icon: <Calculator className="h-4 w-4" />, description: 'Convert between different currencies' },
      ]
    },
    {
      title: "Investment",
      icon: <LineChart className="h-5 w-5 text-finance-primary" />,
      description: "Tools to plan and track your investments",
      items: [
        { path: '/sip-calculator.html', label: 'SIP Calculator', ariaLabel: 'SIP Calculator', icon: <PiggyBank className="h-4 w-4" />, description: 'Calculate returns on systematic investments' },
        { path: '/lumpsum-calculator.html', label: 'Lumpsum Calculator', ariaLabel: 'Lumpsum Calculator', icon: <PiggyBank className="h-4 w-4" />, description: 'Calculate returns on one-time investments' },
        { path: '/fd-calculator.html', label: 'FD Calculator', ariaLabel: 'Fixed Deposit Calculator', icon: <PiggyBank className="h-4 w-4" />, description: 'Calculate maturity amount on fixed deposits' },
        { path: '/swp-calculator.html', label: 'SWP Calculator', ariaLabel: 'Systematic Withdrawal Plan Calculator', icon: <PiggyBank className="h-4 w-4" />, description: 'Plan your systematic withdrawals' },
      ]
    },
    {
      title: "Loan",
      icon: <Calculator className="h-5 w-5 text-finance-primary" />,
      description: "Calculate and compare different loan options",
      items: [
        { path: '/home-loan-calculator.html', label: 'Home Loan', ariaLabel: 'Home Loan Calculator', icon: <Home className="h-4 w-4" />, description: 'Calculate EMI and total interest on home loans' },
        { path: '/car-loan-calculator.html', label: 'Car Loan', ariaLabel: 'Car Loan Calculator', icon: <Car className="h-4 w-4" />, description: 'Calculate EMI and total interest on car loans' },
        { path: '/personal-loan-calculator.html', label: 'Personal Loan', ariaLabel: 'Personal Loan Calculator', icon: <Wallet className="h-4 w-4" />, description: 'Calculate EMI and total interest on personal loans' },
        { path: '/education-loan-calculator.html', label: 'Education Loan', ariaLabel: 'Education Loan Calculator', icon: <GraduationCap className="h-4 w-4" />, description: 'Calculate EMI and total interest on education loans' },
      ]
    }
  ];

  return (
    <NavigationMenu className="max-w-full">
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "text-sm",
              calculatorCategories.some(category => 
                category.items.some(item => isActive(item.path))
              ) ? "text-finance-primary font-medium" : ""
            )}
          >
            Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[95vw] max-w-[1200px] p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {calculatorCategories.map((category) => (
                  <div key={category.title} className="space-y-3">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <h3 className="text-lg font-medium">{category.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <MegaMenuItem
                          key={item.path}
                          item={item}
                          onClick={closeMenu}
                          isActive={isActive(item.path)}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface MegaMenuItemProps {
  item: MenuItemType;
  onClick?: () => void;
  isActive?: boolean;
}

const MegaMenuItem: React.FC<MegaMenuItemProps> = ({ item, onClick, isActive }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={item.path}
          onClick={onClick}
          className={cn(
            "flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
            isActive ? "bg-accent/50 text-finance-primary font-medium" : "text-foreground"
          )}
          aria-label={item.ariaLabel}
        >
          {item.icon}
          <div>
            <div className="font-medium">{item.label}</div>
            {item.description && (
              <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
            )}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default MegaMenu;