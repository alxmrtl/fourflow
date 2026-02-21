import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Framework', href: '/framework' },
    { name: 'Blog', href: '#blog' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border hidden md:block">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/LOGOS/FOURFLOW - MAIN LOGO.png" 
              alt="FourFlow" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                               (item.href.startsWith('#') && location.hash === item.href);
              const isFramework = item.name === 'Framework';
              
              if (item.href.startsWith('#')) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={isFramework 
                    ? "btn-flow px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                    : "text-foreground hover:text-primary transition-colors duration-200"
                  }
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button - Hidden since we use bottom navigation */}
          {false && (
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navigation.map((item) => {
                const isFramework = item.name === 'Framework';
                
                if (item.href.startsWith('#')) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-foreground hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={isFramework 
                      ? "btn-flow w-fit px-6 py-2 rounded-lg bg-primary text-primary-foreground"
                      : "text-foreground hover:text-primary transition-colors duration-200"
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;