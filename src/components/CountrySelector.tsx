import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SUPPORTED_COUNTRIES } from '@/constants/countryConstants';

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  className?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange,
  className = "",
}) => {
  const { t } = useTranslation();

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="country-select">{t('common.country')}</Label>
      <Select
        value={selectedCountry}
        onValueChange={onCountryChange}
      >
        <SelectTrigger id="country-select" className="w-full">
          <SelectValue placeholder={t('common.country')} />
        </SelectTrigger>
        <SelectContent>
          {SUPPORTED_COUNTRIES.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <div className="flex items-center">
                <span className="mr-2">{country.code}</span>
                <span>{t(`countries.${country.code}`)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelector;