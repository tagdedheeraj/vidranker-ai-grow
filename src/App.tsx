
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";
import Home from "./pages/Home";
import SEOGenerator from "./pages/SEOGenerator";
import ThumbnailGenerator from "./pages/ThumbnailGenerator";
import History from "./pages/History";
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import { adMobService } from "./services/admob";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize AdMob when app starts (only on mobile)
    const initializeAds = async () => {
      try {
        console.log("Initializing app...");
        await adMobService.initialize();
        
        // Show banner ad after a delay to avoid affecting initial load
        setTimeout(() => {
          adMobService.showBanner();
        }, 3000);
      } catch (error) {
        console.error("Error initializing ads:", error);
        // Don't crash the app if ads fail
      }
    };

    initializeAds();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/seo" element={<SEOGenerator />} />
                <Route path="/thumbnails" element={<ThumbnailGenerator />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <BottomNavigation />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
