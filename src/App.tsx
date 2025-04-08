
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

// Import Country Specific Pages
import IndiaPage from "./pages/country/IndiaPage";
import USPage from "./pages/country/USPage";
import UKPage from "./pages/country/UKPage";

// Import i18n configuration
import './i18n/i18n';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about.html" element={<About />} />
            <Route path="/privacy-policy.html" element={<PrivacyPolicy />} />
            <Route path="/terms.html" element={<Terms />} />
            <Route path="/contact.html" element={<Contact />} />
            <Route path="/disclaimer.html" element={<Disclaimer />} />
            <Route path="/ppp-calculator.html" element={<PurchasingPowerParity />} />
            <Route path="/salary-to-hourly-calculator.html" element={<SalaryToHourly />} />
            <Route path="/blog.html" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

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
