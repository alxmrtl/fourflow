import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinorKey {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  logo: string;
}

interface MajorKey {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  logo: string;
  description: string;
  minorKeys: MinorKey[];
}

const frameworkData: MajorKey[] = [
  {
    id: 'self',
    title: 'SELF',
    subtitle: '',
    color: 'self-coral',
    logo: 'SELF - Section Logo.png',
    description: '',
    minorKeys: [
      { id: 'tuned-emotions', title: 'Tuned Emotions', shortTitle: 'Tuned Emotions', description: '', logo: 'TUNED EMOTIONS.png' },
      { id: 'open-mind', title: 'Open Mind', shortTitle: 'Open Mind', description: '', logo: 'OPEN MIND.png' },
      { id: 'focused-body', title: 'Focused Body', shortTitle: 'Focused Body', description: '', logo: 'FOCUSED BODY.png' }
    ]
  },
  {
    id: 'space',
    title: 'SPACE',
    subtitle: '',
    color: 'space-sage',
    logo: 'SPACE - Section Logo.png',
    description: '',
    minorKeys: [
      { id: 'intentional-space', title: 'Intentional Space', shortTitle: 'Intentional Space', description: '', logo: 'INTENTIONAL SPACE.png' },
      { id: 'optimized-tools', title: 'Optimized Tools', shortTitle: 'Optimized Tools', description: '', logo: 'OPTIMIZED TOOLS.png' },
      { id: 'feedback-systems', title: 'Feedback Systems', shortTitle: 'Feedback Systems', description: '', logo: 'FEEDBACK SYSTEMS.png' }
    ]
  },
  {
    id: 'story',
    title: 'STORY',
    subtitle: '',
    color: 'story-steel',
    logo: 'STORY - Section Logo.png',
    description: '',
    minorKeys: [
      { id: 'generative-story', title: 'Generative Story', shortTitle: 'Generative Story', description: '', logo: 'GENERATIVE STORY.png' },
      { id: 'worthy-mission', title: 'Worthy Mission', shortTitle: 'Worthy Mission', description: '', logo: 'WORTHY MISSION.png' },
      { id: 'empowered-role', title: 'Empowered Role', shortTitle: 'Empowered Role', description: '', logo: 'EMPOWERED ROLE.png' }
    ]
  },
  {
    id: 'spirit',
    title: 'SPIRIT',
    subtitle: '',
    color: 'spirit-amethyst',
    logo: 'SPIRIT - Section Logo.png',
    description: '',
    minorKeys: [
      { id: 'grounding-values', title: 'Grounding Values', shortTitle: 'Grounding Values', description: '', logo: 'GROUNDING VALUES.png' },
      { id: 'visualized-vision', title: 'Visualized Vision', shortTitle: 'Visualized Vision', description: '', logo: 'VISUALIZED VISION.png' },
      { id: 'ignited-curiosity', title: 'Ignited Curiosity', shortTitle: 'Ignited Curiosity', description: '', logo: 'IGNITED CURIOSITY.png' }
    ]
  }
];

interface FrameworkSidebarProps {
  className?: string;
}

const FrameworkSidebar = ({ className }: FrameworkSidebarProps) => {
  const location = useLocation();
  // All sections expanded by default
  const [expandedSections, setExpandedSections] = useState<string[]>(['self', 'space', 'story', 'spirit']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isCurrentPath = (path: string) => location.pathname === path;
  const isInSection = (sectionId: string) => location.pathname.includes(`/framework/${sectionId}`);

  return (
    <div className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-background/95 backdrop-blur-md border-r border-border shadow-lg overflow-y-auto z-40 sidebar-scroll",
      className
    )}>
      {/* Sidebar Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3 mb-3">
          <img 
            src="/LOGOS/FOURFLOW - MAIN LOGO.png" 
            alt="FourFlow Framework" 
            className="h-8 w-auto animate-pulse-glow"
          />
          <div>
            <h2 className="text-lg font-bold text-flow">Framework</h2>
            <p className="text-xs text-muted-foreground">Navigate the Four Dimensions</p>
          </div>
        </div>
        
        {/* Overview Link */}
        <Link 
          to="/framework"
          className={cn(
            "flex items-center gap-2 p-2 rounded-lg text-sm transition-all duration-200 group",
            isCurrentPath('/framework') 
              ? "bg-primary/20 text-primary font-medium" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="w-2 h-2 bg-primary rounded-full opacity-60" />
          Overview
          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="p-4 space-y-2">
        {frameworkData.map((major, index) => {
          const isExpanded = expandedSections.includes(major.id);
          const isActive = isInSection(major.id);
          
          return (
            <div 
              key={major.id}
              className="group"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Major Key */}
              <div className={cn(
                "flex items-center rounded-xl transition-all duration-300 relative overflow-hidden",
                isActive 
                  ? `bg-gradient-to-r from-${major.color}/20 to-${major.color}/5 border border-${major.color}/30 shadow-sm` 
                  : "hover:bg-muted/50"
              )}>
                
                {/* Active indicator */}
                {isActive && (
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${major.color} rounded-r-full animate-pulse-glow`} />
                )}
                
                <Link 
                  to={`/framework/${major.id}`}
                  className="flex items-center gap-3 p-3 flex-1 min-w-0"
                >
                  {/* Logo */}
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center p-2 transition-all duration-300",
                    `bg-${major.color}`,
                    isActive ? "scale-110 shadow-md animate-float" : "group-hover:scale-105"
                  )}>
                    <img 
                      src={`/LOGOS/${major.logo}`}
                      alt={major.title}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "font-bold text-sm transition-colors",
                      isActive ? `text-${major.color}` : "text-foreground group-hover:text-primary"
                    )}>
                      {major.title}
                    </h3>
                  </div>
                </Link>

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => toggleSection(major.id)}
                  className={cn(
                    "p-2 m-2 rounded-lg transition-all duration-200 flex-shrink-0",
                    isExpanded 
                      ? `text-${major.color} bg-${major.color}/10` 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 transform transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-4 h-4 transform transition-transform duration-200" />
                  )}
                </button>
              </div>

              {/* Minor Keys - Expandable */}
              {isExpanded && (
                <div className="mt-2 ml-4 space-y-1 animate-in slide-in-from-left-2 duration-300">
                  {major.minorKeys.map((minor, minorIndex) => {
                    const minorPath = `/framework/${major.id}/${minor.id}`;
                    const isMinorActive = isCurrentPath(minorPath);
                    
                    return (
                      <Link
                        key={minor.id}
                        to={minorPath}
                        className={cn(
                          "group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 relative",
                          isMinorActive 
                            ? `bg-${major.color}/10 border border-${major.color}/20 shadow-sm` 
                            : "hover:bg-muted/30"
                        )}
                        style={{ 
                          animationDelay: `${minorIndex * 0.05}s`,
                          animation: 'fadeInLeft 0.4s ease-out forwards'
                        }}
                      >
                        {/* Active indicator for minor keys */}
                        {isMinorActive && (
                          <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-${major.color} rounded-r-full`} />
                        )}
                        
                        {/* Connection line */}
                        <div className="relative">
                          <div className="w-0.5 h-6 bg-border absolute -left-3 top-3" />
                          <div className="w-3 h-0.5 bg-border absolute -left-3 top-6" />
                        </div>
                        
                        {/* Logo */}
                        <div className={cn(
                          "w-8 h-8 rounded-md flex items-center justify-center p-1.5 transition-all duration-200",
                          isMinorActive 
                            ? `bg-${major.color} scale-110 shadow-md animate-float` 
                            : `bg-${major.color}/20 group-hover:bg-${major.color}/30 group-hover:scale-105`
                        )}>
                          <img 
                            src={`/LOGOS/${minor.logo}`}
                            alt={minor.title}
                            className={cn(
                              "w-full h-full object-contain transition-all duration-200",
                              isMinorActive ? "filter brightness-0 invert" : ""
                            )}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className={cn(
                            "text-sm font-medium transition-colors",
                            isMinorActive 
                              ? `text-${major.color}` 
                              : "text-foreground group-hover:text-primary"
                          )}>
                            {minor.shortTitle}
                          </h4>
                        </div>

                        {/* Arrow indicator */}
                        <ArrowRight className={cn(
                          "w-3 h-3 transition-all duration-200",
                          isMinorActive 
                            ? `text-${major.color} opacity-100` 
                            : "text-muted-foreground opacity-0 group-hover:opacity-100"
                        )} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default FrameworkSidebar;