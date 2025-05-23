
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Disclaimer from "./pages/Disclaimer";
import PurchasingPowerParity from "./pages/PurchasingPowerParity";
import SalaryToHourly from "./pages/SalaryToHourly";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CookieConsent from "./components/CookieConsent";

// Import Investment Calculator Pages
import SIPCalculator from "./components/SIPCalculator";
import LumpsumCalculator from "./components/LumpsumCalculator";
import FDCalculator from "./components/FDCalculator";
import SWPCalculator from "./components/SWPCalculator";
import SalaryHike from "./pages/SalaryHike";
import CurrencyConverter from "./pages/CurrencyConverter";

// Import Country Specific Pages
import IndiaPage from "./pages/country/IndiaPage";
import USPage from "./pages/country/USPage";
import UKPage from "./pages/country/UKPage";


// Import i18n configuration
import './i18n/i18n';
import HomeLoanCalculatorPage from "./pages/HomeLoanCalculator";
import CarLoanCalculatorPage from "./pages/CarLoanCalculator";
import PersonalLoanCalculatorPage from "./pages/PersonalLoanCalculator";
import EducationLoanCalculatorPage from "./pages/EducationLoanCalculator";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            {/* Basic Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about.html" element={<About />} />
            <Route path="/blog.html" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
             {/* Google adsense Routes */}
            <Route path="/privacy-policy.html" element={<PrivacyPolicy />} />
            <Route path="/terms.html" element={<Terms />} />
            <Route path="/contact.html" element={<Contact />} />
            <Route path="/disclaimer.html" element={<Disclaimer />} />
             {/* Finance Calculator Routes */}
            <Route path="/ppp-calculator.html" element={<PurchasingPowerParity />} />
            <Route path="/salary-to-hourly-calculator.html" element={<SalaryToHourly />} />
            <Route path="/salary-hike.html" element={<SalaryHike />} />
            <Route path="/currency-converter.html" element={<CurrencyConverter />} />

            {/* Investment Calculator Routes */}
            <Route path="/sip-calculator.html" element={<SIPCalculator />} />
            <Route path="/lumpsum-calculator.html" element={<LumpsumCalculator />} />
            <Route path="/fd-calculator.html" element={<FDCalculator />} />
            <Route path="/swp-calculator.html" element={<SWPCalculator />} />
             {/* Loan Calculator Routes */}
             <Route path="/home-loan-calculator.html" element={<HomeLoanCalculatorPage />} />
            <Route path="/car-loan-calculator.html" element={<CarLoanCalculatorPage />} />
            <Route path="/personal-loan-calculator.html" element={<PersonalLoanCalculatorPage />} />
            <Route path="/education-loan-calculator.html" element={<EducationLoanCalculatorPage />} />
            {/* Country Specific Routes */}
            <Route path="/in.html" element={<IndiaPage />} />
            <Route path="/us.html" element={<USPage />} />
            <Route path="/uk.html" element={<UKPage />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <CookieConsent />
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
