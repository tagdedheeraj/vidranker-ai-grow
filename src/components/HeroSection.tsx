
import { Button } from "@/components/ui/button";
import { Play, Zap, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-primary overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:60px_60px]" />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Logo and title */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/cbaa2d06-fff2-4a37-953d-e7a7c19204f3.png" 
              alt="VidRanker Logo" 
              className="w-16 h-16 rounded-2xl"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              VidRanker
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            Boost your video growth 🚀
          </p>
        </div>

        {/* Main description */}
        <div className="max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Generate SEO-Optimized Tags & Stunning Thumbnails
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Transform your video content with AI-powered SEO tags, descriptions, and custom thumbnails. 
            Boost your visibility, increase clicks, and grow your channel faster than ever.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="glass rounded-2xl p-6 text-white">
            <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-xl font-semibold mb-2">AI SEO Tags</h3>
            <p className="text-white/80">Generate optimized tags and descriptions to improve discoverability</p>
          </div>
          <div className="glass rounded-2xl p-6 text-white">
            <Play className="w-12 h-12 mx-auto mb-4 text-blue-300" />
            <h3 className="text-xl font-semibold mb-2">Custom Thumbnails</h3>
            <p className="text-white/80">Create eye-catching thumbnails designed to attract clicks</p>
          </div>
          <div className="glass rounded-2xl p-6 text-white">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-300" />
            <h3 className="text-xl font-semibold mb-2">Boost Visibility</h3>
            <p className="text-white/80">Enhance your chances of getting more engagement and views</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-xl px-8 py-6 rounded-2xl font-semibold shadow-2xl animate-pulse-glow"
            onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Creating Now →
          </Button>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-gentle" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce-gentle" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default HeroSection;
