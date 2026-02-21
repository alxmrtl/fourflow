import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Target, 
  ArrowLeft, 
  Plus, 
  Heart, 
  TrendingUp, 
  Users, 
  Compass,
  Flame,
  CheckCircle,
  Eye,
  Scale,
  Globe,
  Lightbulb
} from 'lucide-react';
import { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

const WorthyMission = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const coreElements = [
    {
      title: "Purpose Clarity",
      description: "Clear understanding of your deeper 'why'",
      icon: Compass,
      progress: 78
    },
    {
      title: "Impact Focus", 
      description: "Measurable positive change in the world",
      icon: TrendingUp,
      progress: 72
    },
    {
      title: "Service Integration",
      description: "How your work benefits others beyond yourself",
      icon: Users,
      progress: 85
    }
  ];

  const missionLevels = [
    { 
      level: "Personal Mission", 
      description: "Individual growth and self-actualization", 
      examples: "Developing skills, achieving personal goals, building character",
      sustainability: "Limited - relies on willpower"
    },
    { 
      level: "Relational Mission", 
      description: "Serving family, friends, and immediate community", 
      examples: "Caring for loved ones, contributing to local community, mentoring others",
      sustainability: "Moderate - emotional connection sustains effort"
    },
    { 
      level: "Societal Mission", 
      description: "Creating positive change at scale", 
      examples: "Solving social problems, advancing human knowledge, protecting environment",
      sustainability: "High - transcendent purpose provides inexhaustible motivation"
    },
    { 
      level: "Legacy Mission", 
      description: "Impact that extends beyond your lifetime", 
      examples: "Institutions that outlast you, knowledge that transforms fields, movements that continue",
      sustainability: "Maximum - connects to something eternal"
    }
  ];

  const missionCriteria = [
    {
      title: "Personal Resonance",
      description: "Deeply connected to your values and experiences",
      example: "Draws from your unique background and natural strengths",
      icon: Heart
    },
    {
      title: "Clear Impact Metrics",
      description: "Measurable difference you're working to create",
      example: "Specific people helped, problems solved, or improvements made",
      icon: Scale
    },
    {
      title: "Sustainable Scope",
      description: "Ambitious enough to inspire, achievable enough to maintain progress",
      example: "10-year vision that can be broken into meaningful milestones",
      icon: Globe
    }
  ];

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-elevation">
      {/* Navigation */}
      <div className="container mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/framework/story" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-story-steel transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to STORY
          </Link>
          <Badge variant="outline" className="px-3 py-1 text-story-steel border-story-steel/30">
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
              <div className="w-20 h-20 bg-story-steel rounded-xl flex items-center justify-center animate-float">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-story-steel/80 mb-2">STORY</p>
                <h1 className="text-5xl font-bold text-story-steel">Worthy Mission</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Purpose-driven goals that inspire sustained engagement through service to something greater
            </p>

            {/* Core Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {coreElements.map((element, index) => {
                const IconComponent = element.icon;
                return (
                  <Card 
                    key={index}
                    className="card-story border-2 transition-all duration-300 hover:shadow-flow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-story-steel rounded-lg flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{element.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{element.description}</p>
                      <Progress value={element.progress} className="h-2" />
                      <p className="text-xs text-story-steel mt-2">{element.progress}% Clarified</p>
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
                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <Flame className="w-6 h-6" />
                      The Power of Transcendent Purpose
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A worthy mission provides inexhaustible motivation because it connects 
                        your daily actions to something larger than personal gain. When your work 
                        serves others, you tap into the deepest source of human drive.
                      </p>
                      
                      <div className="bg-gradient-flow rounded-lg p-4 text-white">
                        <h4 className="font-bold mb-2">The Service Multiplier</h4>
                        <p className="text-sm text-white/90">
                          Research shows that prosocial motivation (helping others) not only 
                          increases persistence and performance but also enhances well-being 
                          and life satisfaction. Service literally energizes the server.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-story-steel mb-2">5x</div>
                        <p className="text-sm text-muted-foreground">Increase in motivation when work serves others</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <Eye className="w-6 h-6" />
                      Levels of Mission Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Missions exist at different levels of scope and impact. The higher the level, 
                        the more sustainable the motivation—because the purpose transcends personal concerns.
                      </p>
                      
                      <div className="space-y-3">
                        {missionLevels.map((mission, index) => (
                          <div key={index} className="p-3 rounded-lg bg-white/50">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-semibold text-story-steel text-sm">{mission.level}</p>
                              <span className="text-xs text-story-steel font-medium">{mission.sustainability}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{mission.description}</p>
                            <p className="text-xs text-foreground font-medium">{mission.examples}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mission Design Framework */}
              <Card className="card-story border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-story-steel">
                    <Target className="w-6 h-6" />
                    Worthy Mission Design Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    A truly worthy mission balances personal connection with broader impact. 
                    It should energize you personally while creating measurable value for others.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {missionCriteria.map((criteria, index) => {
                      const IconComponent = criteria.icon;
                      return (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center gap-3 text-story-steel font-semibold">
                            <IconComponent className="w-5 h-5" />
                            {criteria.title}
                          </div>
                          <p className="text-sm text-muted-foreground">{criteria.description}</p>
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-foreground">Example:</p>
                            <p className="text-xs text-muted-foreground">{criteria.example}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-harmony rounded-lg text-white">
                    <h4 className="font-medium text-white mb-2">The Mission Test Questions:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div>
                        <p>• Would I pursue this even if it were difficult?</p>
                        <p>• Does this mission use my unique strengths?</p>
                        <p>• Will this matter in 10 years?</p>
                      </div>
                      <div>
                        <p>• Does this serve people beyond myself?</p>
                        <p>• Can I measure progress meaningfully?</p>
                        <p>• Am I excited to tell others about this?</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* The Science */}
            <TabsContent value="science" className="mt-8">
              <Card className="card-story border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-story-steel">
                    <Lightbulb className="w-6 h-6" />
                    Motivation Science & Purpose
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Decades of motivation research reveal that intrinsic motivation powered by 
                    purpose and service to others creates more sustainable drive than external rewards.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Self-Determination Theory</h4>
                      <p className="text-sm text-blue-600">
                        Autonomy, mastery, and purpose are the three pillars of intrinsic motivation. 
                        Purpose-driven missions satisfy all three simultaneously.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Prosocial Motivation Theory</h4>
                      <p className="text-sm text-green-600">
                        Research by Adam Grant shows that knowing how your work helps others 
                        increases performance, persistence, and job satisfaction significantly.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Neuroscience of Purpose-Driven Action</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <h5 className="font-semibold text-purple-700 mb-2">Reward Processing Centers</h5>
                        <p className="text-sm text-purple-600">
                          Prosocial behavior activates the same neural reward circuits as personal gain
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <h5 className="font-semibold text-orange-700 mb-2">Stress Response Systems</h5>
                        <p className="text-sm text-orange-600">
                          Purpose-driven activities reduce cortisol and increase resilience to stress
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
                        <h5 className="font-semibold text-teal-700 mb-2">Executive Function Networks</h5>
                        <p className="text-sm text-teal-600">
                          Clear purpose enhances focus, decision-making, and cognitive control
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">The Helper's High Phenomenon</h4>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gradient-flow text-white">
                        <h5 className="font-semibold mb-2">Neurochemical Benefits</h5>
                        <p className="text-sm text-white/90">
                          Helping others releases oxytocin (bonding hormone), serotonin (mood regulation), 
                          and dopamine (reward processing)—creating a natural high that reinforces prosocial behavior.
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gradient-harmony text-white">
                        <h5 className="font-semibold mb-2">Longevity Research</h5>
                        <p className="text-sm text-white/90">
                          Studies show that people with strong sense of purpose live longer, have better 
                          cognitive function, and report higher life satisfaction—even controlling for other factors.
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
                {/* Mission Discovery Process */}
                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <CheckCircle className="w-6 h-6" />
                      Mission Discovery & Refinement Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Discover and articulate your worthy mission through systematic exploration 
                      of your values, strengths, and desired impact.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Discovery Process:</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-foreground">Values Identification</p>
                              <p className="text-sm text-muted-foreground">What matters most deeply to you?</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-foreground">Strength Assessment</p>
                              <p className="text-sm text-muted-foreground">What are you uniquely good at?</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-foreground">Problem Identification</p>
                              <p className="text-sm text-muted-foreground">What issues call to your heart?</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-foreground">Impact Visioning</p>
                              <p className="text-sm text-muted-foreground">What change do you want to create?</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Mission Statement Elements:</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Who You Serve</p>
                            <p className="text-xs text-muted-foreground">Specific people or communities you impact</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">How You Serve</p>
                            <p className="text-xs text-muted-foreground">Your unique approach or methodology</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">What Change You Create</p>
                            <p className="text-xs text-muted-foreground">Specific transformation or improvement</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Why It Matters</p>
                            <p className="text-xs text-muted-foreground">Deeper purpose and larger significance</p>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-flow rounded-lg text-white">
                          <p className="text-sm text-white/90 font-medium mb-2">Mission Statement Template:</p>
                          <p className="text-xs text-white/80">
                            "I help [WHO] to [WHAT] through [HOW] because [WHY] this creates [IMPACT]."
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mission Integration Practice */}
                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <Compass className="w-6 h-6" />
                      Daily Mission Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Transform your worthy mission from abstract purpose into daily motivation 
                      through consistent integration practices.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Morning Purpose Connection</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Review your mission statement</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Connect daily goals to larger purpose</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Visualize people you'll serve today</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Task Reframing</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Ask: "How does this serve my mission?"</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Find the service element in routine tasks</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Connect effort to impact</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Impact Reflection</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Track daily mission alignment</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Celebrate progress toward purpose</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Plan tomorrow's service actions</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gradient-harmony rounded-lg text-white">
                      <h4 className="font-medium text-white mb-2">Mission Sustainability Metrics:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                        <div>
                          <p>• Do you feel energized by your work?</p>
                          <p>• Are you naturally sharing your mission with others?</p>
                        </div>
                        <div>
                          <p>• Can you see clear progress toward impact?</p>
                          <p>• Does difficulty strengthen rather than weaken resolve?</p>
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
                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <Plus className="w-6 h-6" />
                      Integration with Other Flow Triggers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      A worthy mission provides the overarching purpose that gives meaning to every 
                      other flow dimension, creating sustainable motivation that transcends personal challenges.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-story-steel rounded-full" />
                          With Other STORY Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Mission provides purpose that drives generative stories</li>
                          <li>• Clear mission defines the empowered role you step into</li>
                          <li>• All story elements align around central mission</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-self-coral rounded-full" />
                          With SELF Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Mission provides context for emotional regulation</li>
                          <li>• Purpose gives direction to cognitive flexibility</li>
                          <li>• Service connects embodied presence to meaningful action</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-space-sage rounded-full" />
                          With SPACE Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Mission guides environmental design priorities</li>
                          <li>• Purpose determines which tools deserve mastery investment</li>
                          <li>• Service provides context for feedback system design</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-spirit-amethyst rounded-full" />
                          With SPIRIT Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Mission expresses and activates core values</li>
                          <li>• Purpose connects daily vision to transcendent meaning</li>
                          <li>• Service channels curiosity toward helpful discovery</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <Target className="w-6 h-6" />
                      Your Path Forward
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Your worthy mission is the North Star that guides all other decisions. 
                      When you're clear on how your work serves something greater, motivation 
                      becomes inexhaustible and obstacles become stepping stones.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-story-steel" />
                        <p className="text-sm text-foreground">Draft your mission statement using the template provided</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-story-steel" />
                        <p className="text-sm text-foreground">Connect your daily work to mission-driven impact</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-story-steel" />
                        <p className="text-sm text-foreground">Share your mission with others for accountability and refinement</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework/story/empowered-role">
                        <Button className="bg-story-steel hover:bg-story-steel/80">
                          Next: Empowered Role →
                        </Button>
                      </Link>
                      <Link to="/framework/story">
                        <Button variant="outline" className="border-story-steel/30 text-story-steel hover:bg-story-steel hover:text-white">
                          Back to STORY Overview
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

export default WorthyMission;