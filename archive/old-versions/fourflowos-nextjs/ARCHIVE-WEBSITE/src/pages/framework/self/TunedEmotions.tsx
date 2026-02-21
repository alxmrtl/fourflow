import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  ArrowLeft, 
  Waves, 
  BarChart3, 
  Target, 
  Compass, 
  BrainCircuit,
  TrendingUp,
  Zap,
  Eye,
  CheckCircle,
  AlertTriangle,
  Smile
} from 'lucide-react';
import { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

const TunedEmotions = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const coreElements = [
    {
      title: "Challenge-Skills Balance",
      description: "The sweet spot of 4% outside your comfort zone",
      icon: Target,
      progress: 85
    },
    {
      title: "Emotional Awareness",
      description: "Using feelings as navigational tools",
      icon: Compass,
      progress: 72
    },
    {
      title: "Reframing Mastery",
      description: "Transforming anxiety into excitement",
      icon: BrainCircuit,
      progress: 68
    }
  ];

  const emotionalStates = [
    { state: "Anxiety Zone", color: "text-red-500", description: "Challenge too high, skills too low" },
    { state: "Flow Channel", color: "text-self-coral", description: "Perfect balance - 4% stretch" },
    { state: "Boredom Zone", color: "text-gray-500", description: "Skills too high, challenge too low" }
  ];

  const practicalTechniques = [
    {
      title: "The 4% Rule",
      description: "Stretch your current capacity by just 4% - the optimal zone for flow",
      example: "If you write 500 words daily, aim for 520 words",
      icon: TrendingUp
    },
    {
      title: "Anxiety → Excitement Reframe",
      description: "Transform stress signals into performance fuel",
      example: "Say 'I am excited' 3x while feeling increased heart rate",
      icon: Zap
    },
    {
      title: "Emotional Navigation",
      description: "Use boredom and anxiety as adjustment signals",
      example: "Boredom = increase challenge; Anxiety = build skills or reduce complexity",
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
                  src="/LOGOS/TUNED EMOTIONS.png" 
                  alt="Tuned Emotions" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-self-coral/80 mb-2">SELF</p>
                <h1 className="text-5xl font-bold text-self-coral">Tuned Emotions</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Using emotions as a compass for flow navigation through the perfect balance of challenge and skill
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
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <BarChart3 className="w-6 h-6" />
                      The Flow Channel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Flow occurs when your skills and the challenge are in near-perfect alignment. 
                        This relationship is a constant dance of adjustment and recalibration.
                      </p>
                      
                      <div className="space-y-3">
                        {emotionalStates.map((state, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <div className={`w-3 h-3 rounded-full bg-current ${state.color}`} />
                            <div>
                              <p className={`font-semibold ${state.color}`}>{state.state}</p>
                              <p className="text-sm text-muted-foreground">{state.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Target className="w-6 h-6" />
                      The 4% Sweet Spot
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        The golden rule: challenge should be approximately 4% higher than your current abilities. 
                        This tiny stretch keeps you on the edge without overwhelming your capacity.
                      </p>
                      
                      <div className="bg-gradient-flow rounded-lg p-4 text-white">
                        <h4 className="font-bold mb-2">Why 4% Works</h4>
                        <p className="text-sm text-white/90">
                          This precise ratio triggers the optimal neurochemical cocktail: dopamine for pattern recognition, 
                          norepinephrine for arousal, and endorphins for mood elevation - the perfect storm for flow.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-self-coral mb-2">4%</div>
                        <p className="text-sm text-muted-foreground">The scientifically validated sweet spot for peak performance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Emotional Navigation */}
              <Card className="card-self border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-self-coral">
                    <Compass className="w-6 h-6" />
                    Emotional Navigation System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Emotions act as real-time indicators that let you know if you're too far outside your flow channel. 
                    Learn to read these signals and adjust accordingly.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-red-500 font-semibold">
                        <AlertTriangle className="w-5 h-5" />
                        When You're Overwhelmed
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-8">
                        <li>• Break down tasks into smaller chunks</li>
                        <li>• Reduce variables and focus areas</li>
                        <li>• Seek mentorship to accelerate learning</li>
                        <li>• Practice stress-reduction techniques</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-500 font-semibold">
                        <Eye className="w-5 h-5" />
                        When You're Bored
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-8">
                        <li>• Add complexity or new constraints</li>
                        <li>• Gamify the process with deadlines</li>
                        <li>• Change context or environment</li>
                        <li>• Compete against peers or past performance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* The Science */}
            <TabsContent value="science" className="mt-8">
              <Card className="card-self border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-self-coral">
                    <BrainCircuit className="w-6 h-6" />
                    Neurochemistry of Flow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    When your Challenge-Skills ratio is optimal, your brain releases a potent mix of neurotransmitters 
                    that enhance focus, motivation, and suppress fear and self-doubt.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Dopamine</h4>
                      <p className="text-sm text-blue-600">Increases pattern recognition and reward processing</p>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                      <h4 className="font-semibold text-purple-700 mb-2">Norepinephrine</h4>
                      <p className="text-sm text-purple-600">Boosts arousal and focused attention</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Endorphins</h4>
                      <p className="text-sm text-green-600">Elevate mood and reduce perception of effort</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">The Yerkes-Dodson Law</h4>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      This foundational principle explains how moderate stress levels enhance performance, 
                      but excessive stress impairs it. When challenge exceeds skill, cortisol surges, 
                      pushing you into survival mode where the prefrontal cortex goes offline.
                    </p>
                    
                    <div className="bg-gradient-harmony rounded-lg p-4 text-white">
                      <p className="text-sm text-white/90">
                        The key insight: uncertainty triggers dopamine release because "maybe" means survival 
                        could be at stake. As Stanford neurologist Robert Sapolsky says: 
                        "Maybe is addictive like nothing else out there."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Practice */}
            <TabsContent value="practice" className="mt-8">
              <div className="space-y-8">
                {/* Practical Techniques */}
                <div className="grid md:grid-cols-3 gap-6">
                  {practicalTechniques.map((technique, index) => {
                    const IconComponent = technique.icon;
                    return (
                      <Card 
                        key={index}
                        className="card-self border-2 hover:shadow-flow transition-all duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardHeader>
                          <div className="w-12 h-12 bg-self-coral rounded-lg flex items-center justify-center mb-3">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <CardTitle className="text-lg text-self-coral">{technique.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                            {technique.description}
                          </p>
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-foreground">Example:</p>
                            <p className="text-xs text-muted-foreground">{technique.example}</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Reframing Exercise */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Smile className="w-6 h-6" />
                      The Anxiety → Excitement Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Anxiety and excitement trigger identical physiological responses—increased heart rate, 
                      cortisol surges, and norepinephrine spikes. The difference lies in interpretation.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">4-Step Reframing Process:</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-self-coral rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-foreground">Be excited about the problem (3x)</p>
                              <p className="text-sm text-muted-foreground">Say it out loud to shift from threat to challenge</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-self-coral rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-foreground">Do I have enough information?</p>
                              <p className="text-sm text-muted-foreground">Activate cognitive mind, reduce fear</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-self-coral rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-foreground">What's the payoff from excitement?</p>
                              <p className="text-sm text-muted-foreground">Focus on opportunity rather than loss</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-self-coral rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-foreground">I am excited (3x + somatic anchor)</p>
                              <p className="text-sm text-muted-foreground">Create physical anchor with gesture or breath</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Breathing Techniques:</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">7x7 Breathing</p>
                            <p className="text-xs text-muted-foreground">Inhale 7 seconds, exhale 7 seconds. Activates parasympathetic nervous system.</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Box Breathing (5x5x5x5)</p>
                            <p className="text-xs text-muted-foreground">Inhale, hold, exhale, hold - all for 5 seconds each. Builds stress resilience.</p>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-flow rounded-lg text-white">
                          <p className="text-sm text-white/90 font-medium mb-2">Pro Tip:</p>
                          <p className="text-xs text-white/80">
                            "The more fear, the fewer choices." Reframing expands your capacity 
                            for creative problem-solving by transforming fear into curiosity.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Self-Assessment Exercise */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <CheckCircle className="w-6 h-6" />
                      Challenge-Skills Self-Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Take 15 minutes to identify and calibrate your challenge-skills balance for three key tasks.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                        <h4 className="font-semibold text-red-700 mb-3">High-Challenge Areas</h4>
                        <p className="text-sm text-red-600 mb-3">Where you feel consistently overwhelmed:</p>
                        <div className="space-y-2 text-xs text-red-600">
                          <p>• Demanding project</p>
                          <p>• New fitness regime</p>
                          <p>• Leading with limited resources</p>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-3">Flow Channel</h4>
                        <p className="text-sm text-green-600 mb-3">The sweet spot - 4% stretch:</p>
                        <div className="space-y-2 text-xs text-green-600">
                          <p>• Engaged and energized</p>
                          <p>• Time flies by</p>
                          <p>• Effort feels effortless</p>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-3">Low-Challenge Areas</h4>
                        <p className="text-sm text-gray-600 mb-3">Where you feel bored or under-stimulated:</p>
                        <div className="space-y-2 text-xs text-gray-600">
                          <p>• Routine administrative tasks</p>
                          <p>• Repetitive exercises</p>
                          <p>• Unchallenging social activities</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-harmony rounded-lg text-white">
                      <h4 className="font-medium text-white mb-2">Action Step:</h4>
                      <p className="text-sm text-white/90">
                        For each area, write one specific action that will either reduce challenge (if anxious) 
                        or increase it (if bored) to move closer to your optimal 4% stretch zone.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Integration */}
            <TabsContent value="integration" className="mt-8">
              <div className="space-y-8">
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Waves className="w-6 h-6" />
                      Integration with Other Flow Triggers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      The Challenge-Skills Balance doesn't exist in isolation. It weaves through every other flow trigger, 
                      enhancing their effectiveness and creating synergistic effects.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-space-sage rounded-full" />
                          With SPACE Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Environmental optimization supports focus for high-challenge tasks</li>
                          <li>• Feedback systems help maintain optimal challenge levels</li>
                          <li>• Optimized tools reduce cognitive load in complex situations</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-story-steel rounded-full" />
                          With STORY Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Worthy missions provide meaning that sustains through difficulty</li>
                          <li>• Generative stories reframe challenges as growth opportunities</li>
                          <li>• Empowered roles increase intrinsic motivation for tough tasks</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-spirit-amethyst rounded-full" />
                          With SPIRIT Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Grounding values provide stability during challenging periods</li>
                          <li>• Visualized vision pulls you through difficult skill-building phases</li>
                          <li>• Ignited curiosity transforms overwhelming tasks into interesting puzzles</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-self-coral rounded-full" />
                          With Other SELF Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Open Mind enables flexible responses to challenge changes</li>
                          <li>• Focused Body provides the energy foundation for sustained effort</li>
                          <li>• All three create a stable platform for emotional regulation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <TrendingUp className="w-6 h-6" />
                      Your Path Forward
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      The Challenge-Skills Balance is a living, breathing relationship that changes as your abilities grow. 
                      Mastering it means embracing the 4% stretch zone and using emotions as your guidance system.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-self-coral" />
                        <p className="text-sm text-foreground">Practice the daily 4% stretch in one key area</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-self-coral" />
                        <p className="text-sm text-foreground">Use anxiety and boredom as recalibration signals</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-self-coral" />
                        <p className="text-sm text-foreground">Master the anxiety → excitement reframing technique</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework/self/open-mind">
                        <Button className="bg-self-coral hover:bg-self-coral/80">
                          Next: Open Mind →
                        </Button>
                      </Link>
                      <Link to="/framework/self">
                        <Button variant="outline" className="border-self-coral/30 text-self-coral hover:bg-self-coral hover:text-white">
                          Back to SELF Overview
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

export default TunedEmotions;