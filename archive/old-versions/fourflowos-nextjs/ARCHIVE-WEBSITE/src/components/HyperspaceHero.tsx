import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingLogoProps {
  dimension: string;
  logo: string;
  color: string;
  initialX: number;
  initialY: number;
  velocity: { x: number; y: number };
  onCollision: (x: number, y: number, color: string) => void;
}

interface CollisionEffect {
  id: string;
  x: number;
  y: number;
  color: string;
  timestamp: number;
}

const FloatingLogo = ({ 
  dimension, 
  logo, 
  color, 
  initialX, 
  initialY, 
  velocity,
  onCollision 
}: FloatingLogoProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [currentVelocity, setCurrentVelocity] = useState(velocity);
  const logoRef = useRef<HTMLDivElement>(null);
  const lastCollisionTime = useRef(0);

  useEffect(() => {
    const animationFrame = () => {
      setPosition(prevPos => {
        const container = document.querySelector('.hyperspace-container');
        if (!container) return prevPos;

        const containerRect = container.getBoundingClientRect();
        const logoSize = 120; // Logo size in pixels
        
        let newX = prevPos.x + currentVelocity.x;
        let newY = prevPos.y + currentVelocity.y;
        let newVelX = currentVelocity.x;
        let newVelY = currentVelocity.y;

        // Bounce off walls with collision effect
        const now = Date.now();
        if (now - lastCollisionTime.current > 500) { // Throttle collision effects
          if (newX <= 0 || newX >= containerRect.width - logoSize) {
            newVelX = -newVelX;
            newX = Math.max(0, Math.min(containerRect.width - logoSize, newX));
            onCollision(newX + logoSize/2, newY + logoSize/2, color);
            lastCollisionTime.current = now;
          }
          
          if (newY <= 0 || newY >= containerRect.height - logoSize) {
            newVelY = -newVelY;
            newY = Math.max(0, Math.min(containerRect.height - logoSize, newY));
            onCollision(newX + logoSize/2, newY + logoSize/2, color);
            lastCollisionTime.current = now;
          }
        } else {
          // Still bounce but without collision effect
          if (newX <= 0 || newX >= containerRect.width - logoSize) {
            newVelX = -newVelX;
            newX = Math.max(0, Math.min(containerRect.width - logoSize, newX));
          }
          
          if (newY <= 0 || newY >= containerRect.height - logoSize) {
            newVelY = -newVelY;
            newY = Math.max(0, Math.min(containerRect.height - logoSize, newY));
          }
        }

        setCurrentVelocity({ x: newVelX, y: newVelY });
        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(animationFrame, 16); // ~60fps
    return () => clearInterval(interval);
  }, [currentVelocity, color, onCollision]);

  return (
    <div
      ref={logoRef}
      className="absolute z-20 transition-all duration-300 ease-out"
      style={{
        left: position.x,
        top: position.y,
        width: '120px',
        height: '120px'
      }}
    >
      {/* Ethereal Glow */}
      <div 
        className={cn(
          'absolute inset-0 rounded-full blur-xl opacity-40 animate-pulse-glow',
          `bg-${color}`
        )}
        style={{ 
          width: '140px', 
          height: '140px', 
          left: '-10px', 
          top: '-10px',
          animationDuration: '3s'
        }}
      />
      
      {/* Logo */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src={logo}
          alt={dimension}
          className="w-24 h-24 object-contain drop-shadow-2xl animate-float"
        />
      </div>

      {/* Particle Trail */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className={cn(
              'absolute w-1 h-1 rounded-full opacity-60 animate-ping',
              `bg-${color}`
            )}
            style={{ 
              top: `${20 + i * 15}%`, 
              left: `${30 + i * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const CollisionEffect = ({ effect }: { effect: CollisionEffect }) => {
  return (
    <div
      className="absolute pointer-events-none z-30"
      style={{
        left: effect.x - 25,
        top: effect.y - 25,
        width: '50px',
        height: '50px'
      }}
    >
      <div 
        className={cn(
          'w-full h-full rounded-full animate-ping opacity-80',
          `bg-${effect.color}`
        )}
        style={{
          animationDuration: '0.8s'
        }}
      />
      <div 
        className={cn(
          'absolute inset-0 w-full h-full rounded-full animate-pulse',
          `bg-${effect.color}`
        )}
        style={{
          animationDuration: '0.6s'
        }}
      />
    </div>
  );
};

const HyperspaceHero = () => {
  const [collisionEffects, setCollisionEffects] = useState<CollisionEffect[]>([]);

  const handleCollision = (x: number, y: number, color: string) => {
    const newEffect: CollisionEffect = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      color,
      timestamp: Date.now()
    };
    
    setCollisionEffects(prev => [...prev, newEffect]);
    
    // Remove effect after animation
    setTimeout(() => {
      setCollisionEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1000);
  };

  const floatingLogos = [
    {
      dimension: 'SELF',
      logo: '/LOGOS/SELF - Section Logo.png',
      color: 'self-coral',
      initialX: 100,
      initialY: 150,
      velocity: { x: 1.5, y: 1.2 }
    },
    {
      dimension: 'SPACE',
      logo: '/LOGOS/SPACE - Section Logo.png',
      color: 'space-sage',
      initialX: 800,
      initialY: 200,
      velocity: { x: -1.3, y: 1.8 }
    },
    {
      dimension: 'STORY',
      logo: '/LOGOS/STORY - Section Logo.png',
      color: 'story-steel',
      initialX: 200,
      initialY: 450,
      velocity: { x: 2.1, y: -1.1 }
    },
    {
      dimension: 'SPIRIT',
      logo: '/LOGOS/SPIRIT - Section Logo.png',
      color: 'spirit-amethyst',
      initialX: 700,
      initialY: 400,
      velocity: { x: -1.7, y: -1.5 }
    }
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Star Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/20 to-black" />
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      {/* Hyperspace Container */}
      <div className="hyperspace-container absolute inset-0">
        {/* Floating Logos */}
        {floatingLogos.map((logoConfig, index) => (
          <FloatingLogo
            key={logoConfig.dimension}
            {...logoConfig}
            onCollision={handleCollision}
          />
        ))}

        {/* Collision Effects */}
        {collisionEffects.map(effect => (
          <CollisionEffect key={effect.id} effect={effect} />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-40 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Hero Copy - Vertical Stack */}
            <div className="flex flex-col items-center space-y-8 mb-16">
              {/* ENTER THE FLOW DIMENSION - Top */}
              <Badge variant="outline" className="px-8 py-3 text-white border-white/30 bg-white/10 backdrop-blur-sm rounded-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Enter the Flow Dimension
              </Badge>
              
              {/* FIND YOUR FLOW - Glass Effect Title Container - Below */}
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/30 rounded-3xl p-12 w-full max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-self-coral via-space-sage via-story-steel to-spirit-amethyst bg-clip-text text-transparent animate-gradient">
                    Find Your Flow
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Master the Four Keys to Harmonize with the Universe
                </p>
              </div>
            </div>

            {/* Explore FourFlow Button */}
            <div className="relative flex justify-center mb-16">
              {/* Portal Rings - Centered and proportional */}
              <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                <div className="w-40 h-40 border-2 border-white/20 rounded-full" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}>
                <div className="w-32 h-32 border border-white/30 rounded-full" />
              </div>
              
              {/* Main Button */}
              <Link to="/framework">
                <Button 
                  size="lg" 
                  className="relative z-10 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-white text-xl px-12 py-6 rounded-2xl group"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src="/LOGOS/FOURFLOW - MAIN LOGO.png" 
                      alt="FourFlow" 
                      className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span>EXPLORE FOURFLOW</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>
              </Link>
            </div>

            {/* Subtext */}
            <p className="text-sm text-white/40 mt-8">
              SELF • SPACE • STORY • SPIRIT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HyperspaceHero;