import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Waves, Square, Plus, Circle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Framework = () => {
  const frameworkData = [
    {
      id: 'self',
      title: 'SELF',
      subtitle: 'Frequencies',
      color: 'self-coral',
      icon: Waves,
      description: 'Using emotions as a compass for flow navigation through tuned frequencies, open mindset, and focused embodiment.',
      elements: [
        'Tuned Emotions - Using emotions as a compass for flow navigation',
        'Open Mind - Cognitive flexibility and growth mindset',
        'Focused Body - Deep embodiment and physical optimization'
      ],
      cardClass: 'card-self'
    },
    {
      id: 'space',
      title: 'SPACE',
      subtitle: 'Square',
      color: 'space-sage',
      icon: Square,
      description: 'Creating intentional environments with optimized tools and feedback systems that amplify productivity.',
      elements: [
        'Intentional Space - Curated environments that support flow',
        'Optimized Tools - Systems and technology that amplify productivity',
        'Feedback Systems - Loops that enable continuous improvement'
      ],
      cardClass: 'card-space'
    },
    {
      id: 'story',
      title: 'STORY',
      subtitle: 'Cross',
      color: 'story-steel',
      icon: Plus,
      description: 'Crafting generative narratives with worthy missions that drive meaningful action and empowered roles.',
      elements: [
        'Generative Story - Compelling narratives that drive action',
        'Worthy Mission - Purpose-driven goals that inspire engagement',
        'Empowered Role - Clear identity and meaningful contribution'
      ],
      cardClass: 'card-story'
    },
    {
      id: 'spirit',
      title: 'SPIRIT',
      subtitle: 'Circle',
      color: 'spirit-amethyst',
      icon: Circle,
      description: 'Grounding in values, visualizing vision, and igniting curiosity that fuel growth and flow states.',
      elements: [
        'Grounding Values - Core principles that guide decisions',
        'Visualized Vision - Clear future states that attract success',
        'Ignited Curiosity - Wonder and exploration that fuel growth'
      ],
      cardClass: 'card-spirit'
    }
  ];

  return (
    <section id="framework" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-story-steel/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-space-sage/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30">
            The FourFlow Framework
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Four Dimensions of
            <span className="text-flow block">Flow Mastery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A holistic approach to achieving flow states through four integrated dimensions.
            When aligned, these create the conditions for sustained peak performance and meaningful contribution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {frameworkData.map((dimension, index) => {
            const IconComponent = dimension.icon;
            return (
              <Card 
                key={dimension.id}
                className={`${dimension.cardClass} border-2 rounded-2xl shadow-elevation hover:shadow-flow transition-all duration-500 group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 bg-${dimension.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-2`}>
                      <img 
                        src={`/LOGOS/${dimension.title} - Section Logo.png`}
                        alt={dimension.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold text-${dimension.color}`}>
                        {dimension.title}
                      </CardTitle>
                      <p className="text-muted-foreground font-medium">{dimension.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {dimension.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {dimension.elements.map((element, elementIndex) => (
                      <div key={elementIndex} className="flex items-start gap-3">
                        <div className={`w-2 h-2 bg-${dimension.color} rounded-full mt-2 flex-shrink-0`} />
                        <p className="text-sm text-muted-foreground leading-relaxed">{element}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Integration Message */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-flow rounded-2xl p-8 max-w-4xl mx-auto shadow-flow">
            <h3 className="text-2xl font-bold text-white mb-4">
              The Power of Integration
            </h3>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              When you master flow triggers across all four dimensions, 
              you naturally align with meaningful work and create positive impact. 
              The FourFlow framework provides a systematic approach to achieving this mastery.
            </p>
            <Link to="/framework">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300"
              >
                Explore the Framework <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Framework;