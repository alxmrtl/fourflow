import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingLogoProps {
  dimension: string;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  logo: string;
  color: string;
  delay: number;
}

const FloatingLogo = ({ dimension, position, logo, color, delay }: FloatingLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMousePosition({
          x: (e.clientX - centerX) * 0.1,
          y: (e.clientY - centerY) * 0.1
        });
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  const getPositionClasses = () => {
    switch (position) {
      case 'topLeft':
        return 'top-[20%] left-[15%]';
      case 'topRight':
        return 'top-[20%] right-[15%]';
      case 'bottomLeft':
        return 'bottom-[20%] left-[15%]';
      case 'bottomRight':
        return 'bottom-[20%] right-[15%]';
      default:
        return '';
    }
  };

  return (
    <div
      ref={logoRef}
      className={cn(
        'absolute z-20 transition-all duration-1000 ease-out',
        getPositionClasses()
      )}
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        animationDelay: `${delay}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ethereal Glow */}
      <div 
        className={cn(
          'absolute inset-0 rounded-full blur-xl opacity-30 animate-pulse-glow',
          `bg-${color}`
        )}
        style={{ 
          width: '120px', 
          height: '120px', 
          left: '-10px', 
          top: '-10px',
          animationDuration: '4s',
          animationDelay: `${delay * 0.5}s`
        }}
      />
      
      {/* Particle Trail Effect */}
      <div className="absolute inset-0 animate-float" style={{ animationDelay: `${delay}s` }}>
        <div 
          className={cn(
            'absolute w-2 h-2 rounded-full opacity-60 animate-ping',
            `bg-${color}`
          )}
          style={{ 
            top: '10px', 
            left: '10px',
            animationDelay: `${delay + 0.5}s`,
            animationDuration: '3s'
          }}
        />
        <div 
          className={cn(
            'absolute w-1 h-1 rounded-full opacity-40 animate-ping',
            `bg-${color}`
          )}
          style={{ 
            bottom: '15px', 
            right: '20px',
            animationDelay: `${delay + 1}s`,
            animationDuration: '2.5s'
          }}
        />
      </div>

      {/* Main Logo Container */}
      <div
        className={cn(
          'relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer',
          `bg-gradient-to-br from-${color}/20 to-${color}/10 border-2 border-${color}/30`,
          'hover:scale-110 hover:shadow-2xl animate-float',
          isHovered && 'scale-125 shadow-2xl'
        )}
        style={{ 
          animationDelay: `${delay}s`,
          boxShadow: isHovered ? `0 0 40px hsl(var(--${color.replace('-', '-')}), 0.6)` : undefined
        }}
      >
        <img 
          src={`/LOGOS/${logo}`}
          alt={dimension}
          className={cn(
            'w-16 h-16 object-contain transition-all duration-500',
            isHovered && 'scale-110 drop-shadow-lg'
          )}
        />
        
        {/* Dimension Name on Hover */}
        {isHovered && (
          <div className={cn(
            'absolute -bottom-8 left-1/2 transform -translate-x-1/2',
            'px-3 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap',
            `bg-${color} shadow-lg animate-in fade-in zoom-in duration-200`
          )}>
            {dimension}
          </div>
        )}
      </div>
    </div>
  );
};

const HyperspaceBridge = () => {
  const [portalHovered, setPortalHovered] = useState(false);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  const dimensions = [
    { name: 'SELF', position: 'topLeft' as const, logo: 'SELF - Section Logo.png', color: 'self-coral', delay: 0 },
    { name: 'SPACE', position: 'topRight' as const, logo: 'SPACE - Section Logo.png', color: 'space-sage', delay: 0.3 },
    { name: 'STORY', position: 'bottomLeft' as const, logo: 'STORY - Section Logo.png', color: 'story-steel', delay: 0.6 },
    { name: 'SPIRIT', position: 'bottomRight' as const, logo: 'SPIRIT - Section Logo.png', color: 'spirit-amethyst', delay: 0.9 }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
      {/* Hyperspace Background */}
      <div className="absolute inset-0">
        {/* Twinkling Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.id * 0.1}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}

        {/* Nebula Clouds */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>

      {/* Section Header */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 text-center">
        <Badge variant="outline" className="mb-4 px-4 py-2 text-white border-white/30 bg-white/5 backdrop-blur-sm">
          The FourFlow Framework
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Four Dimensions of
          <span className="text-flow block">Optimal Flow</span>
        </h2>
      </div>

      {/* Floating Logos */}
      <div className="relative w-full h-full">
        {dimensions.map((dimension) => (
          <FloatingLogo
            key={dimension.name}
            dimension={dimension.name}
            position={dimension.position}
            logo={dimension.logo}
            color={dimension.color}
            delay={dimension.delay}
          />
        ))}
      </div>

      {/* Central Portal */}
      <div className="relative z-30 flex flex-col items-center">
        {/* Portal Ring */}
        <div 
          className={cn(
            'relative mb-8 transition-all duration-700',
            portalHovered && 'scale-110'
          )}
          onMouseEnter={() => setPortalHovered(true)}
          onMouseLeave={() => setPortalHovered(false)}
        >
          {/* Outer Spinning Ring */}
          <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-gradient-to-r from-spirit-amethyst via-story-steel via-space-sage to-self-coral animate-spin opacity-60"
               style={{ animationDuration: '20s' }} />
          
          {/* Middle Pulsing Ring */}
          <div className={cn(
            'absolute inset-2 w-28 h-28 rounded-full border-2 animate-pulse',
            'border-gradient-to-r from-self-coral via-space-sage via-story-steel to-spirit-amethyst',
            portalHovered && 'animate-ping'
          )}
               style={{ animationDuration: '3s' }} />
          
          {/* Inner Core */}
          <div className={cn(
            'relative w-32 h-32 rounded-full flex items-center justify-center',
            'bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-sm',
            'transition-all duration-500',
            portalHovered && 'bg-gradient-to-br from-purple-500/50 to-blue-500/50 shadow-2xl'
          )}>
            <div className={cn(
              'w-20 h-20 rounded-full bg-gradient-flow flex items-center justify-center',
              'transition-all duration-500',
              portalHovered && 'scale-110 shadow-flow'
            )}>
              <Sparkles className={cn(
                'w-8 h-8 text-white transition-all duration-500',
                portalHovered && 'scale-125 animate-spin'
              )} />
            </div>
          </div>

          {/* Energy Pulses */}
          {portalHovered && (
            <>
              <div className="absolute inset-0 w-32 h-32 rounded-full border border-white/20 animate-ping" 
                   style={{ animationDuration: '1s' }} />
              <div className="absolute inset-0 w-32 h-32 rounded-full border border-white/10 animate-ping" 
                   style={{ animationDuration: '1.5s', animationDelay: '0.5s' }} />
            </>
          )}
        </div>

        {/* Enter Button */}
        <Link to="/framework">
          <Button
            size="lg"
            className={cn(
              'relative px-8 py-4 text-lg font-semibold transition-all duration-500',
              'bg-gradient-flow hover:shadow-flow border border-white/20',
              'backdrop-blur-sm text-white',
              portalHovered && 'scale-110 shadow-2xl animate-pulse-glow'
            )}
            onMouseEnter={() => setPortalHovered(true)}
            onMouseLeave={() => setPortalHovered(false)}
          >
            <span className="relative z-10 flex items-center gap-3">
              Enter the Framework
              <ArrowRight className={cn(
                'w-5 h-5 transition-all duration-300',
                portalHovered && 'translate-x-1'
              )} />
            </span>
            
            {/* Button Glow Effect */}
            <div className={cn(
              'absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500',
              'bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-lg',
              portalHovered && 'opacity-100'
            )} />
          </Button>
        </Link>

        {/* Portal Description */}
        <p className="mt-6 text-center text-white/80 max-w-md leading-relaxed">
          Step into the four dimensions where{' '}
          <span className="text-flow font-semibold">optimal flow</span>{' '}
          emerges from the harmony of Self, Space, Story, and Spirit.
        </p>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HyperspaceBridge;