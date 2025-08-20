
import HeroSection from "@/components/HeroSection";
import SEOGenerator from "@/components/SEOGenerator";
import ThumbnailGenerator from "@/components/ThumbnailGenerator";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SEOGenerator />
      <ThumbnailGenerator />
      <Footer />
    </div>
  );
};

export default Index;
