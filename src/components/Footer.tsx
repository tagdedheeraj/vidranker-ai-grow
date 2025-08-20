
import { Heart, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold">
            <span className="gradient-text">VidRanker</span>
          </div>
          
          <p className="text-muted-foreground max-w-md mx-auto">
            Boost your video growth with AI-powered SEO tags and stunning thumbnails. 
            Created with ❤️ for content creators.
          </p>
          
          <div className="flex items-center justify-center gap-6 pt-4">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground pt-4 border-t">
            <p>© 2025 VidRanker. Built with Socilet 🚀</p>
            <p className="flex items-center justify-center gap-1 mt-2">
              Made with <Heart className="w-4 h-4 text-red-500" /> for creators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
