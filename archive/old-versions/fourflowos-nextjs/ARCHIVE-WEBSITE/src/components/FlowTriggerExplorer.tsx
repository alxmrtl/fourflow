import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';

interface FlowTrigger {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  logo: string;
  color: string;
  dimension: {
    id: string;
    title: string;
    color: string;
  };
}

const allFlowTriggers: FlowTrigger[] = [
  // SELF
  {
    id: 'focused-body',
    title: 'Focused Body',
    shortTitle: 'Body',
    description: 'Deep embodiment and physical optimization for flow states',
    logo: 'FOCUSED BODY.png',
    color: 'self-coral',
    dimension: { id: 'self', title: 'SELF', color: 'self-coral' }
  },
  {
    id: 'open-mind',
    title: 'Open Mind',
    shortTitle: 'Mind',
    description: 'Cognitive flexibility and growth mindset cultivation',
    logo: 'OPEN MIND.png',
    color: 'self-coral',
    dimension: { id: 'self', title: 'SELF', color: 'self-coral' }
  },
  {
    id: 'tuned-emotions',
    title: 'Tuned Emotions',
    shortTitle: 'Emotions',
    description: 'Using emotions as compass for flow navigation',
    logo: 'TUNED EMOTIONS.png',
    color: 'self-coral',
    dimension: { id: 'self', title: 'SELF', color: 'self-coral' }
  },
  // SPACE
  {
    id: 'intentional-space',
    title: 'Intentional Space',
    shortTitle: 'Space',
    description: 'Curated environments that support flow states',
    logo: 'INTENTIONAL SPACE.png',
    color: 'space-sage',
    dimension: { id: 'space', title: 'SPACE', color: 'space-sage' }
  },
  {
    id: 'optimized-tools',
    title: 'Optimized Tools',
    shortTitle: 'Tools',
    description: 'Systems and technology that amplify productivity',
    logo: 'OPTIMIZED TOOLS.png',
    color: 'space-sage',
    dimension: { id: 'space', title: 'SPACE', color: 'space-sage' }
  },
  {
    id: 'feedback-systems',
    title: 'Feedback Systems',
    shortTitle: 'Systems',
    description: 'Loops that enable continuous improvement',
    logo: 'FEEDBACK SYSTEMS.png',
    color: 'space-sage',
    dimension: { id: 'space', title: 'SPACE', color: 'space-sage' }
  },
  // STORY
  {
    id: 'generative-story',
    title: 'Generative Story',
    shortTitle: 'Story',
    description: 'Compelling narratives that drive meaningful action',
    logo: 'GENERATIVE STORY.png',
    color: 'story-steel',
    dimension: { id: 'story', title: 'STORY', color: 'story-steel' }
  },
  {
    id: 'worthy-mission',
    title: 'Worthy Mission',
    shortTitle: 'Mission',
    description: 'Purpose-driven goals that inspire engagement',
    logo: 'WORTHY MISSION.png',
    color: 'story-steel',
    dimension: { id: 'story', title: 'STORY', color: 'story-steel' }
  },
  {
    id: 'empowered-role',
    title: 'Empowered Role',
    shortTitle: 'Role',
    description: 'Clear identity and meaningful contribution',
    logo: 'EMPOWERED ROLE.png',
    color: 'story-steel',
    dimension: { id: 'story', title: 'STORY', color: 'story-steel' }
  },
  // SPIRIT
  {
    id: 'grounding-values',
    title: 'Grounding Values',
    shortTitle: 'Values',
    description: 'Core principles that guide decisions and actions',
    logo: 'GROUNDING VALUES.png',
    color: 'spirit-amethyst',
    dimension: { id: 'spirit', title: 'SPIRIT', color: 'spirit-amethyst' }
  },
  {
    id: 'visualized-vision',
    title: 'Visualized Vision',
    shortTitle: 'Vision',
    description: 'Clear future states that attract success',
    logo: 'VISUALIZED VISION.png',
    color: 'spirit-amethyst',
    dimension: { id: 'spirit', title: 'SPIRIT', color: 'spirit-amethyst' }
  },
  {
    id: 'ignited-curiosity',
    title: 'Ignited Curiosity',
    shortTitle: 'Curiosity',
    description: 'Wonder and exploration that fuel growth',
    logo: 'IGNITED CURIOSITY.png',
    color: 'spirit-amethyst',
    dimension: { id: 'spirit', title: 'SPIRIT', color: 'spirit-amethyst' }
  }
];

interface FlowTriggerExplorerProps {
  startingTrigger?: string;
  className?: string;
}

const FlowTriggerExplorer = ({ startingTrigger, className }: FlowTriggerExplorerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Set initial trigger if provided
  useEffect(() => {
    if (startingTrigger) {
      const index = allFlowTriggers.findIndex(trigger => trigger.id === startingTrigger);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [startingTrigger]);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % allFlowTriggers.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + allFlowTriggers.length) % allFlowTriggers.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const currentTrigger = allFlowTriggers[currentIndex];
  const getRelatedTriggers = (trigger: FlowTrigger) => {
    return allFlowTriggers
      .filter(t => t.dimension.id === trigger.dimension.id && t.id !== trigger.id)
      .slice(0, 2);
  };

  return (
    <div className={cn("flow-trigger-explorer", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-flow" />
          <h2 className="text-2xl font-bold text-flow">Flow Trigger Explorer</h2>
        </div>
        <p className="text-muted-foreground">
          Swipe to explore all 12 flow triggers across the four dimensions
        </p>
      </div>

      {/* Main Card Carousel */}
      <div 
        ref={carouselRef}
        className="relative mb-8 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${allFlowTriggers.length * 100}%`
          }}
        >
          {allFlowTriggers.map((trigger, index) => (
            <Card
              key={trigger.id}
              className={cn(
                "flex-shrink-0 border-2 transition-all duration-300",
                `w-full border-${trigger.color}/30 bg-gradient-to-br from-${trigger.color}/5 to-${trigger.color}/10`,
                index === currentIndex && `shadow-flow border-${trigger.color}/50`
              )}
              style={{ width: `${100 / allFlowTriggers.length}%` }}
            >
              <CardContent className="p-8">
                {/* Dimension Badge */}
                <div className="flex justify-between items-start mb-6">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs font-medium",
                      `text-${trigger.color} border-${trigger.color}/30`
                    )}
                  >
                    {trigger.dimension.title}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {currentIndex + 1} / {allFlowTriggers.length}
                  </div>
                </div>

                {/* Logo & Title */}
                <div className="text-center mb-6">
                  <div 
                    className={cn(
                      "w-24 h-24 rounded-xl flex items-center justify-center mx-auto mb-4 p-4 animate-float",
                      `bg-${trigger.color}`
                    )}
                  >
                    <img 
                      src={`/LOGOS/${trigger.logo}`}
                      alt={trigger.title}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  <h3 className={cn("text-2xl font-bold mb-2", `text-${trigger.color}`)}>
                    {trigger.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {trigger.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Link to={`/framework/${trigger.dimension.id}/${trigger.id}?tab=learn`}>
                    <Button 
                      variant="outline" 
                      className={cn(
                        "w-full gap-2",
                        `border-${trigger.color}/30 hover:bg-${trigger.color}/10`
                      )}
                    >
                      <BookOpen className="w-4 h-4" />
                      Learn
                    </Button>
                  </Link>
                  <Link to={`/framework/${trigger.dimension.id}/${trigger.id}?tab=apply`}>
                    <Button 
                      className={cn(
                        "w-full gap-2",
                        `bg-${trigger.color} hover:bg-${trigger.color}/80`
                      )}
                    >
                      <Lightbulb className="w-4 h-4" />
                      Apply
                    </Button>
                  </Link>
                </div>

                {/* Related Triggers */}
                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground mb-3">
                    Related in {trigger.dimension.title}:
                  </p>
                  <div className="flex gap-2">
                    {getRelatedTriggers(trigger).map((related) => {
                      const relatedIndex = allFlowTriggers.findIndex(t => t.id === related.id);
                      return (
                        <button
                          key={related.id}
                          onClick={() => goToIndex(relatedIndex)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors",
                            `bg-${related.color}/10 hover:bg-${related.color}/20 text-${related.color}`
                          )}
                        >
                          <div className={cn("w-4 h-4 rounded flex items-center justify-center p-0.5", `bg-${related.color}`)}>
                            <img 
                              src={`/LOGOS/${related.logo}`}
                              alt={related.shortTitle}
                              className="w-full h-full object-contain filter brightness-0 invert"
                            />
                          </div>
                          {related.shortTitle}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full border border-border shadow-lg flex items-center justify-center hover:bg-background transition-colors"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full border border-border shadow-lg flex items-center justify-center hover:bg-background transition-colors"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center gap-2 mb-6">
        {allFlowTriggers.map((trigger, index) => (
          <button
            key={trigger.id}
            onClick={() => goToIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex 
                ? `bg-${trigger.color} w-6` 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            disabled={isTransitioning}
          />
        ))}
      </div>

      {/* Quick Dimension Filter */}
      <div className="flex justify-center gap-2 flex-wrap">
        {['self', 'space', 'story', 'spirit'].map((dimensionId) => {
          const dimension = allFlowTriggers.find(t => t.dimension.id === dimensionId)?.dimension;
          const isActive = currentTrigger.dimension.id === dimensionId;
          
          return (
            <button
              key={dimensionId}
              onClick={() => {
                const firstTriggerOfDimension = allFlowTriggers.findIndex(t => t.dimension.id === dimensionId);
                if (firstTriggerOfDimension !== -1) goToIndex(firstTriggerOfDimension);
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                isActive
                  ? `bg-${dimension?.color} text-white shadow-md`
                  : `bg-${dimension?.color}/10 text-${dimension?.color} hover:bg-${dimension?.color}/20`
              )}
              disabled={isTransitioning}
            >
              {dimension?.title}
            </button>
          );
        })}
      </div>

      {/* Swipe Hint */}
      <div className="text-center mt-6">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
          <ArrowRight className="w-3 h-3 animate-pulse" />
          Swipe left/right or use arrows to explore
          <ArrowRight className="w-3 h-3 animate-pulse rotate-180" />
        </p>
      </div>
    </div>
  );
};

export default FlowTriggerExplorer;