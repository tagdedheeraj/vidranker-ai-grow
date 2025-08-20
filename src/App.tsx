
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
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("App starting - VidRanker v1.0");
        console.log("Platform:", Capacitor.getPlatform());
        console.log("Is native platform:", Capacitor.isNativePlatform());
        
        if (Capacitor.isNativePlatform()) {
          console.log("Native platform detected - initializing AdMob...");
          
          // Initialize AdMob with enhanced error handling
          setTimeout(async () => {
            try {
              await adMobService.initialize();
              console.log("AdMob initialization process completed");
              
              // Show banner after successful initialization
              setTimeout(async () => {
                try {
                  if (adMobService.isReady()) {
                    const bannerResult = await adMobService.showBanner();
                    console.log("Banner ad result:", bannerResult);
                  } else {
                    console.log("AdMob not ready - skipping banner");
                  }
                } catch (bannerError) {
                  console.error("Banner display error (app continues):", bannerError);
                }
              }, 2000);
            } catch (initError) {
              console.error("AdMob initialization error (app continues):", initError);
            }
          }, 4000); // Delayed initialization for stability
        } else {
          console.log("Web platform - AdMob disabled");
        }
        
        // Log final status
        setTimeout(() => {
          const status = adMobService.getStatus();
          console.log("Final AdMob status:", status);
        }, 8000);
      } catch (error) {
        console.error("App initialization error (non-fatal):", error);
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
