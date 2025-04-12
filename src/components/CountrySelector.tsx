import React from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from "@/components/ui/label";
import { SUPPORTED_COUNTRIES } from '@/constants/countryConstants';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { SearchableSelect } from '@/components/ui/searchable-select';

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  className?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange, // Keep this prop for potential non-navigation scenarios
  className = "",
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle country selection: Navigate for specific countries
  const handleValueChange = (value: string) => {
    const countryCodeLower = value.toLowerCase();
    const dedicatedPages = ['in', 'us', 'uk']; // Countries with dedicated pages

    if (dedicatedPages.includes(countryCodeLower)) {
      navigate(`/${countryCodeLower}.html`);
    } else {
      // For other countries, use the existing callback to update state
      onCountryChange(value);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="country-select">{t('common.country')}</Label>
      <SearchableSelect
        id="country-select"
        value={selectedCountry}
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