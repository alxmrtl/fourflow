import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinorKey {
  id: string;
  title: string;
  shortTitle: string;
  logo: string;
}

interface MajorKey {
  id: string;
  title: string;
  color: string;
  logo: string;
  minorKeys: MinorKey[];
}

const frameworkData: MajorKey[] = [
  {
    id: 'self',
    title: 'SELF',
    color: 'self-coral',
    logo: 'MAIN LOGO - ELEMENTS/SELF - Frequencies.png',
    minorKeys: [
      { id: 'tuned-emotions', title: 'Tuned Emotions', shortTitle: 'Emotions', logo: 'TUNED EMOTIONS.png' },
      { id: 'open-mind', title: 'Open Mind', shortTitle: 'Mind', logo: 'OPEN MIND.png' },
      { id: 'focused-body', title: 'Focused Body', shortTitle: 'Body', logo: 'FOCUSED BODY.png' }
    ]
  },
  {
    id: 'space',
    title: 'SPACE',
    color: 'space-sage',
    logo: 'MAIN LOGO - ELEMENTS/SPACE - Sqaure.png',
    minorKeys: [
      { id: 'intentional-space', title: 'Intentional Space', shortTitle: 'Space', logo: 'INTENTIONAL SPACE.png' },
      { id: 'optimized-tools', title: 'Optimized Tools', shortTitle: 'Tools', logo: 'OPTIMIZED TOOLS.png' },
      { id: 'feedback-systems', title: 'Feedback Systems', shortTitle: 'Systems', logo: 'FEEDBACK SYSTEMS.png' }
    ]
  },
  {
    id: 'story',
    title: 'STORY',
    color: 'story-steel',
    logo: 'MAIN LOGO - ELEMENTS/STORY - Cross.png',
    minorKeys: [
      { id: 'generative-story', title: 'Generative Story', shortTitle: 'Story', logo: 'GENERATIVE STORY.png' },
      { id: 'worthy-mission', title: 'Worthy Mission', shortTitle: 'Mission', logo: 'WORTHY MISSION.png' },
      { id: 'empowered-role', title: 'Empowered Role', shortTitle: 'Role', logo: 'EMPOWERED ROLE.png' }
    ]
  },
  {
    id: 'spirit',
    title: 'SPIRIT',
    color: 'spirit-amethyst',
    logo: 'MAIN LOGO - ELEMENTS/SPIRIT - Circle.png',
    minorKeys: [
      { id: 'grounding-values', title: 'Grounding Values', shortTitle: 'Values', logo: 'GROUNDING VALUES.png' },
      { id: 'visualized-vision', title: 'Visualized Vision', shortTitle: 'Vision', logo: 'VISUALIZED VISION.png' },
      { id: 'ignited-curiosity', title: 'Ignited Curiosity', shortTitle: 'Curiosity', logo: 'IGNITED CURIOSITY.png' }
    ]
  }
];

const FrameworkMobileBottomNav = () => {
  const location = useLocation();
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

  // Determine current major key from URL
  const currentMajor = frameworkData.find(major => 
    location.pathname.includes(`/framework/${major.id}`)
  );

  // Determine current minor key from URL
  const currentMinor = currentMajor?.minorKeys.find(minor =>
    location.pathname.includes(`/${minor.id}`)
  );

  // Auto-show minor keys when in a major key section
  React.useEffect(() => {
    if (currentMajor && !currentMinor) {
      // If we're on a major key overview page, auto-show its minor keys
      setSelectedMajor(currentMajor.id);
    } else {
      // Close secondary nav when navigating to different pages
      setSelectedMajor(null);
    }
  }, [location.pathname, currentMajor, currentMinor]);

  const handleMajorClick = (majorId: string, event: React.MouseEvent) => {
    // If clicking on the current major key, toggle the secondary nav
    if (currentMajor?.id === majorId) {
      event.preventDefault();
      if (selectedMajor === majorId) {
        setSelectedMajor(null);
      } else {
        setSelectedMajor(majorId);
      }
    } else {
      // Allow navigation to continue, but close any open secondary nav
      setSelectedMajor(null);
    }
  };

  return (
    <>
      {/* Secondary Navigation for Minor Keys */}
      {selectedMajor && (
        <div className="fixed bottom-20 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border md:hidden">
          <div className="flex items-center justify-around px-2 py-2">
            {frameworkData.find(major => major.id === selectedMajor)?.minorKeys.map((minor) => {
              const minorPath = `/framework/${selectedMajor}/${minor.id}`;
              const isActive = location.pathname === minorPath;
              const majorColor = frameworkData.find(major => major.id === selectedMajor)?.color || 'primary';
              
              return (
                <Link
                  key={minor.id}
                  to={minorPath}
                  onClick={() => setSelectedMajor(null)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200",
                    "hover:bg-muted/50 active:scale-95",
                    isActive && `bg-${majorColor}/20 text-${majorColor}`
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center p-1.5 mb-1",
                    isActive ? `bg-${majorColor}` : `bg-${majorColor}/20`
                  )}>
                    <img 
                      src={`/LOGOS/${minor.logo}`} 
                      alt={minor.title}
                      className={cn(
                        "w-full h-full object-contain",
                        isActive && "filter brightness-0 invert"
                      )}
                    />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">
                    {minor.shortTitle}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Primary Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border md:hidden">
        <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
          {/* Home Button */}
          <Link
            to="/"
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200",
              "hover:bg-muted/50 active:scale-95",
              location.pathname === '/' && "bg-primary/10 text-primary"
            )}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </Link>

          {/* Major Key Buttons */}
          {frameworkData.map((major) => {
            const isActive = location.pathname.includes(`/framework/${major.id}`);
            const isSelected = selectedMajor === major.id;
            
            return (
              <div key={major.id} className="relative">
                <Link
                  to={`/framework/${major.id}`}
                  onClick={(e) => handleMajorClick(major.id, e)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200",
                    "hover:bg-muted/50 active:scale-95",
                    isActive && `bg-${major.color}/20 text-${major.color}`,
                    isSelected && `ring-2 ring-${major.color}/50`
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center p-2 mb-1",
                    `bg-${major.color}`,
                    isActive && "shadow-md"
                  )}>
                    <img 
                      src={`/LOGOS/${major.logo}`} 
                      alt={major.title}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  <span className="text-xs font-medium">{major.title}</span>
                </Link>

                {/* Active indicator */}
                {currentMajor?.id === major.id && currentMinor && (
                  <div className={cn(
                    "absolute -top-1 -right-1 w-3 h-3 rounded-full",
                    `bg-${major.color}`,
                    "animate-pulse"
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </nav>

    </>
  );
};

export default FrameworkMobileBottomNav;