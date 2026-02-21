import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight, ArrowLeft, BookOpen, Target, UserCheck } from 'lucide-react';
import SidebarLayout from '@/components/SidebarLayout';

const StoryOverview = () => {
  const minorKeys = [
    {
      id: 'generative-story',
      title: 'Generative Story',
      icon: BookOpen,
      description: 'Compelling narratives that drive action',
      longDescription: 'Craft stories that transform obstacles into opportunities and setbacks into comebacks. Your narrative becomes a powerful force for sustained motivation and creative problem-solving.',
      practices: ['Reframing techniques', 'Narrative construction', 'Story-driven motivation'],
      color: 'story-steel'
    },
    {
      id: 'worthy-mission',
      title: 'Worthy Mission',
      icon: Target,
      description: 'Purpose-driven goals that inspire engagement',
      longDescription: 'Align your efforts with missions that matter beyond personal gain. When your work serves something greater, intrinsic motivation becomes inexhaustible.',
      practices: ['Purpose clarification', 'Impact measurement', 'Mission alignment'],
      color: 'story-steel'
    },
    {
      id: 'empowered-role',
      title: 'Empowered Role',
      icon: UserCheck,
      description: 'Clear identity and meaningful contribution',
      longDescription: 'Step into roles that leverage your unique strengths and create meaningful impact. When identity and action align, you access your full potential with natural authority.',
      practices: ['Identity clarification', 'Strength optimization', 'Contribution maximization'],
      color: 'story-steel'
    }
  ];

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-elevation">
        {/* Navigation */}
        <div className="container mx-auto px-6 pt-8">
          <Link to="/framework" className="inline-flex items-center gap-2 text-muted-foreground hover:text-story-steel transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Framework
          </Link>
        </div>

      {/* Header */}
      <div className="container mx-auto px-6 pt-12 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 bg-story-steel rounded-xl flex items-center justify-center animate-float">
              <Plus className="w-10 h-10 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2 px-3 py-1 text-story-steel border-story-steel/30">
                Major Key
              </Badge>
              <h1 className="text-6xl font-bold text-story-steel">STORY</h1>
            </div>
          </div>
          
          <p className="text-2xl text-muted-foreground leading-relaxed mb-8">
            The narratives, missions, and roles that fuel sustained motivation and create 
            meaning beyond personal achievement through purposeful contribution.
          </p>
          
          <div className="bg-gradient-to-r from-story-steel/10 to-story-steel/5 rounded-2xl p-8 border border-story-steel/20">
            <h2 className="text-xl font-bold text-foreground mb-4">The STORY Dimension</h2>
            <p className="text-muted-foreground leading-relaxed">
              Humans are meaning-making creatures who thrive when connected to compelling narratives 
              that extend beyond the self. This dimension focuses on crafting stories that transform 
              challenges into growth opportunities, aligning with missions that matter, and stepping 
              into roles that allow your unique gifts to create meaningful impact in the world.
            </p>
          </div>
        </div>
      </div>

      {/* Minor Keys */}
      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Three Elements of STORY</h2>
          
          <div className="space-y-8">
            {minorKeys.map((minorKey, index) => {
              const IconComponent = minorKey.icon;
              return (
                <Card 
                  key={minorKey.id}
                  className="card-story border-2 rounded-2xl shadow-elevation hover:shadow-flow transition-all duration-500"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-story-steel rounded-xl flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-story-steel mb-1">
                            {minorKey.title}
                          </CardTitle>
                          <p className="text-muted-foreground font-medium">
                            {minorKey.description}
                          </p>
                        </div>
                      </div>
                      <Link to={`/framework/story/${minorKey.id}`}>
                        <Button 
                          variant="outline" 
                          className="border-story-steel/30 text-story-steel hover:bg-story-steel hover:text-white transition-all duration-300"
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
                              <div className="w-2 h-2 bg-story-steel rounded-full flex-shrink-0" />
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
          <div className="mt-16 bg-gradient-flow rounded-2xl p-8 text-center shadow-flow">
            <h3 className="text-2xl font-bold text-white mb-4">
              Narrative Power & Purpose
            </h3>
            <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
              When your story, mission, and role align, you tap into an inexhaustible source 
              of motivation. Purpose-driven action becomes effortless because it serves 
              something greater than individual achievement—creating sustainable flow through meaning.
            </p>
          </div>
        </div>
      </div>
    </div>
    </SidebarLayout>
  );
};

export default StoryOverview;