import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  ArrowLeft, 
  Circle, 
  HelpCircle, 
  Search, 
  BookOpen, 
  Lightbulb,
  Star,
  CheckCircle,
  Brain,
  Compass,
  Zap,
  Target
} from 'lucide-react';
import { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

const IgnitedCuriosity = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const coreElements = [
    {
      title: "Question Generation",
      description: "Cultivating the art of asking powerful questions",
      icon: HelpCircle,
      progress: 82
    },
    {
      title: "Exploration Drive", 
      description: "Intrinsic motivation to discover and learn",
      icon: Search,
      progress: 75
    },
    {
      title: "Wonder Cultivation",
      description: "Maintaining childlike fascination with the world",
      icon: Star,
      progress: 68
    }
  ];

  const curiosityTypes = [
    { 
      type: "Epistemic Curiosity", 
      description: "Drive to acquire knowledge and understand how things work", 
      examples: "Scientific inquiry, research, deep learning, mechanism understanding",
      benefit: "Builds expertise and cognitive flexibility"
    },
    { 
      type: "Diversive Curiosity", 
      description: "Seeking stimulation and new experiences to avoid boredom", 
      examples: "Travel, novel activities, meeting new people, trying new things",
      benefit: "Expands perspectives and prevents stagnation"
    },
    { 
      type: "Empathic Curiosity", 
      description: "Interest in understanding others' thoughts, feelings, and experiences", 
      examples: "Deep listening, perspective-taking, cultural exploration, human psychology",
      benefit: "Enhances relationships and social intelligence"
    },
    { 
      type: "Creative Curiosity", 
      description: "Exploration of possibilities and novel combinations", 
      examples: "Artistic experimentation, innovative problem-solving, what-if scenarios",
      benefit: "Drives innovation and breakthrough thinking"
    }
  ];

  const curiosityPractices = [
    {
      title: "The 5-Why Practice",
      description: "Dig deeper into any interesting phenomenon",
      example: "Why does this work? → Why is that important? → Continue 5 levels deep",
      icon: HelpCircle
    },
    {
      title: "Beginner's Mind Reset",
      description: "Approach familiar topics as if seeing them for the first time",
      example: "Look at your daily routine with fresh eyes—what would you notice?",
      icon: Star
    },
    {
      title: "Question Collection",
      description: "Actively gather and pursue interesting questions",
      example: "Keep a running list of things that make you wonder 'How?' or 'Why?'",
      icon: BookOpen
    }
  ];

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-elevation">
      {/* Navigation */}
      <div className="container mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/framework/spirit" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-spirit-amethyst transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SPIRIT
          </Link>
          <Badge variant="outline" className="px-3 py-1 text-spirit-amethyst border-spirit-amethyst/30">
            Minor Key
          </Badge>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 bg-spirit-amethyst rounded-xl flex items-center justify-center animate-float">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-spirit-amethyst/80 mb-2">SPIRIT</p>
                <h1 className="text-5xl font-bold text-spirit-amethyst">Ignited Curiosity</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Wonder and exploration that fuel growth by transforming challenges into fascinating puzzles
            </p>

            {/* Core Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {coreElements.map((element, index) => {
                const IconComponent = element.icon;
                return (
                  <Card 
                    key={index}
                    className="card-spirit border-2 transition-all duration-300 hover:shadow-flow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-spirit-amethyst rounded-lg flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{element.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{element.description}</p>
                      <Progress value={element.progress} className="h-2" />
                      <p className="text-xs text-spirit-amethyst mt-2">{element.progress}% Ignited</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="concept" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="concept">Core Concept</TabsTrigger>
              <TabsTrigger value="science">The Science</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
            </TabsList>

            {/* Core Concept */}
            <TabsContent value="concept" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <Lightbulb className="w-6 h-6" />
                      Curiosity as Life Force
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Curiosity is the engine of human progress and personal growth. It transforms 
                        obstacles into interesting challenges and boredom into opportunities for 
                        discovery. When curiosity is ignited, learning becomes effortless and flow states occur naturally.
                      </p>
                      
                      <div className="bg-gradient-flow rounded-lg p-4 text-white">
                        <h4 className="font-bold mb-2">The Curiosity Advantage</h4>
                        <p className="text-sm text-white/90">
                          Curious people live longer, learn faster, and experience more satisfaction 
                          from life. Curiosity creates resilience by reframing setbacks as 
                          learning opportunities and maintaining engagement during difficult periods.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-spirit-amethyst mb-2">42%</div>
                        <p className="text-sm text-muted-foreground">Higher life satisfaction in highly curious people</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <Search className="w-6 h-6" />
                      The Spectrum of Curiosity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Curiosity manifests in different forms, each serving unique purposes in 
                        growth and flow. The most fulfilled people cultivate multiple types of curiosity.
                      </p>
                      
                      <div className="space-y-3">
                        {curiosityTypes.map((type, index) => (
                          <div key={index} className="p-3 rounded-lg bg-white/50">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-semibold text-spirit-amethyst text-sm">{type.type}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{type.description}</p>
                            <p className="text-xs text-foreground font-medium mb-1">{type.examples}</p>
                            <p className="text-xs text-spirit-amethyst italic">{type.benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Curiosity Cultivation Framework */}
              <Card className="card-spirit border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                    <Zap className="w-6 h-6" />
                    Systematic Curiosity Cultivation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Curiosity can be systematically developed through practices that expand your 
                    capacity for wonder and maintain motivation for lifelong learning.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {curiosityPractices.map((practice, index) => {
                      const IconComponent = practice.icon;
                      return (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center gap-3 text-spirit-amethyst font-semibold">
                            <IconComponent className="w-5 h-5" />
                            {practice.title}
                          </div>
                          <p className="text-sm text-muted-foreground">{practice.description}</p>
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-foreground">Practice:</p>
                            <p className="text-xs text-muted-foreground italic">{practice.example}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-harmony rounded-lg text-white">
                    <h4 className="font-medium text-white mb-2">Curiosity Igniters:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div>
                        <p>• Ask "What if...?" about everything you encounter</p>
                        <p>• Seek to understand before seeking to be understood</p>
                        <p>• Find the question behind every answer</p>
                      </div>
                      <div>
                        <p>• Connect disparate ideas and look for patterns</p>
                        <p>• Embrace intellectual humility and "I don't know"</p>
                        <p>• Turn problems into puzzles waiting to be solved</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* The Science */}
            <TabsContent value="science" className="mt-8">
              <Card className="card-spirit border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                    <Brain className="w-6 h-6" />
                    Psychology & Neuroscience of Curiosity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Research reveals that curiosity is not just a personality trait but a 
                    learnable skill that creates measurable changes in brain function and life outcomes.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Information Gap Theory</h4>
                      <p className="text-sm text-blue-600">
                        Curiosity arises when we become aware of a gap in our knowledge. 
                        This creates a drive state similar to hunger that motivates learning behavior.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Growth Mindset Research</h4>
                      <p className="text-sm text-green-600">
                        Carol Dweck's research shows that curious, learning-oriented mindsets 
                        lead to better outcomes than fixed, performance-oriented approaches.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Neurological Benefits of Curiosity</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <h5 className="font-semibold text-purple-700 mb-2">Dopamine Enhancement</h5>
                        <p className="text-sm text-purple-600">
                          Curiosity triggers dopamine release, making learning intrinsically rewarding
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <h5 className="font-semibold text-orange-700 mb-2">Neuroplasticity Boost</h5>
                        <p className="text-sm text-orange-600">
                          Curious states increase BDNF production, enhancing brain's capacity to form new connections
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
                        <h5 className="font-semibold text-teal-700 mb-2">Memory Consolidation</h5>
                        <p className="text-sm text-teal-600">
                          Information learned in states of curiosity is retained better and longer
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Longitudinal Studies on Curiosity</h4>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gradient-flow text-white">
                        <h5 className="font-semibold mb-2">Health & Longevity Research</h5>
                        <p className="text-sm text-white/90">
                          Studies following people over decades show that those who maintain high levels 
                          of curiosity have better physical health, cognitive function, and life satisfaction 
                          well into old age.
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gradient-harmony text-white">
                        <h5 className="font-semibold mb-2">Career Success Studies</h5>
                        <p className="text-sm text-white/90">
                          Research shows that curiosity is a stronger predictor of job performance 
                          than intelligence in complex, changing work environments. Curious people 
                          adapt better and find more innovative solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Practice */}
            <TabsContent value="practice" className="mt-8">
              <div className="space-y-8">
                {/* Curiosity Development Process */}
                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <CheckCircle className="w-6 h-6" />
                      Systematic Curiosity Development Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Develop a sustainable practice of curiosity that maintains wonder and 
                      drives continuous learning throughout your life.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Curiosity Expansion Process:</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-foreground">Current Curiosity Audit</p>
                              <p className="text-sm text-muted-foreground">What already fascinates you? What questions occupy your mind?</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-foreground">Question Generation Practice</p>
                              <p className="text-sm text-muted-foreground">Daily practice of asking deeper, more interesting questions</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-foreground">Exploration Commitment</p>
                              <p className="text-sm text-muted-foreground">Regular time for following curiosity threads</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-foreground">Wonder Integration</p>
                              <p className="text-sm text-muted-foreground">Connecting learning to broader life and work contexts</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Daily Curiosity Practices:</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Morning Question Setting</p>
                            <p className="text-xs text-muted-foreground">What am I curious about today?</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Active Questioning</p>
                            <p className="text-xs text-muted-foreground">Ask 3 "why" or "how" questions during conversations</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Learning Documentation</p>
                            <p className="text-xs text-muted-foreground">Capture interesting discoveries and connections</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Wonder Walking</p>
                            <p className="text-xs text-muted-foreground">Take walks specifically for observing and questioning</p>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-flow rounded-lg text-white">
                          <p className="text-sm text-white/90 font-medium mb-2">Curiosity Killer Warning:</p>
                          <p className="text-xs text-white/80">
                            Avoid the curiosity trap of consuming information without questioning. 
                            Passive consumption kills wonder—active questioning ignites it.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Deep Learning Integration */}
                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <Compass className="w-6 h-6" />
                      Curiosity-Driven Learning System
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Transform curiosity into systematic learning that creates compound knowledge 
                      and breakthrough insights over time.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Curiosity Capture</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Keep a running question journal</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Note interesting connections you notice</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Record moments of wonder</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Exploration Time</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Schedule weekly curiosity deep-dives</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Follow learning threads until satisfaction</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Document insights and applications</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Integration Practice</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Connect new learning to current projects</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Share discoveries with others</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Apply new knowledge immediately</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gradient-harmony rounded-lg text-white">
                      <h4 className="font-medium text-white mb-2">Curiosity Compound Interest:</h4>
                      <p className="text-sm text-white/90">
                        Each question you explore creates more questions. Each connection you make enables 
                        more connections. Curiosity compounds exponentially when systematically cultivated.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Integration */}
            <TabsContent value="integration" className="mt-8">
              <div className="space-y-8">
                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <Circle className="w-6 h-6" />
                      Integration with Other Flow Triggers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Ignited curiosity transforms every other flow dimension by maintaining wonder 
                      and preventing stagnation, ensuring continuous growth and engagement.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-spirit-amethyst rounded-full" />
                          With Other SPIRIT Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Curiosity expands and deepens understanding of your values</li>
                          <li>• Wonder helps visualize and refine compelling visions</li>
                          <li>• All spirit elements remain dynamic through curious exploration</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-self-coral rounded-full" />
                          With SELF Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Curiosity transforms emotional challenges into learning opportunities</li>
                          <li>• Wonder naturally expands cognitive flexibility and growth mindset</li>
                          <li>• Exploration energizes embodied presence and engagement</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-space-sage rounded-full" />
                          With SPACE Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Curiosity drives optimization of spaces for better thinking</li>
                          <li>• Wonder motivates mastery of tools that enable exploration</li>
                          <li>• Questions make feedback systems more meaningful and actionable</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-story-steel rounded-full" />
                          With STORY Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Curiosity enriches generative stories with deeper insights</li>
                          <li>• Wonder reveals new dimensions of worthy missions</li>
                          <li>• Exploration expands the possibilities within empowered roles</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <Target className="w-6 h-6" />
                      Your Path Forward
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Curiosity is not a fixed trait—it's a skill that grows stronger with practice. 
                      The key is cultivating wonder systematically while following your natural 
                      interests and questions wherever they lead.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-spirit-amethyst" />
                        <p className="text-sm text-foreground">Start a curiosity journal to capture questions and insights</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-spirit-amethyst" />
                        <p className="text-sm text-foreground">Schedule weekly curiosity exploration time</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-spirit-amethyst" />
                        <p className="text-sm text-foreground">Practice asking deeper questions in daily conversations</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework">
                        <Button className="bg-spirit-amethyst hover:bg-spirit-amethyst/80">
                          Complete: Framework Overview →
                        </Button>
                      </Link>
                      <Link to="/framework/spirit">
                        <Button variant="outline" className="border-spirit-amethyst/30 text-spirit-amethyst hover:bg-spirit-amethyst hover:text-white">
                          Back to SPIRIT Overview
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    </SidebarLayout>
  );
};

export default IgnitedCuriosity;