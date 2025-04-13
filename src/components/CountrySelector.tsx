import React from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from "@/components/ui/label";
import { SUPPORTED_COUNTRIES } from '@/constants/countryConstants';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { SearchableSelect } from '@/components/ui/searchable-select';

interface CountrySelectorProps {
  selectedCountry?: string;
  onCountryChange?: (country: string) => void;
  className?: string;
  disableNavigation?: boolean;
  // Additional props for compatibility with PurchasingPowerParityCalculator
  id?: string;
  value?: string;
  onChange?: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange,
  className = "",
  disableNavigation = false,
  id,
  value,
  onChange,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize useNavigate
  
  // Use the appropriate value and change handler based on props provided
  const effectiveValue = value || selectedCountry || "";
  const effectiveChangeHandler = onChange || onCountryChange;

  // Handle country selection: Navigate for specific countries only if navigation is not disabled
  const handleValueChange = (newValue: string) => {
    if (effectiveChangeHandler) {
      effectiveChangeHandler(newValue);
    }
    
    // Only navigate if navigation is not disabled and we're changing to a country with a dedicated page
    if (!disableNavigation) {
      const countryCodeLower = newValue.toLowerCase();
      const dedicatedPages = ['in', 'us', 'uk']; // Countries with dedicated pages

      if (dedicatedPages.includes(countryCodeLower)) {
        navigate(`/${countryCodeLower}.html`);
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id || "country-select"}>{t('common.country')}</Label>
      <SearchableSelect
        className="pushback"
        id={id || "country-select"}
        value={effectiveValue}
        onValueChange={handleValueChange}
        placeholder={t('common.country')}
        options={SUPPORTED_COUNTRIES.map((country) => ({
          value: country.code,
          label: (
            <div className="flex items-center">
              <span className="mr-2">{country.code}</span>
              <span>{t(`countries.${country.code}`)}</span>
            </div>
          )
        }))}
      />
    </div>
  );
};

export default CountrySelector;