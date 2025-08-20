
import { Button } from "@/components/ui/button";
import { Play, Zap, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-primary overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Logo and title */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center glass">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              VidRanker
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            Boost Your YouTube Growth 🚀
          </p>
        </div>

        {/* Main description */}
        <div className="max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Generate SEO-Optimized Tags & Stunning Thumbnails
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Transform your YouTube content with AI-powered SEO tags, descriptions, and custom thumbnails. 
            Boost your visibility, increase clicks, and grow your channel faster than ever.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="glass rounded-2xl p-6 text-white">
            <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-xl font-semibold mb-2">AI SEO Tags</h3>
            <p className="text-white/80">Generate optimized tags and descriptions for maximum reach</p>
          </div>
          <div className="glass rounded-2xl p-6 text-white">
            <Play className="w-12 h-12 mx-auto mb-4 text-blue-300" />
            <h3 className="text-xl font-semibold mb-2">Custom Thumbnails</h3>
            <p className="text-white/80">Create eye-catching thumbnails that drive clicks</p>
          </div>
          <div className="glass rounded-2xl p-6 text-white">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-300" />
            <h3 className="text-xl font-semibold mb-2">Boost Growth</h3>
            <p className="text-white/80">Increase views, engagement, and subscriber growth</p>
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
