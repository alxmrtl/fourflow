import { ReactNode, useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Header from './Header';
import FrameworkSidebar from './FrameworkSidebar';
import FrameworkMobileBottomNav from './FrameworkMobileBottomNav';
import { cn } from '@/lib/utils';

interface SidebarLayoutProps {
  children: ReactNode;
  className?: string;
}

const SidebarLayout = ({ children, className }: SidebarLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <FrameworkSidebar />
        </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          
          {/* Mobile Sidebar */}
          <div className="lg:hidden">
            <FrameworkSidebar className="animate-in slide-in-from-left duration-300" />
          </div>
        </>
      )}

      {/* Mobile Menu Toggle - Hidden since we're using bottom navigation */}
      {false && (
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className={cn(
            "fixed top-20 left-4 z-50 lg:hidden",
            "bg-primary text-primary-foreground rounded-full p-3 shadow-lg",
            "hover:scale-110 active:scale-95 transition-transform duration-200",
            "animate-pulse-glow"
          )}
          aria-label="Open framework navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        "lg:ml-80", // Desktop: add left margin for sidebar
        className
      )}>
        <main className="min-h-screen pt-0 pb-20 md:pt-16 md:pb-0"> {/* Top margin for fixed header on desktop only, bottom margin for mobile nav */}
          {children}
        </main>
      </div>
      </div>
      
      {/* Framework Mobile Bottom Navigation */}
      <FrameworkMobileBottomNav />
    </div>
  );
};

export default SidebarLayout;