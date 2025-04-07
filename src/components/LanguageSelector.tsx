import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SUPPORTED_LANGUAGES, changeLanguage, getUserPreferredLanguage } from '@/utils/translationService';

interface LanguageSelectorProps {
  className?: string;
  countryCode?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = "", countryCode }) => {
  const { i18n } = useTranslation();
  
  // Initialize with user's preferred language on component mount
  useEffect(() => {
    const preferredLanguage = getUserPreferredLanguage();
    if (preferredLanguage && preferredLanguage !== i18n.language) {
      changeLanguage(preferredLanguage);
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
  };
  
  // Format language names with their native names
  const languages = SUPPORTED_LANGUAGES.map(lang => ({
    ...lang,
    name: lang.name + (lang.code !== 'en' ? ` (${lang.name})` : '')
  }));

  return (
    <div className={`${className}`}>
      <Select
        value={i18n.language}
        onValueChange={handleLanguageChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;