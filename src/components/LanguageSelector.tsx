import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, changeLanguage, getUserPreferredLanguage } from '@/utils/translationService';
import { SearchableSelect } from '@/components/ui/searchable-select';

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
      <SearchableSelect
        value={currentLang}
        onValueChange={handleLanguageChange}
        placeholder="Select language"
        triggerClassName="w-[180px]"
        options={languages.map((lang) => ({
          value: lang.code,
          label: lang.name
        }))}
      />
    </div>
  );
};

export default LanguageSelector;