import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  ArrowLeft, 
  Square, 
  Lightbulb, 
  Volume, 
  Thermometer, 
  Eye,
  TreePine,
  Clock,
  Zap,
  CheckCircle,
  Settings,
  Target
} from 'lucide-react';
import { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

const IntentionalSpace = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const coreElements = [
    {
      title: "Physical Environment",
      description: "Optimized lighting, temperature, and ergonomics",
      icon: Home,
      progress: 78
    },
    {
      title: "Digital Environment", 
      description: "Distraction-free digital spaces and workflows",
      icon: Settings,
      progress: 65
    },
    {
      title: "Sensory Design",
      description: "Acoustic, visual, and olfactory optimization",
      icon: Eye,
      progress: 82
    }
  ];

  const environmentalFactors = [
    { factor: "Natural Light", impact: "Regulates circadian rhythms and boosts alertness", optimal: "North-facing windows or 6500K LED lights" },
    { factor: "Temperature", impact: "Affects cognitive performance and comfort", optimal: "68-72°F (20-22°C) for optimal focus" },
    { factor: "Acoustics", impact: "Controls attention and stress levels", optimal: "40-50 dB ambient with brown/white noise options" },
    { factor: "Air Quality", impact: "Influences oxygen flow and mental clarity", optimal: "CO2 below 1000ppm with good ventilation" }
  ];

  const spaceDesignPrinciples = [
    {
      title: "Single-Purpose Zones",
      description: "Dedicate specific areas for specific types of work",
      example: "Deep work desk, creative brainstorming area, rest/recharge space",
      icon: Target
    },
    {
      title: "Proximity Principle",
      description: "Keep frequently used items within arm's reach",
      example: "Essential tools, water, notepad within 2-foot radius of primary workspace",
      icon: Clock
    },
    {
      title: "Visual Clarity",
      description: "Minimize visual distractions and cognitive load",
      example: "Clear desk surface, hidden cables, strategic use of plants or natural elements",
      icon: Eye
    }
  ];

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-elevation">
      {/* Navigation */}
      <div className="container mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/framework/space" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-space-sage transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SPACE
          </Link>
          <Badge variant="outline" className="px-3 py-1 text-space-sage border-space-sage/30">
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
              <div className="w-20 h-20 bg-space-sage rounded-xl flex items-center justify-center animate-float">
                <Home className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-space-sage/80 mb-2">SPACE</p>
                <h1 className="text-5xl font-bold text-space-sage">Intentional Space</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Curated environments that support flow through deliberate design of physical and digital spaces
            </p>

            {/* Core Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {coreElements.map((element, index) => {
                const IconComponent = element.icon;
                return (
                  <Card 
                    key={index}
                    className="card-space border-2 transition-all duration-300 hover:shadow-flow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-space-sage rounded-lg flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{element.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{element.description}</p>
                      <Progress value={element.progress} className="h-2" />
                      <p className="text-xs text-space-sage mt-2">{element.progress}% Optimized</p>
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
                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <Home className="w-6 h-6" />
                      Environment as Extension of Mind
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Your environment is not neutral—it either supports or sabotages your flow states. 
                        Intentional Space means every element in your physical and digital environment 
                        is deliberately chosen to enhance focus, creativity, and performance.
                      </p>
                      
                      <div className="bg-gradient-flow rounded-lg p-4 text-white">
                        <h4 className="font-bold mb-2">The Extended Mind Theory</h4>
                        <p className="text-sm text-white/90">
                          Research shows our cognitive processes extend beyond our brains to include 
                          tools, spaces, and systems we interact with. Your environment literally 
                          becomes part of your thinking apparatus.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-space-sage mb-2">30%</div>
                        <p className="text-sm text-muted-foreground">Average productivity increase from optimized workspace</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <Lightbulb className="w-6 h-6" />
                      Environmental Flow Triggers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Certain environmental conditions consistently trigger flow states by reducing 
                        cognitive load, eliminating distractions, and optimizing physiological factors 
                        that support peak performance.
                      </p>
                      
                      <div className="space-y-3">
                        {environmentalFactors.map((factor, index) => (
                          <div key={index} className="p-3 rounded-lg bg-white/50">
                            <p className="font-semibold text-space-sage text-sm">{factor.factor}</p>
                            <p className="text-xs text-muted-foreground mb-1">{factor.impact}</p>
                            <p className="text-xs text-foreground font-medium">{factor.optimal}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Space Design Philosophy */}
              <Card className="card-space border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-space-sage">
                    <Square className="w-6 h-6" />
                    Design Philosophy: Form Follows Flow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Every element in your space should serve a clear purpose in supporting your flow states. 
                    If something doesn't enhance focus, creativity, or well-being, it creates friction.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {spaceDesignPrinciples.map((principle, index) => {
                      const IconComponent = principle.icon;
                      return (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center gap-3 text-space-sage font-semibold">
                            <IconComponent className="w-5 h-5" />
                            {principle.title}
                          </div>
                          <p className="text-sm text-muted-foreground">{principle.description}</p>
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-foreground">Example:</p>
                            <p className="text-xs text-muted-foreground">{principle.example}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* The Science */}
            <TabsContent value="science" className="mt-8">
              <Card className="card-space border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-space-sage">
                    <Eye className="w-6 h-6" />
                    Environmental Psychology & Flow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Environmental psychology research reveals how physical spaces directly impact 
                    cognitive performance, emotional states, and the likelihood of entering flow.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Attention Restoration Theory</h4>
                      <p className="text-sm text-blue-600">
                        Natural elements (plants, natural light, organic shapes) restore directed attention 
                        capacity, crucial for sustained focus and flow states.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Cognitive Load Theory</h4>
                      <p className="text-sm text-green-600">
                        Visual clutter increases extraneous cognitive load, leaving less mental capacity 
                        for the task at hand and disrupting flow.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Neurological Impact of Environment</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <h5 className="font-semibold text-purple-700 mb-2">Prefrontal Cortex</h5>
                        <p className="text-sm text-purple-600">
                          Organized environments reduce PFC load, freeing capacity for complex thinking
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <h5 className="font-semibold text-orange-700 mb-2">Default Mode Network</h5>
                        <p className="text-sm text-orange-600">
                          Optimized spaces help suppress mind-wandering and maintain task focus
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
                        <h5 className="font-semibold text-teal-700 mb-2">Stress Response System</h5>
                        <p className="text-sm text-teal-600">
                          Calming environments reduce cortisol and activate parasympathetic responses
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-harmony rounded-lg p-4 text-white">
                    <h4 className="font-medium text-white mb-2">Research Finding:</h4>
                    <p className="text-sm text-white/90">
                      Studies show that workers in optimized environments experience 38% less fatigue, 
                      38% greater alertness, and 15% increase in well-being compared to standard office environments.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Practice */}
            <TabsContent value="practice" className="mt-8">
              <div className="space-y-8">
                {/* Environmental Audit */}
                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <CheckCircle className="w-6 h-6" />
                      Space Audit & Optimization Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Systematically evaluate and optimize your environment using this comprehensive framework.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Physical Environment Assessment:</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-foreground">Lighting Evaluation</p>
                              <p className="text-sm text-muted-foreground">Measure lux levels (300-500 for computer work)</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-foreground">Temperature & Air Quality</p>
                              <p className="text-sm text-muted-foreground">Optimize for 68-72°F, monitor CO2 levels</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-foreground">Noise Level Assessment</p>
                              <p className="text-sm text-muted-foreground">Maintain 40-50 dB background noise</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-foreground">Ergonomic Setup</p>
                              <p className="text-sm text-muted-foreground">Eye level screen, neutral wrist position</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Digital Environment Audit:</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Desktop Organization</p>
                            <p className="text-xs text-muted-foreground">Clean desktop, logical folder structure</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Notification Management</p>
                            <p className="text-xs text-muted-foreground">Disable non-essential alerts during focus time</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Browser Optimization</p>
                            <p className="text-xs text-muted-foreground">Ad blockers, focus extensions, bookmark organization</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">App Ecosystem</p>
                            <p className="text-xs text-muted-foreground">Remove distracting apps, optimize workflows</p>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-flow rounded-lg text-white">
                          <p className="text-sm text-white/90 font-medium mb-2">Pro Tip:</p>
                          <p className="text-xs text-white/80">
                            Use the "One-Touch Rule": Every item in your space should be reachable 
                            within one arm movement from your primary work position.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Wins */}
                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <Zap className="w-6 h-6" />
                      Quick Environment Wins (15-Minute Fixes)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Immediate Impact</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Clear desk surface completely</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Add one plant or natural element</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Position screen at eye level</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Digital Quick Fixes</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Close all unnecessary browser tabs</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Turn off notifications for 2 hours</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Create single-purpose desktop</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Sensory Optimization</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Test ambient noise/silence</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Adjust lighting to reduce glare</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Remove visual distractions</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gradient-harmony rounded-lg text-white">
                      <h4 className="font-medium text-white mb-2">Implementation Strategy:</h4>
                      <p className="text-sm text-white/90">
                        Start with three quick wins from different categories. Notice the immediate impact 
                        on your focus and energy levels. This builds motivation for deeper optimizations.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Integration */}
            <TabsContent value="integration" className="mt-8">
              <div className="space-y-8">
                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <Square className="w-6 h-6" />
                      Integration with Other Flow Triggers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Intentional Space amplifies every other flow trigger by creating the optimal conditions 
                      for focus, reducing cognitive load, and eliminating environmental friction.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-space-sage rounded-full" />
                          With Other SPACE Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Optimized tools work better in well-designed spaces</li>
                          <li>• Feedback systems integrate seamlessly with environmental design</li>
                          <li>• Physical and digital spaces create unified workflow</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-self-coral rounded-full" />
                          With SELF Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Optimized spaces support emotional regulation and focus</li>
                          <li>• Environmental cues can trigger desired mental states</li>
                          <li>• Physical space design supports embodied presence</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-story-steel rounded-full" />
                          With STORY Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Spaces can embody and reinforce your mission and values</li>
                          <li>• Environmental design reflects and supports your role identity</li>
                          <li>• Physical space becomes part of your generative story</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-spirit-amethyst rounded-full" />
                          With SPIRIT Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Spaces can visually represent and reinforce core values</li>
                          <li>• Environmental design supports visualization practices</li>
                          <li>• Inspiring spaces fuel curiosity and exploration</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <Target className="w-6 h-6" />
                      Your Path Forward
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Environmental optimization is an ongoing process. Start with quick wins, 
                      then gradually refine your space based on how it impacts your flow states 
                      and productivity.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-space-sage" />
                        <p className="text-sm text-foreground">Complete a comprehensive space audit this week</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-space-sage" />
                        <p className="text-sm text-foreground">Implement three quick environmental wins</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-space-sage" />
                        <p className="text-sm text-foreground">Track focus quality before and after changes</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework/space/optimized-tools">
                        <Button className="bg-space-sage hover:bg-space-sage/80">
                          Next: Optimized Tools →
                        </Button>
                      </Link>
                      <Link to="/framework/space">
                        <Button variant="outline" className="border-space-sage/30 text-space-sage hover:bg-space-sage hover:text-white">
                          Back to SPACE Overview
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

export default IntentionalSpace;