import React from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from "@/components/ui/label";
import { REGION_PRESETS } from '@/constants/countryConstants';
import { SearchableSelect } from '@/components/ui/searchable-select';

interface RegionSelectorProps {
  selectedCountry: string;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  className?: string;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedCountry,
  selectedRegion,
  onRegionChange,
  className = "",
}) => {
  const { t } = useTranslation();
  const regions = REGION_PRESETS[selectedCountry as keyof typeof REGION_PRESETS] || [];

  if (regions.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="region-select">{t('common.region')}</Label>
      <SearchableSelect
        id="region-select"
        value={selectedRegion}
        onValueChange={onRegionChange}
        placeholder={t('common.region')}
        options={regions.map((region) => ({
          value: region.name,
          label: (
            <div className="flex flex-col">
              <span>{region.name}</span>
              <span className="text-xs text-muted-foreground">{region.description}</span>
            </div>
          )
        }))}
      />
    </div>
  );
};

export default RegionSelector;