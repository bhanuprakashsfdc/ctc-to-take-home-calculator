
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

interface LoanSummaryProps {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  formatCurrency: (value: number) => string;
}

const LoanSummary: React.FC<LoanSummaryProps> = ({
  monthlyPayment,
  totalPayment,
  totalInterest,
  formatCurrency
}) => {
  const isMobile = useIsMobile();
  const principal = totalPayment - totalInterest;
  
  // Data for pie chart
  const data = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: totalInterest }
  ];
  
  const COLORS = ['#4ade80', '#f87171'];
  
  return (
    <div className="mt-6 p-4 bg-muted rounded-lg space-y-6">
      <h3 className="text-xl font-semibold text-center">Loan Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-background rounded-md shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
          <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
        </div>
        
        <div className="p-3 bg-background rounded-md shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
          <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
        </div>
        
        <div className="p-3 bg-background rounded-md shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
          <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            ({Math.round((totalInterest / totalPayment) * 100)}% of total payment)
          </p>
        </div>
      </div>
      
      {principal > 0 && totalInterest > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-center mb-2">Payment Breakdown</p>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 40 : 60}
                  outerRadius={isMobile ? 70 : 90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4ade80]"></div>
              <span className="text-xs">Principal: {formatCurrency(principal)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f87171]"></div>
              <span className="text-xs">Interest: {formatCurrency(totalInterest)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanSummary;
