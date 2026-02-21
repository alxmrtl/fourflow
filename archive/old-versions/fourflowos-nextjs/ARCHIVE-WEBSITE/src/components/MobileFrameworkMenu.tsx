import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FlowTrigger {
  id: string;
  title: string;
  shortTitle: string;
  logo: string;
}

interface Dimension {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  logo: string;
  flowTriggers: FlowTrigger[];
}

const frameworkData: Dimension[] = [
  {
    id: 'self',
    title: 'SELF',
    subtitle: '',
    color: 'self-coral',
    logo: 'SELF - Section Logo.png',
    flowTriggers: [
      { id: 'tuned-emotions', title: 'Tuned Emotions', shortTitle: 'Tuned Emotions', logo: 'TUNED EMOTIONS.png' },
      { id: 'open-mind', title: 'Open Mind', shortTitle: 'Open Mind', logo: 'OPEN MIND.png' },
      { id: 'focused-body', title: 'Focused Body', shortTitle: 'Focused Body', logo: 'FOCUSED BODY.png' }
    ]
  },
  {
    id: 'space',
    title: 'SPACE',
    subtitle: '',
    color: 'space-sage',
    logo: 'SPACE - Section Logo.png',
    flowTriggers: [
      { id: 'intentional-space', title: 'Intentional Space', shortTitle: 'Intentional Space', logo: 'INTENTIONAL SPACE.png' },
      { id: 'optimized-tools', title: 'Optimized Tools', shortTitle: 'Optimized Tools', logo: 'OPTIMIZED TOOLS.png' },
      { id: 'feedback-systems', title: 'Feedback Systems', shortTitle: 'Feedback Systems', logo: 'FEEDBACK SYSTEMS.png' }
    ]
  },
  {
    id: 'story',
    title: 'STORY',
    subtitle: '',
    color: 'story-steel',
    logo: 'STORY - Section Logo.png',
    flowTriggers: [
      { id: 'generative-story', title: 'Generative Story', shortTitle: 'Generative Story', logo: 'GENERATIVE STORY.png' },
      { id: 'worthy-mission', title: 'Worthy Mission', shortTitle: 'Worthy Mission', logo: 'WORTHY MISSION.png' },
      { id: 'empowered-role', title: 'Empowered Role', shortTitle: 'Empowered Role', logo: 'EMPOWERED ROLE.png' }
    ]
  },
  {
    id: 'spirit',
    title: 'SPIRIT',
    subtitle: '',
    color: 'spirit-amethyst',
    logo: 'SPIRIT - Section Logo.png',
    flowTriggers: [
      { id: 'grounding-values', title: 'Grounding Values', shortTitle: 'Grounding Values', logo: 'GROUNDING VALUES.png' },
      { id: 'visualized-vision', title: 'Visualized Vision', shortTitle: 'Visualized Vision', logo: 'VISUALIZED VISION.png' },
      { id: 'ignited-curiosity', title: 'Ignited Curiosity', shortTitle: 'Ignited Curiosity', logo: 'IGNITED CURIOSITY.png' }
    ]
  }
];

interface MobileFrameworkMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileFrameworkMenu = ({ isOpen, onClose }: MobileFrameworkMenuProps) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Auto-expand the section that contains the current page
  useEffect(() => {
    if (isOpen) {
      const currentPath = location.pathname;
      const currentDimension = frameworkData.find(dimension => 
        currentPath.includes(`/framework/${dimension.id}`)
      );
      
      if (currentDimension && !expandedSections.includes(currentDimension.id)) {
        setExpandedSections([currentDimension.id]);
      }
    }
  }, [isOpen, location.pathname]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isCurrentPath = (path: string) => location.pathname === path;
  const isInSection = (sectionId: string) => location.pathname.includes(`/framework/${sectionId}`);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-background border-r border-border shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <img 
              src="/LOGOS/FOURFLOW - MAIN LOGO.png" 
              alt="FourFlow Framework" 
              className="h-6 w-auto"
            />
            <div>
              <h2 className="text-sm font-bold text-flow">Framework</h2>
              <p className="text-xs text-muted-foreground">Four Dimensions</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Overview Link */}
        <div className="p-4 border-b border-border">
          <Link 
            to="/framework"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group",
              isCurrentPath('/framework') 
                ? "bg-primary/20 text-primary font-medium" 
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="w-3 h-3 bg-primary rounded-full opacity-60" />
            <span className="text-sm font-medium">Framework Overview</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-3">
          {frameworkData.map((dimension) => {
            const isExpanded = expandedSections.includes(dimension.id);
            const isActive = isInSection(dimension.id);
            
            return (
              <div key={dimension.id} className="space-y-2">
                {/* Dimension */}
                <div className={cn(
                  "flex items-center rounded-xl transition-all duration-200 relative overflow-hidden",
                  isActive 
                    ? `bg-gradient-to-r from-${dimension.color}/20 to-${dimension.color}/5 border border-${dimension.color}/30` 
                    : "hover:bg-muted/50"
                )}>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${dimension.color} rounded-r-full`} />
                  )}
                  
                  <Link 
                    to={`/framework/${dimension.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 flex-1"
                  >
                    {/* Logo */}
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center p-2",
                      `bg-${dimension.color}`,
                      isActive && "shadow-md"
                    )}>
                      <img 
                        src={`/LOGOS/${dimension.logo}`}
                        alt={dimension.title}
                        className="w-full h-full object-contain filter brightness-0 invert"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className={cn(
                        "font-bold text-sm",
                        isActive ? `text-${dimension.color}` : "text-foreground"
                      )}>
                        {dimension.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {dimension.flowTriggers.length} flow triggers
                      </p>
                    </div>
                  </Link>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleSection(dimension.id)}
                    className={cn(
                      "p-2 m-1 rounded-lg transition-colors",
                      isExpanded 
                        ? `text-${dimension.color} bg-${dimension.color}/10` 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Flow Triggers */}
                {isExpanded && (
                  <div className="ml-6 space-y-1 animate-in slide-in-from-top duration-200">
                    {dimension.flowTriggers.map((trigger) => {
                      const triggerPath = `/framework/${dimension.id}/${trigger.id}`;
                      const isTriggerActive = isCurrentPath(triggerPath);
                      
                      return (
                        <Link
                          key={trigger.id}
                          to={triggerPath}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-3 p-2 rounded-lg transition-all duration-200",
                            isTriggerActive 
                              ? `bg-${dimension.color}/10 border border-${dimension.color}/20` 
                              : "hover:bg-muted/30"
                          )}
                        >
                          {/* Logo */}
                          <div className={cn(
                            "w-7 h-7 rounded-md flex items-center justify-center p-1.5",
                            isTriggerActive 
                              ? `bg-${dimension.color}` 
                              : `bg-${dimension.color}/20`
                          )}>
                            <img 
                              src={`/LOGOS/${trigger.logo}`}
                              alt={trigger.title}
                              className={cn(
                                "w-full h-full object-contain",
                                isTriggerActive && "filter brightness-0 invert"
                              )}
                            />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className={cn(
                              "text-sm font-medium",
                              isTriggerActive 
                                ? `text-${dimension.color}` 
                                : "text-foreground"
                            )}>
                              {trigger.shortTitle}
                            </h4>
                          </div>

                          <ArrowRight className={cn(
                            "w-3 h-3",
                            isTriggerActive ? `text-${dimension.color}` : "text-muted-foreground"
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
      </div>
    </>
  );
};

export default MobileFrameworkMenu;