import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CountrySelector from './CountrySelector';
import RegionSelector from './RegionSelector';
import { 
  calculateInternationalSalaryBreakdown, 
  calculateInternationalIncomeTax,
  formatInternationalCurrency,
  convertCurrency
} from '@/utils/internationalSalaryCalculator';
import { SUPPORTED_COUNTRIES, DEFAULT_COUNTRY, REGION_PRESETS } from '@/constants/countryConstants';

interface InternationalCTCCalculatorFormProps {
  defaultCountry?: string;
}

const InternationalCTCCalculatorForm: React.FC<InternationalCTCCalculatorFormProps> = ({ defaultCountry }) => {
  const { t } = useTranslation();
  const [ctc, setCtc] = useState<number>(1500000);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const [country, setCountry] = useState<string>(defaultCountry || DEFAULT_COUNTRY);
  const [region, setRegion] = useState<string>('');
  
  // Country-specific deductions
  const [deductions, setDeductions] = useState<Record<string, number | "">>({});

  // Auto-detect country based on IP and set appropriate language
  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Import dynamically to avoid SSR issues
        const { detectUserCountry, validateCountryCode } = await import('@/utils/geoLocationService');
        const { setLanguageFromCountry } = await import('@/utils/translationService');
        
        const detectedCountry = await detectUserCountry();
        const validCountry = validateCountryCode(detectedCountry);
        
        // Set country and region
        setCountry(validCountry);
        setDefaultRegion(validCountry);
        
        // Set language based on detected country
        setLanguageFromCountry(validCountry);
      } catch (error) {
        console.error('Error detecting country:', error);
        // Fallback to default country
        setCountry(DEFAULT_COUNTRY);
        setDefaultRegion(DEFAULT_COUNTRY);
      }
    };
    
    detectCountry();
  }, []);

  // Set default region when country changes
  useEffect(() => {
    setDefaultRegion(country);
    // Reset deductions when country changes
    setDeductions({});
  }, [country]);

  const setDefaultRegion = (countryCode: string) => {
    const regions = REGION_PRESETS[countryCode as keyof typeof REGION_PRESETS] || [];
    if (regions.length > 0) {
      setRegion(regions[0].name);
    } else {
      setRegion('');
    }
  };
  
  // Calculate salary breakdown based on inputs
  const salaryBreakdown = calculateInternationalSalaryBreakdown(ctc, country, region);
  
  // Convert deductions object for tax calculation
  const deductionsForTax: Record<string, number> = {};
  Object.keys(deductions).forEach(key => {
    deductionsForTax[key] = typeof deductions[key] === 'string' ? 0 : (deductions[key] as number);
  });

  // Calculate income tax
  const incomeTax = calculateInternationalIncomeTax({
    annualSalary: salaryBreakdown.grossSalary,
    country,
    region,
    taxRegime: country === 'IN' ? taxRegime : undefined,
    deductions: deductionsForTax
  });
  
  // Total deductions including income tax
  const totalDeductions = salaryBreakdown.totalDeductions + incomeTax;
  
  // Final in-hand salary after all deductions
  const finalNetSalary = salaryBreakdown.grossSalary - totalDeductions;
  
  // Format numbers for display, based on view mode (monthly/yearly)
  const getDisplayValue = (value: number) => {
    const displayValue = viewMode === 'monthly' ? value / 12 : value;
    return formatInternationalCurrency(Math.round(displayValue), country);
  };

  // Handle numeric input change with empty string support
  const handleNumberChange = (key: string) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setDeductions(prev => ({
        ...prev,
        [key]: value === "" ? "" : Number(value)
      }));
    };

  // Get country-specific deduction fields
  const renderCountrySpecificDeductions = () => {
    if (country === 'IN' && taxRegime === 'old') {
      return (
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">{t('form.taxSavingInvestments')}</h3>
          
          <div className="space-y-2">
            <Label htmlFor="section80c">{t('form.section80C')}</Label>
            <Input
              id="section80c"
              type="number"
              value={deductions.section80C || ""}
              onChange={handleNumberChange('section80C')}
              placeholder="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="section80d">{t('form.section80D')}</Label>
            <Input
              id="section80d"
              type="number"
              value={deductions.section80D || ""}
              onChange={handleNumberChange('section80D')}
              placeholder="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="housingLoan">{t('form.housingLoan')}</Label>
            <Input
              id="housingLoan"
              type="number"
              value={deductions.housingLoan || ""}
              onChange={handleNumberChange('housingLoan')}
              placeholder="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nps">{t('form.nps')}</Label>
            <Input
              id="nps"
              type="number"
              value={deductions.nps || ""}
              onChange={handleNumberChange('nps')}
              placeholder="0"
            />
          </div>
        </div>
      );
    } else if (country === 'US') {
      return (
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">{t('countrySpecific.US.401k')}</h3>
          
          <div className="space-y-2">
            <Label htmlFor="contribution401k">{t('countrySpecific.US.401k')}</Label>
            <Input
              id="contribution401k"
              type="number"
              value={deductions.contribution401k || ""}
              onChange={handleNumberChange('contribution401k')}
              placeholder="0"
            />
          </div>
        </div>
      );
    } else if (country === 'UK') {
      return (
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">{t('countrySpecific.UK.pensionContribution')}</h3>
          
          <div className="space-y-2">
            <Label htmlFor="pensionContribution">{t('countrySpecific.UK.pensionContribution')}</Label>
            <Input
              id="pensionContribution"
              type="number"
              value={deductions.pensionContribution || ""}
              onChange={handleNumberChange('pensionContribution')}
              placeholder="0"
            />
          </div>
        </div>
      );
    }
    
    return null;
  };

  // Render country-specific tax regime options
  const renderTaxRegimeOptions = () => {
    if (country === 'IN') {
      return (
        <div className="space-y-2">
          <Label>{t('form.taxRegime')}</Label>
          <RadioGroup 
            value={taxRegime} 
            onValueChange={(value) => setTaxRegime(value as 'old' | 'new')}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new">{t('form.newTaxRegime')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="old" id="old" />
              <Label htmlFor="old">{t('form.oldTaxRegime')}</Label>
            </div>
          </RadioGroup>
        </div>
      );
    }
    
    return null;
  };

  // Get country-specific earnings components
  const renderCountrySpecificEarnings = () => {
    if (country === 'IN') {
      return (
        <>
          <div className="result-row">
            <span className="result-label">{t('form.hra')}</span>
            <span className="result-value addition">{getDisplayValue(salaryBreakdown.countrySpecificComponents.hra || 0)}</span>
          </div>
          
          <div className="result-row">
            <span className="result-label">{t('form.specialAllowance')}</span>
            <span className="result-value addition">{getDisplayValue(salaryBreakdown.countrySpecificComponents.specialAllowance || 0)}</span>
          </div>
        </>
      );
    } else if (country === 'US') {
      return null; // US typically just shows gross salary
    } else if (country === 'UK') {
      return null; // UK typically just shows gross salary
    }
    
    return null;
  };

  // Get country-specific deduction components
  const renderCountrySpecificDeductionComponents = () => {
    if (country === 'IN') {
      return (
        <>
          <div className="result-row">
            <span className="result-label">{t('countrySpecific.IN.epf')}</span>
            <span className="result-value deduction">{getDisplayValue(salaryBreakdown.countrySpecificComponents.epfEmployee || 0)}</span>
          </div>
          
          <div className="result-row">
            <span className="result-label">{t('countrySpecific.IN.professionalTax')}</span>
            <span className="result-value deduction">{getDisplayValue(salaryBreakdown.countrySpecificComponents.professionalTax || 0)}</span>
          </div>
        </>
      );
    } else if (country === 'US') {
      return (
        <>
          <div className="result-row">
            <span className="result-label">{t('countrySpecific.US.socialSecurity')}</span>
            <span className="result-value deduction">{getDisplayValue(salaryBreakdown.countrySpecificComponents.socialSecurityTax || 0)}</span>
          </div>
          
          <div className="result-row">
            <span className="result-label">{t('countrySpecific.US.medicare')}</span>
            <span className="result-value deduction">{getDisplayValue(salaryBreakdown.countrySpecificComponents.medicareTax || 0)}</span>
          </div>
          
          <div className="result-row">
            <span className="result-label">{t('countrySpecific.US.401k')}</span>
            <span className="result-value deduction">{getDisplayValue(salaryBreakdown.countrySpecificComponents.contribution401k || 0)}</span>
          </div>
        </>
      );
    } else if (country === 'UK') {
      return (
        <>
          <div className="result-row">
            <span className="result-label">{t('countrySpecific.UK.nationalInsurance')}</span>
            <span className="result-value deduction">{getDisplayValue(salaryBreakdown.countrySpecificComponents.nationalInsurance || 0)}</span>
          </div>
          
          <div className="result-row">
            <span className="result-label">{t('countrySpecific.UK.pensionContribution')}</span>
            <span className="result-value deduction">{getDisplayValue(salaryBreakdown.countrySpecificComponents.pensionContribution || 0)}</span>
          </div>
        </>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-6 ctc-calculator">
      <Card className="card-highlight">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CountrySelector 
                selectedCountry={country} 
                onCountryChange={setCountry} 
              />
              
              {region && (
                <RegionSelector
                  selectedCountry={country}
                  selectedRegion={region}
                  onRegionChange={setRegion}
                />
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ctc">{t('form.annualCTC')}</Label>
              <Input
                id="ctc"
                type="number"
                value={ctc}
                onChange={(e) => setCtc(Number(e.target.value))}
                className="text-lg font-medium"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="viewMode">{t('common.viewMode')}</Label>
              <div className="flex items-center space-x-2">
                <Label htmlFor="viewMode" className={`${viewMode === 'monthly' ? 'text-finance-primary font-medium' : ''}`}>
                  {t('common.monthly')}
                </Label>
                <Switch
                  id="viewMode"
                  checked={viewMode === 'yearly'}
                  onCheckedChange={(checked) => setViewMode(checked ? 'yearly' : 'monthly')}
                />
                <Label htmlFor="viewMode" className={`${viewMode === 'yearly' ? 'text-finance-primary font-medium' : ''}`}>
                  {t('common.yearly')}
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-highlight">
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold text-finance-primary">{t('common.earnings')}</h2>
            
            <div className="space-y-2">
              <div className="result-row">
                <span className="result-label">{t('form.basicSalary')}</span>
                <span className="result-value addition">{getDisplayValue(salaryBreakdown.basic)}</span>
              </div>
              
              {renderCountrySpecificEarnings()}
              
              <div className="result-row font-bold">
                <span className="result-label">{t('form.grossSalary')}</span>
                <span className="result-value addition">{getDisplayValue(salaryBreakdown.grossSalary)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-highlight">
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold text-finance-warning">{t('common.deductions')}</h2>
            
            <div className="space-y-2">
              {renderCountrySpecificDeductionComponents()}
              
              <div className="result-row">
                <span className="result-label">{t('form.incomeTax')}</span>
                <span className="result-value deduction">{getDisplayValue(incomeTax)}</span>
              </div>
              
              <div className="result-row font-bold">
                <span className="result-label">{t('form.totalDeductions')}</span>
                <span className="result-value deduction">{getDisplayValue(totalDeductions)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-highlight bg-finance-primary text-white">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-xl font-bold mb-2 md:mb-0">{t('common.netTakeHome')}</h2>
            <div className="text-2xl font-bold">{getDisplayValue(finalNetSalary)}</div>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        variant="outline" 
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full"
      >
        {showAdvanced ? t('common.hideAdvanced') : t('common.showAdvanced')}
      </Button>
      
      {showAdvanced && (
        <Card className="card-highlight">
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">{t('common.taxOptions')}</h2>
            
            <div className="space-y-4">
              {renderTaxRegimeOptions()}
              {renderCountrySpecificDeductions()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InternationalCTCCalculatorForm;