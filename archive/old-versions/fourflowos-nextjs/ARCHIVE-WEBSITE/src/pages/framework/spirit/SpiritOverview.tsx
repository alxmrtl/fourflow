import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Circle, ArrowRight, ArrowLeft, Anchor, Eye, Sparkles } from 'lucide-react';
import SidebarLayout from '@/components/SidebarLayout';

const SpiritOverview = () => {
  const minorKeys = [
    {
      id: 'grounding-values',
      title: 'Grounding Values',
      icon: Anchor,
      description: 'Core principles that guide decisions',
      longDescription: 'Establish unwavering principles that provide stability and direction through all circumstances. When values are clear and embodied, decision-making becomes natural and aligned.',
      practices: ['Values clarification', 'Principle-based decision making', 'Integrity cultivation'],
      color: 'spirit-amethyst'
    },
    {
      id: 'visualized-vision',
      title: 'Visualized Vision',
      icon: Eye,
      description: 'Clear future states that attract success',
      longDescription: 'Create compelling mental models of desired futures that pull you forward through present challenges. Vivid visualization literally reshapes neural pathways to support goal achievement.',
      practices: ['Vision crafting', 'Mental rehearsal', 'Future state alignment'],
      color: 'spirit-amethyst'
    },
    {
      id: 'ignited-curiosity',
      title: 'Ignited Curiosity',
      icon: Sparkles,
      description: 'Wonder and exploration that fuel growth',
      longDescription: 'Cultivate insatiable wonder about the world and your place in it. Curiosity transforms challenges into fascinating puzzles and fuels the continuous learning that sustains flow.',
      practices: ['Question generation', 'Exploration habits', 'Learning integration'],
      color: 'spirit-amethyst'
    }
  ];

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-elevation">
        {/* Navigation */}
        <div className="container mx-auto px-6 pt-8">
          <Link to="/framework" className="inline-flex items-center gap-2 text-muted-foreground hover:text-spirit-amethyst transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Framework
          </Link>
        </div>

      {/* Header */}
      <div className="container mx-auto px-6 pt-12 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 bg-spirit-amethyst rounded-xl flex items-center justify-center animate-float">
              <Circle className="w-10 h-10 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2 px-3 py-1 text-spirit-amethyst border-spirit-amethyst/30">
                Major Key
              </Badge>
              <h1 className="text-6xl font-bold text-spirit-amethyst">SPIRIT</h1>
            </div>
          </div>
          
          <p className="text-2xl text-muted-foreground leading-relaxed mb-8">
            The deeper dimensions of meaning that transcend immediate circumstances—values that 
            ground you, visions that guide you, and curiosity that expands you.
          </p>
          
          <div className="bg-gradient-to-r from-spirit-amethyst/10 to-spirit-amethyst/5 rounded-2xl p-8 border border-spirit-amethyst/20">
            <h2 className="text-xl font-bold text-foreground mb-4">The SPIRIT Dimension</h2>
            <p className="text-muted-foreground leading-relaxed">
              Spirit encompasses the transcendent aspects of human experience that connect us to 
              something larger than immediate concerns. This dimension focuses on the timeless 
              principles that guide decisions, the compelling futures that motivate action, and 
              the wonder that transforms challenges into opportunities for growth and discovery.
            </p>
          </div>
        </div>
      </div>

      {/* Minor Keys */}
      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Three Elements of SPIRIT</h2>
          
          <div className="space-y-8">
            {minorKeys.map((minorKey, index) => {
              const IconComponent = minorKey.icon;
              return (
                <Card 
                  key={minorKey.id}
                  className="card-spirit border-2 rounded-2xl shadow-elevation hover:shadow-flow transition-all duration-500"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-spirit-amethyst rounded-xl flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-spirit-amethyst mb-1">
                            {minorKey.title}
                          </CardTitle>
                          <p className="text-muted-foreground font-medium">
                            {minorKey.description}
                          </p>
                        </div>
                      </div>
                      <Link to={`/framework/spirit/${minorKey.id}`}>
                        <Button 
                          variant="outline" 
                          className="border-spirit-amethyst/30 text-spirit-amethyst hover:bg-spirit-amethyst hover:text-white transition-all duration-300"
                        >
                          Explore <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {minorKey.longDescription}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Key Practices:</h4>
                        <ul className="space-y-2">
                          {minorKey.practices.map((practice, practiceIndex) => (
                            <li key={practiceIndex} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-spirit-amethyst rounded-full flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{practice}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Integration Section */}
          <div className="mt-16 bg-gradient-harmony rounded-2xl p-8 text-center shadow-flow">
            <h3 className="text-2xl font-bold text-white mb-4">
              Transcendent Foundation
            </h3>
            <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
              When grounded in timeless values, guided by compelling visions, and fueled by 
              insatiable curiosity, you tap into sustainable sources of motivation and meaning 
              that transcend temporary circumstances and setbacks.
            </p>
          </div>
        </div>
      </div>
    </div>
    </SidebarLayout>
  );
};

export default SpiritOverview;