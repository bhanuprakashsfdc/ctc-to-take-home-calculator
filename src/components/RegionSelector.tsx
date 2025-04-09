import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { REGION_PRESETS } from '@/constants/countryConstants';

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
      <Select
        value={selectedRegion}
        onValueChange={onRegionChange}
      >
        <SelectTrigger id="region-select" className="w-full">
          <SelectValue placeholder={t('common.region')} />
        </SelectTrigger>
        <SelectContent>
          {regions.map((region) => (
            <SelectItem key={region.name} value={region.name}>
              <div className="flex flex-col">
                <span>{region.name}</span>
                <span className="text-xs text-muted-foreground">{region.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RegionSelector;