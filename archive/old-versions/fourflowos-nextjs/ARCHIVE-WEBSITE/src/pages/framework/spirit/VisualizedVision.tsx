import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  ArrowLeft, 
  Circle, 
  Target, 
  Image, 
  Telescope, 
  Star,
  Lightbulb,
  CheckCircle,
  Brain,
  Compass,
  Mountain,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

const VisualizedVision = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const coreElements = [
    {
      title: "Vision Clarity",
      description: "Precise mental model of desired future states",
      icon: Target,
      progress: 75
    },
    {
      title: "Sensory Richness", 
      description: "Vivid multi-sensory visualization practices",
      icon: Eye,
      progress: 68
    },
    {
      title: "Emotional Connection",
      description: "Deep feeling states associated with vision",
      icon: Star,
      progress: 82
    }
  ];

  const visionTypes = [
    { 
      type: "Outcome Visions", 
      description: "Specific end states you want to achieve", 
      examples: "Career milestones, relationship goals, creative projects, health targets",
      power: "Provides clear direction and motivation"
    },
    { 
      type: "Process Visions", 
      description: "How you want to show up and operate daily", 
      examples: "Ideal morning routine, peak performance states, leadership style, creative process",
      power: "Guides immediate behavior and decisions"
    },
    { 
      type: "Identity Visions", 
      description: "Who you are becoming as a person", 
      examples: "Character development, skill mastery, wisdom cultivation, service orientation",
      power: "Shapes long-term growth and development"
    },
    { 
      type: "Impact Visions", 
      description: "The change you want to create in the world", 
      examples: "Problems solved, people helped, knowledge shared, systems improved",
      power: "Connects to transcendent purpose and meaning"
    }
  ];

  const visualizationTechniques = [
    {
      title: "Mental Rehearsal",
      description: "Practice successful execution in vivid detail",
      example: "Rehearse delivering a presentation with confidence and impact",
      icon: Brain
    },
    {
      title: "Future Self Visualization",
      description: "Connect with the person you're becoming",
      example: "See, feel, and embody your future self living your vision",
      icon: Mountain
    },
    {
      title: "Backwards Visioning",
      description: "Start from achieved vision and work backwards",
      example: "From accomplished goal, trace back the journey that led there",
      icon: Compass
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
                <Eye className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-spirit-amethyst/80 mb-2">SPIRIT</p>
                <h1 className="text-5xl font-bold text-spirit-amethyst">Visualized Vision</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Clear future states that attract success through compelling mental models and emotional connection
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
                      <p className="text-xs text-spirit-amethyst mt-2">{element.progress}% Activated</p>
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
                      <Telescope className="w-6 h-6" />
                      Vision as Mental Magnet
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A visualized vision functions as a mental magnet that pulls your subconscious 
                        mind, daily decisions, and creative problem-solving toward its manifestation. 
                        The brain cannot distinguish between vividly imagined and real experiences.
                      </p>
                      
                      <div className="bg-gradient-flow rounded-lg p-4 text-white">
                        <h4 className="font-bold mb-2">Neural Priming Effect</h4>
                        <p className="text-sm text-white/90">
                          Consistent visualization literally rewires your brain's reticular activating 
                          system to notice opportunities, resources, and connections that support your 
                          vision while filtering out irrelevant distractions.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-spirit-amethyst mb-2">76%</div>
                        <p className="text-sm text-muted-foreground">Higher goal achievement with regular visualization</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <Image className="w-6 h-6" />
                      Types of Empowering Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Effective visions operate at multiple levels simultaneously—from specific outcomes 
                        to identity transformation. The most powerful visions integrate all types.
                      </p>
                      
                      <div className="space-y-3">
                        {visionTypes.map((vision, index) => (
                          <div key={index} className="p-3 rounded-lg bg-white/50">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-semibold text-spirit-amethyst text-sm">{vision.type}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{vision.description}</p>
                            <p className="text-xs text-foreground font-medium mb-1">{vision.examples}</p>
                            <p className="text-xs text-spirit-amethyst italic">{vision.power}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Vision Creation Framework */}
              <Card className="card-spirit border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                    <Lightbulb className="w-6 h-6" />
                    Advanced Visualization Techniques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Moving beyond basic positive thinking, these techniques create neurological 
                    changes that increase the likelihood of vision manifestation.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {visualizationTechniques.map((technique, index) => {
                      const IconComponent = technique.icon;
                      return (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center gap-3 text-spirit-amethyst font-semibold">
                            <IconComponent className="w-5 h-5" />
                            {technique.title}
                          </div>
                          <p className="text-sm text-muted-foreground">{technique.description}</p>
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-foreground">Practice:</p>
                            <p className="text-xs text-muted-foreground italic">{technique.example}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-harmony rounded-lg text-white">
                    <h4 className="font-medium text-white mb-2">Vision Quality Checklist:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div>
                        <p>• Is it specific and detailed enough to feel real?</p>
                        <p>• Does it engage multiple senses (visual, auditory, kinesthetic)?</p>
                        <p>• Do you feel strong positive emotion when you visualize it?</p>
                      </div>
                      <div>
                        <p>• Does it align with your values and authentic self?</p>
                        <p>• Is it challenging enough to inspire growth?</p>
                        <p>• Can you see yourself worthy of this outcome?</p>
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
                    Neuroscience of Visualization & Achievement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Research in neuroscience and sports psychology reveals that visualization 
                    creates measurable changes in brain structure and dramatically improves performance outcomes.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Motor Imagery Research</h4>
                      <p className="text-sm text-blue-600">
                        Mental practice activates the same neural pathways as physical practice, 
                        creating muscle memory and skill improvement without physical repetition.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Goal-Gradient Effect</h4>
                      <p className="text-sm text-green-600">
                        Vivid visualization of goals creates psychological proximity that increases 
                        motivation and accelerates progress toward desired outcomes.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Brain Changes from Visualization</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <h5 className="font-semibold text-purple-700 mb-2">Neural Pathway Strengthening</h5>
                        <p className="text-sm text-purple-600">
                          Repeated visualization strengthens neural connections for visualized behaviors
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <h5 className="font-semibold text-orange-700 mb-2">Reticular Activation</h5>
                        <p className="text-sm text-orange-600">
                          Vision clarity programs the RAS to notice relevant opportunities and resources
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
                        <h5 className="font-semibold text-teal-700 mb-2">Stress Inoculation</h5>
                        <p className="text-sm text-teal-600">
                          Mental rehearsal reduces anxiety and improves performance under pressure
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Research Findings from Elite Performance</h4>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gradient-flow text-white">
                        <h5 className="font-semibold mb-2">Olympic Athletes Study</h5>
                        <p className="text-sm text-white/90">
                          Research shows that Olympic athletes who combine physical training with 
                          systematic mental rehearsal outperform those who use physical training alone 
                          by an average of 23%.
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gradient-harmony text-white">
                        <h5 className="font-semibold mb-2">Surgeon Performance Research</h5>
                        <p className="text-sm text-white/90">
                          Studies of surgeons show that those who mentally rehearse procedures before 
                          performing them have significantly fewer complications and better patient outcomes.
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
                {/* Vision Creation Process */}
                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <CheckCircle className="w-6 h-6" />
                      Comprehensive Vision Creation Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Create powerful, multi-dimensional visions that engage your subconscious mind 
                      and naturally pull you toward their manifestation.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Vision Crafting Framework:</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-foreground">Values-Vision Alignment</p>
                              <p className="text-sm text-muted-foreground">Ensure vision reflects your deepest values</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-foreground">Multi-Sensory Detailing</p>
                              <p className="text-sm text-muted-foreground">Add visual, auditory, kinesthetic elements</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-foreground">Emotional Amplification</p>
                              <p className="text-sm text-muted-foreground">Connect to feelings of achievement and fulfillment</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-foreground">Identity Integration</p>
                              <p className="text-sm text-muted-foreground">See yourself as worthy and capable of this vision</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Vision Elements Checklist:</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Visual Details</p>
                            <p className="text-xs text-muted-foreground">Colors, lighting, surroundings, people present</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Auditory Elements</p>
                            <p className="text-xs text-muted-foreground">Sounds, music, conversations, applause</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Kinesthetic Sensations</p>
                            <p className="text-xs text-muted-foreground">Physical feelings, movements, energy levels</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Emotional States</p>
                            <p className="text-xs text-muted-foreground">Joy, pride, confidence, peace, excitement</p>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-flow rounded-lg text-white">
                          <p className="text-sm text-white/90 font-medium mb-2">Vision Test:</p>
                          <p className="text-xs text-white/80">
                            A powerful vision should feel so real and compelling that you get 
                            excited just thinking about it and naturally take steps toward it.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Visualization Practice */}
                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <Zap className="w-6 h-6" />
                      Daily Visualization Practice Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Systematic daily practice that progressively strengthens neural pathways 
                      and increases manifestation likelihood through consistent mental rehearsal.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Morning Vision Session</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">5-10 minutes of vivid visualization</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Focus on feeling states of achievement</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Connect to daily actions that support vision</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Mental Rehearsal Practice</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Rehearse successful performance scenarios</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Practice overcoming potential obstacles</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Visualize confident, competent execution</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Evening Vision Review</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Celebrate progress toward vision</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Notice opportunities that appeared</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Refine and deepen visualization</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gradient-harmony rounded-lg text-white">
                      <h4 className="font-medium text-white mb-2">Visualization Progress Indicators:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                        <div>
                          <p>• Vision feels increasingly real and achievable</p>
                          <p>• You naturally notice related opportunities</p>
                        </div>
                        <div>
                          <p>• Daily actions align more with vision</p>
                          <p>• Others comment on your focused direction</p>
                        </div>
                      </div>
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
                      A visualized vision provides the compelling future that gives direction and 
                      meaning to every other flow dimension, creating sustainable motivation through hope.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-spirit-amethyst rounded-full" />
                          With Other SPIRIT Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Visions that honor and express grounding values</li>
                          <li>• Clear futures that channel curiosity and exploration</li>
                          <li>• All spirit elements work together toward vision manifestation</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-self-coral rounded-full" />
                          With SELF Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Visions provide context for emotional regulation during challenges</li>
                          <li>• Clear futures guide cognitive flexibility and learning priorities</li>
                          <li>• Compelling visions energize embodied presence and action</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-space-sage rounded-full" />
                          With SPACE Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Visions inform intentional space design requirements</li>
                          <li>• Clear futures guide tool selection and mastery priorities</li>
                          <li>• Vision progress provides meaningful feedback metrics</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-story-steel rounded-full" />
                          With STORY Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Visions provide the "destination" for generative stories</li>
                          <li>• Clear futures connect to and support worthy missions</li>
                          <li>• Compelling visions define the empowered role you're growing into</li>
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
                      Your visualized vision should evolve as you grow and achieve milestones. 
                      The key is maintaining a compelling future that pulls you forward and 
                      provides meaning to present challenges.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-spirit-amethyst" />
                        <p className="text-sm text-foreground">Create a comprehensive vision using the multi-sensory framework</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-spirit-amethyst" />
                        <p className="text-sm text-foreground">Establish daily visualization practice (morning and evening)</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-spirit-amethyst" />
                        <p className="text-sm text-foreground">Track how vision clarity influences daily decisions and opportunities</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework/spirit/ignited-curiosity">
                        <Button className="bg-spirit-amethyst hover:bg-spirit-amethyst/80">
                          Next: Ignited Curiosity →
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

export default VisualizedVision;