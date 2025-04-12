
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

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
  formatValue
}) => {
  const displayValue = formatValue ? formatValue(value) : unit ? `${value} ${unit}` : value.toString();
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-sm font-medium">{displayValue}</span>
      </div>
      <Input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
        step={step}
      />
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(value) => onChange(value[0])}
      />
    </div>
  );
};

export default LoanFormField;
