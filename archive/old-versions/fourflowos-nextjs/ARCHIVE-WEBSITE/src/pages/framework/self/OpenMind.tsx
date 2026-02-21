import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  ArrowLeft, 
  Waves, 
  Lightbulb, 
  Target, 
  Compass, 
  Zap,
  TrendingUp,
  Eye,
  CheckCircle,
  Users,
  Book,
  Volume2,
  PlayCircle,
  MessageCircle,
  PenTool,
  GraduationCap
} from 'lucide-react';
import SidebarLayout from '@/components/SidebarLayout';

const OpenMind = () => {
  const coreElements = [
    {
      title: "Mental Decluttering",
      description: "Creating space between thoughts for clarity",
      icon: Brain,
      progress: 78
    },
    {
      title: "Growth Mindset",
      description: "Viewing challenges as opportunities",
      icon: TrendingUp,
      progress: 85
    },
    {
      title: "Cognitive Flexibility",
      description: "Adapting thinking patterns fluidly",
      icon: Lightbulb,
      progress: 72
    }
  ];

  const learningPyramid = [
    { method: "Teaching Others", retention: 90, icon: GraduationCap, color: "bg-self-coral" },
    { method: "Practice by Doing", retention: 75, icon: PenTool, color: "bg-orange-500" },
    { method: "Group Discussion", retention: 50, icon: MessageCircle, color: "bg-yellow-500" },
    { method: "Demonstration", retention: 30, icon: PlayCircle, color: "bg-blue-500" },
    { method: "Audio/Visual", retention: 20, icon: Volume2, color: "bg-indigo-500" },
    { method: "Reading", retention: 10, icon: Book, color: "bg-purple-500" },
    { method: "Lecture", retention: 5, icon: Users, color: "bg-gray-500" }
  ];

  const practicalStrategies = [
    {
      title: "Brain Dump Practice",
      description: "Daily 10-minute sessions to externalize mental clutter",
      technique: "Write down every thought, worry, or idea without judgment",
      icon: Brain
    },
    {
      title: "Beginner's Mindset",
      description: "Approach familiar tasks as if seeing them for the first time",
      technique: "Ask 'What am I not seeing?' or 'What if the opposite were true?'",
      icon: Eye
    },
    {
      title: "Assumption Challenging",
      description: "Weekly practice of arguing against your own beliefs",
      technique: "Take one strong belief and find evidence against it",
      icon: Target
    },
    {
      title: "Singular Focus Training",
      description: "Building cognitive strength through mono-tasking",
      technique: "Choose one meta-focus and eliminate non-synergistic pursuits",
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
            to="/framework/self" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-self-coral transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SELF
          </Link>
          <Badge variant="outline" className="px-3 py-1 text-self-coral border-self-coral/30">
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
              <div className="w-20 h-20 bg-self-coral rounded-xl flex items-center justify-center animate-float p-3">
                <img 
                  src="/LOGOS/OPEN MIND.png" 
                  alt="Open Mind" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-self-coral/80 mb-2">SELF</p>
                <h1 className="text-5xl font-bold text-self-coral">Open Mind</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Cultivating a dynamic channel for flow through cognitive flexibility, 
              mental decluttering, and growth-oriented thinking
            </p>

            {/* Core Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {coreElements.map((element, index) => {
                const IconComponent = element.icon;
                return (
                  <Card 
                    key={index}
                    className="card-self border-2 transition-all duration-300 hover:shadow-flow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-self-coral rounded-lg flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{element.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{element.description}</p>
                      <Progress value={element.progress} className="h-2" />
                      <p className="text-xs text-self-coral mt-2">{element.progress}% Mastery</p>
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
              <div className="space-y-8">
                {/* River Metaphor */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Waves className="w-6 h-6" />
                      The Mind as a River
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Imagine your mind as a river—sometimes it flows smoothly, reflecting the sky above and 
                      carrying you effortlessly downstream. But on other days, debris clogs the current, 
                      branches and rocks slow the flow, and you feel stuck, unable to navigate freely.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                        <h4 className="font-semibold text-red-700 mb-3">Clogged Mental River</h4>
                        <ul className="text-sm text-red-600 space-y-2">
                          <li>• Fixed beliefs and mental rigidity</li>
                          <li>• Scattered thoughts and distractions</li>
                          <li>• Outdated stories and limiting patterns</li>
                          <li>• Loss of cognitive flexibility</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-3">Clear Mental Flow</h4>
                        <ul className="text-sm text-green-600 space-y-2">
                          <li>• Growth mindset and adaptability</li>
                          <li>• Space between thoughts for awareness</li>
                          <li>• Fresh perspectives and insights</li>
                          <li>• Dynamic mental flexibility</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* What is an Open Mind */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Lightbulb className="w-6 h-6" />
                      The Rubber Band Mind
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      An Open Mind operates like a flexible rubber band—able to expand, contract, 
                      and reshape itself as needed without breaking. This flexibility is crucial 
                      for flow states as it reduces the friction of resistance.
                    </p>

                    <div className="bg-gradient-flow rounded-lg p-6 text-white mb-6">
                      <h4 className="font-bold mb-3">Core Principles of Mental Openness</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium mb-2">Embracing Possibility</p>
                          <p className="text-white/90">Willing to step beyond comfort zones and question assumptions</p>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Growth Orientation</p>
                          <p className="text-white/90">Viewing challenges as opportunities and failures as feedback</p>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Beginner's Mind</p>
                          <p className="text-white/90">Approaching familiar situations with fresh curiosity</p>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Cognitive Agility</p>
                          <p className="text-white/90">Fluidly moving between different perspectives</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-sm text-blue-700">
                        <strong>Key Insight:</strong> The Open Mind creates space <em>between</em> your thoughts, 
                        allowing for greater awareness and presence. This clarity enables you to notice patterns, 
                        make connections, and generate solutions you'd otherwise miss.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* The Science */}
            <TabsContent value="science" className="mt-8">
              <div className="space-y-8">
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Brain className="w-6 h-6" />
                      Neuroplasticity & Growth Mindset
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      An Open Mind is directly linked to neuroplasticity—the brain's ability to rewire 
                      itself based on new experiences and learning. When you adopt a growth mindset, 
                      you activate the brain's learning centers and increase dopamine production.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-3">Growth Mindset Brain</h4>
                        <ul className="text-sm text-green-600 space-y-2">
                          <li>• Increased dopamine for motivation</li>
                          <li>• Enhanced neuroplasticity</li>
                          <li>• Active learning centers</li>
                          <li>• Reduced cortisol (stress hormone)</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                        <h4 className="font-semibold text-red-700 mb-3">Fixed Mindset Brain</h4>
                        <ul className="text-sm text-red-600 space-y-2">
                          <li>• Elevated cortisol from stress</li>
                          <li>• Cognitive rigidity patterns</li>
                          <li>• Reduced learning capacity</li>
                          <li>• Heightened threat detection</li>
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div className="mt-6">
                      <h4 className="font-semibold text-foreground mb-4">The Learning Pyramid: Retention Rates</h4>
                      <div className="space-y-3">
                        {learningPyramid.map((item, index) => {
                          const IconComponent = item.icon;
                          return (
                            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/50">
                              <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-medium text-foreground">{item.method}</p>
                                  <p className="text-sm font-bold text-self-coral">{item.retention}%</p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-self-coral h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${item.retention}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        Active learning methods require greater openness and cognitive flexibility, 
                        leading to dramatically higher retention rates.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Attention and Focus */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Zap className="w-6 h-6" />
                      The Attention War
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">21st Century Challenge</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                            <p className="font-medium text-red-700 text-sm">150 phone checks per day</p>
                            <p className="text-xs text-red-600">Average person's attention fragmentation</p>
                          </div>
                          <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                            <p className="font-medium text-orange-700 text-sm">Continuous Partial Attention</p>
                            <p className="text-xs text-orange-600">Never giving full attention to anything</p>
                          </div>
                          <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                            <p className="font-medium text-yellow-700 text-sm">Attention Residue</p>
                            <p className="text-xs text-yellow-600">Cognitive hangover from task switching</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">The Flow Advantage</h4>
                        <div className="p-4 rounded-lg bg-gradient-harmony text-white">
                          <p className="font-medium mb-2">Competitive Edge</p>
                          <p className="text-sm text-white/90 mb-4">
                            Those who guard their attention and cultivate singular focus gain massive 
                            advantages in our distracted world.
                          </p>
                          <div className="text-xs text-white/80">
                            "The ability to perform deep work is becoming increasingly rare and valuable." 
                            - Cal Newport
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Practice */}
            <TabsContent value="practice" className="mt-8">
              <div className="space-y-8">
                {/* Core Strategies */}
                <div className="grid md:grid-cols-2 gap-6">
                  {practicalStrategies.map((strategy, index) => {
                    const IconComponent = strategy.icon;
                    return (
                      <Card 
                        key={index}
                        className="card-self border-2 hover:shadow-flow transition-all duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-self-coral rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <CardTitle className="text-lg text-self-coral">{strategy.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="text-xs font-medium text-foreground mb-1">Technique:</p>
                            <p className="text-xs text-muted-foreground">{strategy.technique}</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Dopamine Detox Protocol */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Brain className="w-6 h-6" />
                      Three Pillars of Cognitive Clarity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Battle 21st-century brain melt with these three evidence-based approaches 
                      to reclaim cognitive sovereignty and enhance mental flexibility.
                    </p>

                    <div className="space-y-6">
                      {/* Pillar 1 */}
                      <div className="p-6 rounded-lg border-2 border-self-coral/20 bg-gradient-to-br from-self-coral/5 to-self-coral/10">
                        <h4 className="font-bold text-self-coral mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-self-coral rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                          Dopamine Detox
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Reset your dopamine baseline to become sensitive to simple stimulation again.
                        </p>
                        <div className="grid md:grid-cols-3 gap-3 text-xs">
                          <div className="p-2 rounded bg-white/50">
                            <p className="font-medium">Remove High-Stimulation</p>
                            <p className="text-muted-foreground">Social media, sugar, entertainment</p>
                          </div>
                          <div className="p-2 rounded bg-white/50">
                            <p className="font-medium">Embrace Boredom</p>
                            <p className="text-muted-foreground">Sit in silence, meditate, fast</p>
                          </div>
                          <div className="p-2 rounded bg-white/50">
                            <p className="font-medium">Cultivate Monk State</p>
                            <p className="text-muted-foreground">Find joy in simple things</p>
                          </div>
                        </div>
                      </div>

                      {/* Pillar 2 */}
                      <div className="p-6 rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                        <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                          Unitasking Mastery
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Eliminate attention residue by doing one thing at a time to completion.
                        </p>
                        <div className="grid md:grid-cols-3 gap-3 text-xs">
                          <div className="p-2 rounded bg-white/50">
                            <p className="font-medium">No Task Switching</p>
                            <p className="text-muted-foreground">Complete before moving on</p>
                          </div>
                          <div className="p-2 rounded bg-white/50">
                            <p className="font-medium">Focus Blocks</p>
                            <p className="text-muted-foreground">45-90 minute deep work sessions</p>
                          </div>
                          <div className="p-2 rounded bg-white/50">
                            <p className="font-medium">Cognitive Load Down</p>
                            <p className="text-muted-foreground">External systems for memory</p>
                          </div>
                        </div>
                      </div>

                      {/* Pillar 3 */}
                      <div className="p-6 rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                        <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                          Impulse Control
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Develop monk-like resistance to distraction through conscious practice.
                        </p>
                        <div className="grid md:grid-cols-3 gap-3 text-xs">
                          <div className="p-2 rounded bg-white/50">
                            <p className="font-medium">Exaggerate Consequences</p>
                            <p className="text-muted-foreground">Make interruption costs explicit</p>
                          </div>
                          <div className="p-2 rounded bg-white/50">
                            <p className="font-medium">10-Breath Reset</p>
                            <p className="text-muted-foreground">Pause before acting on impulses</p>
                          </div>
                          <div className="p-2 rounded bg-white/50">
                            <p className="font-medium">Write Don't Act</p>
                            <p className="text-muted-foreground">Document impulses instead of following them</p>
                          </div>
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
                {/* Integration with Other Elements */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Waves className="w-6 h-6" />
                      Synergistic Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      The Open Mind doesn't exist in isolation—it creates synergistic effects with 
                      other framework elements, amplifying their power and your overall flow capacity.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-self-coral rounded-full" />
                          Within SELF
                        </h4>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>• <strong>With Tuned Emotions:</strong> Mental clarity reduces emotional reactivity, 
                          while emotional awareness opens new perspectives</p>
                          <p>• <strong>With Focused Body:</strong> Physical grounding creates stable foundation 
                          for mental flexibility and cognitive exploration</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-space-sage rounded-full" />
                          With SPACE
                        </h4>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>• <strong>Intentional Space:</strong> Clear environments support clear thinking 
                          and reduce cognitive load</p>
                          <p>• <strong>Optimized Tools:</strong> Right systems eliminate friction for 
                          creative and flexible thinking</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-story-steel rounded-full" />
                          With STORY
                        </h4>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>• <strong>Generative Story:</strong> Growth mindset enables reframing 
                          challenges as opportunities within your narrative</p>
                          <p>• <strong>Worthy Mission:</strong> Open mind allows flexible approaches 
                          to achieving meaningful goals</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-spirit-amethyst rounded-full" />
                          With SPIRIT
                        </h4>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>• <strong>Grounding Values:</strong> Cognitive flexibility balanced by 
                          stable core principles</p>
                          <p>• <strong>Ignited Curiosity:</strong> Open mind feeds and is fed by 
                          wonder and exploration</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Path Forward */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <TrendingUp className="w-6 h-6" />
                      Your Mental Clarity Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Clear, open mind is the foundation for flow. When you declutter your thoughts 
                      and adopt a growth mindset, you create dynamic mental space where insights 
                      flourish and creativity thrives.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Start Today</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">10-minute daily brain dump practice</p>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">Challenge one assumption this week</p>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">Approach familiar task with beginner's mind</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Build Momentum</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">Implement one dopamine detox pillar</p>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">Practice unitasking for one week</p>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">Identify and eliminate one non-synergistic pursuit</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework/self/focused-body">
                        <Button className="bg-self-coral hover:bg-self-coral/80">
                          Next: Focused Body →
                        </Button>
                      </Link>
                      <Link to="/framework/self/tuned-emotions">
                        <Button variant="outline" className="border-self-coral/30 text-self-coral hover:bg-self-coral hover:text-white">
                          ← Previous: Tuned Emotions
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

export default OpenMind;