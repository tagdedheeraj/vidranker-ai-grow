
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "SEO Tools", href: "/seo", icon: "🚀" },
    { name: "Thumbnails", href: "/thumbnails", icon: "🖼️" },
    { name: "History", href: "/history", icon: "📚" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/c6b11630-2cf2-4348-836e-9ec57f17fd86.png" 
            alt="VidRanker Logo" 
            className="w-10 h-10 rounded-lg"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:text-primary hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Settings & Mobile Menu */}
        <div className="flex items-center gap-2">
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:text-primary hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
