
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { InfoCircle } from 'lucide-react';

interface LoanFormFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  formatValue?: (value: number) => string;
  tooltip?: string;
}

const LoanFormField: React.FC<LoanFormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit = '',
  formatValue,
  tooltip
}) => {
  const displayValue = formatValue ? formatValue(value) : unit ? `${value} ${unit}` : value.toString();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      // Constrain value to min/max range
      const constrainedValue = Math.min(Math.max(newValue, min), max);
      onChange(constrainedValue);
    }
  };
  
  return (
    <div className="space-y-2 transition-all duration-200 hover:bg-muted/20 p-2 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
          {tooltip && (
            <div className="relative group">
              <InfoCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        <span className="text-sm font-medium">{displayValue}</span>
      </div>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="number"
          value={value}
          onChange={handleInputChange}
          className="flex-1 text-right"
          step={step}
          min={min}
          max={max}
        />
      </div>
      <div className="flex items-center gap-2 px-1">
        <span className="text-xs text-muted-foreground">{formatValue ? formatValue(min) : min}</span>
        <Slider
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={(value) => onChange(value[0])}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground">{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
};

export default LoanFormField;
