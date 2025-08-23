
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
  // Critical: Check if current path should bypass React Router
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
      // Force browser to fetch the actual file
      window.location.reload();
      return;
    }
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("VidRanker starting - Optimized loading v2.0");
        console.log("Platform:", Capacitor.getPlatform());
        console.log("Is native platform:", Capacitor.isNativePlatform());
        
        // Hide splash screen after app is ready (faster loading)
        if (Capacitor.isNativePlatform()) {
          setTimeout(async () => {
            try {
              await SplashScreen.hide();
              console.log("Splash screen hidden - app ready");
            } catch (error) {
              console.error("Splash screen hide error (non-fatal):", error);
            }
          }, 2000);
        }
        
        if (Capacitor.isNativePlatform()) {
          console.log("Native platform detected - initializing AdMob for domain verification...");
          
          // Optimized AdMob initialization for faster startup
          setTimeout(async () => {
            try {
              // Check if service is still valid
              if (adMobService && typeof adMobService.initialize === 'function') {
                await adMobService.initialize();
                console.log("AdMob initialization completed - ready for vidranker.space verification");
                
                // Show banner after successful initialization (reduced delay)
                setTimeout(async () => {
                  try {
                    if (adMobService && adMobService.isReady && adMobService.isReady()) {
                      const bannerResult = await adMobService.showBanner();
                      console.log("Banner ad result for domain verification:", bannerResult);
                    } else {
                      console.log("AdMob not ready - skipping banner");
                    }
                  } catch (bannerError) {
                    console.error("Banner display error (app continues safely):", bannerError);
                  }
                }, 1500);
              } else {
                console.log("AdMob service not available - skipping initialization");
              }
            } catch (initError) {
              console.error("AdMob initialization error (app continues safely):", initError);
            }
          }, 2500); // Reduced initialization delay for faster startup
        } else {
          console.log("Web platform - AdMob disabled");
        }
        
        // Log final status with safety checks
        setTimeout(() => {
          try {
            if (adMobService && typeof adMobService.getStatus === 'function') {
              const status = adMobService.getStatus();
              console.log("Final AdMob status for domain verification:", status);
              console.log("Domain verification: Upload app-ads.txt to vidranker.space/app-ads.txt");
            }
          } catch (statusError) {
            console.error("Error getting AdMob status (non-fatal):", statusError);
          }
        }, 6000);
      } catch (error) {
        console.error("App initialization error (app continues safely):", error);
      }
    };

    initializeApp();

    // Cleanup function
    return () => {
      try {
        if (adMobService && typeof adMobService.destroy === 'function') {
          adMobService.destroy();
        }
      } catch (error) {
        console.error("Cleanup error (non-fatal):", error);
      }
    };
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
