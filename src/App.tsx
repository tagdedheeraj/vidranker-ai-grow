import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
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
import { enhancedAdMobService } from "./services/enhancedAdMobService";
import AppAdsText from "./components/AppAdsText";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

import { adMobInit } from "./services/adMobInit";

const App = () => {
  useEffect(() => {
    const path = window.location.pathname;
    const staticFiles = [
      '/app-ads.txt', 
      '/.well-known/app-ads.txt',
      '/robots.txt',
      '/favicon.ico'
    ];
    
    if (staticFiles.includes(path)) {
      console.log('Static file requested, bypassing React Router:', path);
      window.location.reload();
      return;
    }
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("🚀 VidRanker Starting - Production Mode");
        console.log("📱 Platform:", Capacitor.getPlatform());
        console.log("🔧 Native Platform:", Capacitor.isNativePlatform());
        
        // Hide splash screen
        if (Capacitor.isNativePlatform()) {
          setTimeout(async () => {
            try {
              await SplashScreen.hide();
              console.log("✅ Splash screen hidden");
            } catch (error) {
              console.error("⚠️ Splash screen error:", error);
            }
          }, 2000);

          // Initialize AdMob with new service
          setTimeout(async () => {
            try {
              console.log("🎯 Starting AdMob initialization...");
              const success = await adMobInit.initialize();
              
              if (success) {
                console.log("✅ AdMob ready for production ads!");
              } else {
                console.log("❌ AdMob initialization failed");
              }
            } catch (error) {
              console.error("💥 AdMob error:", error);
            }
          }, 1500);
        } else {
          console.log("🌐 Web platform - AdMob will be initialized when app runs on mobile");
        }
        
      } catch (error) {
        console.error("💥 App initialization error:", error);
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
              <Routes>
                <Route path="/app-ads.txt" element={<AppAdsText />} />
                <Route path="/.well-known/app-ads.txt" element={<AppAdsText />} />
                <Route path="/*" element={
                  <>
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
                  </>
                } />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
