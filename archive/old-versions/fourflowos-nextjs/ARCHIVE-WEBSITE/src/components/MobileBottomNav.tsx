import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, User, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileBottomNav = () => {
  const location = useLocation();

  const navigation = [
    { 
      name: 'Home', 
      href: '/', 
      icon: Home,
      isActive: location.pathname === '/'
    },
    { 
      name: 'Framework', 
      href: '/framework', 
      icon: null,
      logo: '/LOGOS/FOURFLOW - MAIN LOGO.png',
      isActive: location.pathname.startsWith('/framework')
    },
    { 
      name: 'Blog', 
      href: '#blog', 
      icon: BookOpen,
      isActive: false
    },
    { 
      name: 'About', 
      href: '#about', 
      icon: User,
      isActive: false
    },
    { 
      name: 'Contact', 
      href: '#contact', 
      icon: Mail,
      isActive: false
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border md:hidden">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {navigation.map((item) => {
          const isFramework = item.name === 'Framework';
          
          if (item.href.startsWith('#')) {
            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200",
                  "hover:bg-muted/50 active:scale-95",
                  item.isActive && "bg-primary/10 text-primary"
                )}
              >
                {item.icon && <item.icon className="w-5 h-5 mb-1" />}
                <span className="text-xs font-medium">{item.name}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200",
                "hover:bg-muted/50 active:scale-95",
                item.isActive && "bg-primary/10 text-primary",
                isFramework && item.isActive && "bg-primary text-primary-foreground"
              )}
            >
              {item.logo ? (
                <img 
                  src={item.logo} 
                  alt={item.name}
                  className="w-5 h-5 mb-1 object-contain"
                />
              ) : (
                item.icon && <item.icon className="w-5 h-5 mb-1" />
              )}
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;