import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FlowTrigger {
  id: string;
  title: string;
  description: string;
  logo: string;
}

interface Dimension {
  id: string;
  title: string;
  color: string;
  logo: string;
  description: string;
  flowTriggers: FlowTrigger[];
}

const frameworkData: Dimension[] = [
  {
    id: 'self',
    title: 'SELF',
    color: 'self-coral',
    logo: 'SELF - Section Logo.png',
    description: 'When *tuned emotions* become your compass, an *open mind* embraces infinite possibilities, and a *focused body* channels pure presence—flow becomes inevitable.',
    flowTriggers: [
      { id: 'tuned-emotions', title: 'Emotions', description: 'Using emotions as a compass for flow navigation', logo: 'TUNED EMOTIONS.png' },
      { id: 'open-mind', title: 'Mind', description: 'Cognitive flexibility and growth mindset', logo: 'OPEN MIND.png' },
      { id: 'focused-body', title: 'Body', description: 'Deep embodiment and physical optimization', logo: 'FOCUSED BODY.png' }
    ]
  },
  {
    id: 'space',
    title: 'SPACE',
    color: 'space-sage',
    logo: 'SPACE - Section Logo.png',
    description: 'Through *intentional space* design, *optimized tools* that amplify capability, and *feedback systems* that accelerate learning—your environment becomes your greatest ally.',
    flowTriggers: [
      { id: 'intentional-space', title: 'Space', description: 'Curated environments that support flow', logo: 'INTENTIONAL SPACE.png' },
      { id: 'optimized-tools', title: 'Tools', description: 'Systems and technology that amplify productivity', logo: 'OPTIMIZED TOOLS.png' },
      { id: 'feedback-systems', title: 'Systems', description: 'Loops that enable continuous improvement', logo: 'FEEDBACK SYSTEMS.png' }
    ]
  },
  {
    id: 'story',
    title: 'STORY',
    color: 'story-steel',
    logo: 'STORY - Section Logo.png',
    description: 'By weaving *generative stories* that transform obstacles into adventures, aligning with *worthy missions* that ignite purpose, and stepping into *empowered roles* that unleash authentic power—you become the hero of your own epic.',
    flowTriggers: [
      { id: 'generative-story', title: 'Story', description: 'Compelling narratives that drive action', logo: 'GENERATIVE STORY.png' },
      { id: 'worthy-mission', title: 'Mission', description: 'Purpose-driven goals that inspire engagement', logo: 'WORTHY MISSION.png' },
      { id: 'empowered-role', title: 'Role', description: 'Clear identity and meaningful contribution', logo: 'EMPOWERED ROLE.png' }
    ]
  },
  {
    id: 'spirit',
    title: 'SPIRIT',
    color: 'spirit-amethyst',
    logo: 'SPIRIT - Section Logo.png',
    description: 'Through *grounding values* that anchor your truth, *visualized visions* that magnetize your future, and *ignited curiosity* that transforms every moment into discovery—you connect with the infinite source of creative flow.',
    flowTriggers: [
      { id: 'grounding-values', title: 'Values', description: 'Core principles that guide decisions', logo: 'GROUNDING VALUES.png' },
      { id: 'visualized-vision', title: 'Vision', description: 'Clear future states that attract success', logo: 'VISUALIZED VISION.png' },
      { id: 'ignited-curiosity', title: 'Curiosity', description: 'Wonder and exploration that fuel growth', logo: 'IGNITED CURIOSITY.png' }
    ]
  }
];

const FrameworkNavigation = () => {
  const location = useLocation();

  // Helper function to add styling to flow triggers in descriptions
  const formatDescription = (description: string, dimensionColor: string) => {
    const flowTriggerPatterns = [
      { text: 'tuned emotions', class: 'flow-trigger-self' },
      { text: 'open mind', class: 'flow-trigger-self' },
      { text: 'focused body', class: 'flow-trigger-self' },
      { text: 'intentional space', class: 'flow-trigger-space' },
      { text: 'optimized tools', class: 'flow-trigger-space' },
      { text: 'feedback systems', class: 'flow-trigger-space' },
      { text: 'generative stories', class: 'flow-trigger-story' },
      { text: 'worthy missions', class: 'flow-trigger-story' },
      { text: 'empowered roles', class: 'flow-trigger-story' },
      { text: 'grounding values', class: 'flow-trigger-spirit' },
      { text: 'visualized visions', class: 'flow-trigger-spirit' },
      { text: 'ignited curiosity', class: 'flow-trigger-spirit' }
    ];

    let formattedText = description;
    
    flowTriggerPatterns.forEach(pattern => {
      const regex = new RegExp(`\\*${pattern.text}\\*`, 'gi');
      formattedText = formattedText.replace(regex, `<span class="${pattern.class}">${pattern.text}</span>`);
    });

    return formattedText;
  };

  return (
    <div className="framework-navigation">
      {/* Header */}
      <div className="mb-8 text-center">
        <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30">
          Framework Navigation
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Explore the
          <span className="text-flow block">Four Dimensions</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose your dimension and explore its flow triggers through intuitive navigation.
        </p>
      </div>

      {/* Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {frameworkData.map((dimension) => (
          <Card 
            key={dimension.id}
            className={cn(
              "border-2 rounded-2xl transition-all duration-500 shadow-elevation group",
              `hover:border-${dimension.color}/50 hover:shadow-flow`,
              `bg-gradient-to-br from-${dimension.color}/5 to-${dimension.color}/10`
            )}
          >
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <Link 
                  to={`/framework/${dimension.id}`}
                  className="group-hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-24 h-24 rounded-xl flex items-center justify-center p-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={`/LOGOS/${dimension.logo}`}
                      alt={dimension.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Link>
              </div>
              <p 
                className="text-muted-foreground leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ 
                  __html: formatDescription(dimension.description, dimension.color) 
                }}
              />
            </CardHeader>

            <CardContent className="pt-0">
              {/* Flow Triggers */}
              <div className="grid grid-cols-3 gap-3">
                {dimension.flowTriggers.map((trigger) => {
                  const triggerPath = `/framework/${dimension.id}/${trigger.id}`;
                  const isActive = location.pathname === triggerPath;
                  
                  return (
                    <Link
                      key={trigger.id}
                      to={triggerPath}
                      className={cn(
                        "group p-4 rounded-xl border transition-all duration-300",
                        "hover:shadow-md active:scale-95",
                        isActive 
                          ? `bg-${dimension.color}/20 border-${dimension.color}/50 shadow-md` 
                          : "bg-background border-border hover:border-primary/30"
                      )}
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center p-2",
                          isActive ? `bg-${dimension.color}` : `bg-${dimension.color}/20`,
                          "group-hover:scale-110 transition-transform duration-300"
                        )}>
                          <img 
                            src={`/LOGOS/${trigger.logo}`}
                            alt={trigger.title}
                            className={cn(
                              "w-full h-full object-contain",
                              isActive && "filter brightness-0 invert"
                            )}
                          />
                        </div>
                        <div>
                          <h4 className={cn(
                            "font-semibold text-sm mb-1",
                            isActive ? `text-${dimension.color}` : "text-foreground"
                          )}>
                            {trigger.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FrameworkNavigation;