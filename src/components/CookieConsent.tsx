import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CookieSettings {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent: React.FC = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showCustomize, setShowCustomize] = useState<boolean>(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true, // Always required
    preferences: false,
    analytics: false,
    marketing: false
  });

  // Check if user is from EU (simplified version - in production, use a proper IP geolocation service)
  const checkIfEuUser = (): boolean => {
    // This is a placeholder. In a real implementation, you would use a geolocation service
    // to determine if the user is from the EU based on their IP address
    const userLanguage = navigator.language || '';
    const euLanguages = ['de', 'fr', 'es', 'it', 'nl', 'pt', 'pl', 'sv', 'da', 'fi', 'el', 'cs', 'hu', 'ro'];
    return euLanguages.some(lang => userLanguage.startsWith(lang));
  };

  useEffect(() => {
    // Check if consent was already given
    const consentGiven = localStorage.getItem('cookieConsent');
    if (!consentGiven && (checkIfEuUser() || process.env.NODE_ENV === 'development')) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setCookieSettings({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true
    });
    saveConsent({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true
    });
  };

  const handleRejectAll = () => {
    setCookieSettings({
      necessary: true, // Necessary cookies are always accepted
      preferences: false,
      analytics: false,
      marketing: false
    });
    saveConsent({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false
    });
  };

  const handleSavePreferences = () => {
    saveConsent(cookieSettings);
  };

  const saveConsent = (settings: CookieSettings) => {
    localStorage.setItem('cookieConsent', JSON.stringify(settings));
    setShowBanner(false);
    setShowCustomize(false);
    
    // Here you would implement the actual cookie management based on user preferences
    // For example, enabling/disabling Google Analytics, etc.
  };

  const handleSettingChange = (setting: keyof CookieSettings) => {
    if (setting === 'necessary') return; // Cannot change necessary cookies
    
    setCookieSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm border-t">
      <div className="container mx-auto max-w-4xl">
        {!showCustomize ? (
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{t('gdpr.consentTitle')}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{t('gdpr.consentText')}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowCustomize(true)}>
                    {t('gdpr.customize')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRejectAll}>
                    {t('gdpr.rejectAll')}
                  </Button>
                  <Button variant="default" size="sm" onClick={handleAcceptAll}>
                    {t('gdpr.acceptAll')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-4">{t('gdpr.consentTitle')}</h3>
              
              <Tabs defaultValue="necessary" className="mb-4">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="necessary">{t('gdpr.necessary')}</TabsTrigger>
                  <TabsTrigger value="preferences">{t('gdpr.preferences')}</TabsTrigger>
                  <TabsTrigger value="analytics">{t('gdpr.analytics')}</TabsTrigger>
                  <TabsTrigger value="marketing">{t('gdpr.marketing')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="necessary" className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="necessary-cookies">{t('gdpr.necessary')}</Label>
                    <Switch id="necessary-cookies" checked={cookieSettings.necessary} disabled />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies are essential for the website to function properly and cannot be disabled.
                  </p>
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="preferences-cookies">{t('gdpr.preferences')}</Label>
                    <Switch 
                      id="preferences-cookies" 
                      checked={cookieSettings.preferences} 
                      onCheckedChange={() => handleSettingChange('preferences')}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies allow the website to remember choices you make and provide enhanced functionality.
                  </p>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="analytics-cookies">{t('gdpr.analytics')}</Label>
                    <Switch 
                      id="analytics-cookies" 
                      checked={cookieSettings.analytics} 
                      onCheckedChange={() => handleSettingChange('analytics')}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies help us understand how visitors interact with the website, helping us improve our services.
                  </p>
                </TabsContent>
                
                <TabsContent value="marketing" className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing-cookies">{t('gdpr.marketing')}</Label>
                    <Switch 
                      id="marketing-cookies" 
                      checked={cookieSettings.marketing} 
                      onCheckedChange={() => handleSettingChange('marketing')}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These cookies are used to track visitors across websites to display relevant advertisements.
                  </p>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setShowCustomize(false)}>
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={handleSavePreferences}>
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;