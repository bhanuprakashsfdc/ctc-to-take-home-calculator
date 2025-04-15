
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CountrySelector from './CountrySelector';
import { SUPPORTED_COUNTRIES, DEFAULT_COUNTRY } from '@/constants/countryConstants';
import { PPP_CITY_PRESETS } from '@/constants/pppConstants';
import { calculatePPPSalary, getPPPDescription, formatPPPFactor } from '@/utils/pppCalculator';
import './PurchasingPowerParityCalculator.css';

const PurchasingPowerParityCalculator: React.FC = () => {
  const { t } = useTranslation();
  
  // Form state
  const [salary, setSalary] = useState<number>(100000);
  const [fromCountry, setFromCountry] = useState<string>(DEFAULT_COUNTRY);
  const [fromCity, setFromCity] = useState<string>('');
  const [toCountry, setToCountry] = useState<string>('US');
  const [toCity, setToCity] = useState<string>('');
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly');
  
  // Results state
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // Set default cities when countries change
  useEffect(() => {
    setDefaultCity(fromCountry, setFromCity);
  }, [fromCountry]);

  useEffect(() => {
    setDefaultCity(toCountry, setToCity);
  }, [toCountry]);
  
  // Automatically calculate when any input changes
  useEffect(() => {
    handleCalculate();
  }, [salary, fromCountry, fromCity, toCountry, toCity, viewMode]);

  const setDefaultCity = (countryCode: string, setCityFn: React.Dispatch<React.SetStateAction<string>>) => {
    const cities = PPP_CITY_PRESETS[countryCode as keyof typeof PPP_CITY_PRESETS] || [];
    if (cities.length > 0) {
      setCityFn(cities[0].name);
    } else {
      setCityFn('Other');
    }
  };

  // Handle calculation
  const handleCalculate = () => {
    try {
      // Adjust salary based on view mode
      const annualSalary = viewMode === 'monthly' ? salary * 12 : salary;
      
      const result = calculatePPPSalary({
        salary: annualSalary,
        fromCountry,
        fromCity,
        toCountry,
        toCity
      });
      
      setCalculationResult(result);
      setHasCalculated(true);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  // Format display values based on view mode
  const getDisplayValue = (value: number, countryCode: string) => {
    const displayValue = viewMode === 'monthly' ? value / 12 : value;
    const countryInfo = SUPPORTED_COUNTRIES.find(c => c.code === countryCode);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: countryInfo?.currency || 'USD',
      maximumFractionDigits: 0,
    }).format(Math.round(displayValue));
  };

  return (
    <div className="ppp-calculator">
      <div className="ppp-calculator-header">
        <h2>Purchasing Power Parity Calculator</h2>
        <p className="ppp-calculator-description">
          Compare salaries across different countries adjusted for cost of living
        </p>
      </div>

      <div className="ppp-calculator-form">
        <div className="ppp-calculator-section ppp-calculator-locations">
          {/* Source Country/City */}
          <div className="ppp-calculator-location">
            <h3>Source Location</h3>
            
            <div className="ppp-form-group">
              <label htmlFor="fromCountry">Country</label>
              <CountrySelector
                id="fromCountry"
                value={fromCountry}
                onChange={setFromCountry}
                disableNavigation={true}
              />
            </div>
            
            <div className="ppp-form-group">
              <label htmlFor="fromCity">City</label>
              <select
                id="fromCity"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="ppp-select"
              >
                {PPP_CITY_PRESETS[fromCountry as keyof typeof PPP_CITY_PRESETS]?.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name} - {city.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Target Country/City */}
          <div className="ppp-calculator-location">
            <h3>Target Location</h3>
            
            <div className="ppp-form-group">
              <label htmlFor="toCountry">Country</label>
              <CountrySelector
                id="toCountry"
                value={toCountry}
                onChange={setToCountry}
                disableNavigation={true}
              />
            </div>
            
            <div className="ppp-form-group">
              <label htmlFor="toCity">City</label>
              <select
                id="toCity"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="ppp-select"
              >
                {PPP_CITY_PRESETS[toCountry as keyof typeof PPP_CITY_PRESETS]?.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name} - {city.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Salary Input */}
        <div className="ppp-calculator-section ppp-calculator-salary">
          <div className="ppp-salary-header">
            <label htmlFor="salary">Salary</label>
            <div className="ppp-view-toggle">
              <label>
                <input
                  type="radio"
                  name="viewMode"
                  value="monthly"
                  checked={viewMode === "monthly"}
                  onChange={() => setViewMode("monthly")}
                />
                <span>Monthly</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="viewMode"
                  value="yearly"
                  checked={viewMode === "yearly"}
                  onChange={() => setViewMode("yearly")}
                />
                <span>Yearly</span>
              </label>
            </div>
          </div>
          
          <div className="ppp-salary-input">
            <input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
            <span className="ppp-currency-symbol">
              {SUPPORTED_COUNTRIES.find(c => c.code === fromCountry)?.currencySymbol}
            </span>
          </div>
        </div>

        {/* Results Section */}
        {hasCalculated && calculationResult && (
          <div className="ppp-calculator-results">
            <h3>Equivalent Salary</h3>
            
            <div className="ppp-result-comparison">
              <div className="ppp-result-card">
                <p className="ppp-result-location">
                  {fromCity}, {SUPPORTED_COUNTRIES.find(c => c.code === fromCountry)?.name}
                </p>
                <p className="ppp-result-value">
                  {getDisplayValue(calculationResult.originalSalary, fromCountry)}
                </p>
              </div>
              
              <div className="ppp-result-card">
                <p className="ppp-result-location">
                  {toCity}, {SUPPORTED_COUNTRIES.find(c => c.code === toCountry)?.name}
                </p>
                <p className="ppp-result-value highlight">
                  {getDisplayValue(calculationResult.convertedSalary, toCountry)}
                </p>
              </div>
            </div>
            
            <div className="ppp-result-description">
              <p>{getPPPDescription(calculationResult, fromCity, toCity)}</p>
            </div>
            
            <div className="ppp-result-factors">
              <div className="ppp-factor">
                <p className="ppp-factor-label">Purchasing Power</p>
                <p className="ppp-factor-value">{formatPPPFactor(calculationResult.pppFactor)}</p>
              </div>
              <div className="ppp-factor">
                <p className="ppp-factor-label">Cost of Living</p>
                <p className="ppp-factor-value">{formatPPPFactor(calculationResult.costOfLivingFactor)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Explanation Section */}
        <div className="ppp-calculator-footer">
          <h3>About Purchasing Power Parity</h3>
          <p>
            Purchasing Power Parity (PPP) compares different countries' currencies through a "basket of goods" approach. 
            It helps understand what your salary is actually worth in different countries by accounting for cost of living differences.
          </p>
          <p>
            This calculator combines PPP data with city-specific cost of living indices to give you a more accurate comparison 
            of what your salary would need to be in another location to maintain the same standard of living.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchasingPowerParityCalculator;
