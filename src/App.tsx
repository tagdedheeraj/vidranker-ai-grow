
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import SEOGenerator from "./pages/SEOGenerator";
import ThumbnailGenerator from "./pages/ThumbnailGenerator";
import History from "./pages/History";
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import { adMobService } from "./services/admob";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("App starting...");
        console.log("Platform:", Capacitor.getPlatform());
        console.log("Is native platform:", Capacitor.isNativePlatform());
        
        // Only initialize AdMob on native platforms
        if (Capacitor.isNativePlatform()) {
          console.log("Native platform detected, initializing AdMob...");
          await adMobService.initialize();
          
          // Show banner ad after app is fully loaded
          setTimeout(async () => {
            const success = await adMobService.showBanner();
            console.log("Banner ad display result:", success);
          }, 3000);
        } else {
          console.log("Web platform detected, skipping AdMob initialization");
        }
        
        // Log AdMob service status
        console.log("AdMob service status:", adMobService.getStatus());
      } catch (error) {
        console.error("Error during app initialization:", error);
        // Don't crash the app if initialization fails
      }
    };

    initializeApp();
  }, []);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default App;
