import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SUPPORTED_LANGUAGES, changeLanguage, getUserPreferredLanguage } from '@/utils/translationService';

interface LanguageSelectorProps {
  className?: string;
  countryCode?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = "", countryCode }) => {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');
  
  // Initialize with user's preferred language on component mount
  useEffect(() => {
    const preferredLanguage = getUserPreferredLanguage();
    console.log('Preferred language:', preferredLanguage);
    console.log('Current i18n language:', i18n.language);
    
    if (preferredLanguage && preferredLanguage !== i18n.language) {
      changeLanguage(preferredLanguage);
      setCurrentLang(preferredLanguage);
    }
  }, []);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      console.log('Language changed event detected:', lng);
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const handleLanguageChange = (langCode: string) => {
    console.log('Language selection changed to:', langCode);
    changeLanguage(langCode);
    setCurrentLang(langCode);
  };
  
  // Format language names to display only the native name
  const languages = SUPPORTED_LANGUAGES.map(lang => ({
    ...lang,
    // Keep the name as is - already in native language
    name: lang.name
  }));

  return (
    <div className={`${className}`}>
      <Select
        value={currentLang}
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