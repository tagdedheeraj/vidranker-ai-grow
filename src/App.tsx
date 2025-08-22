
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/BottomNavigation";

const Home = lazy(() => import("@/pages/Home"));
const SEOGenerator = lazy(() => import("@/pages/SEOGenerator"));
const ThumbnailGenerator = lazy(() => import("@/pages/ThumbnailGenerator"));
const History = lazy(() => import("@/pages/History"));
const Settings = lazy(() => import("@/pages/Settings"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <div className="min-h-screen flex flex-col bg-background">
              <Header />
              <main className="flex-1">
                <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]">Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/seo" element={<SEOGenerator />} />
                    <Route path="/seo-generator" element={<SEOGenerator />} />
                    <Route path="/thumbnails" element={<ThumbnailGenerator />} />
                    <Route path="/thumbnail-generator" element={<ThumbnailGenerator />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <BottomNavigation />
            </div>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
