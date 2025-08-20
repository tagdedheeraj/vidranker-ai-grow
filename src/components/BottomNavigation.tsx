
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Image, History, Settings2 } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "SEO", href: "/seo", icon: Search },
    { name: "Thumbnails", href: "/thumbnails", icon: Image },
    { name: "History", href: "/history", icon: History },
    { name: "Settings", href: "/settings", icon: Settings2 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 md:hidden">
      <nav className="flex items-center justify-around py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors min-w-0 ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "fill-primary/20" : ""}`} />
              <span className="text-xs font-medium truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNavigation;
