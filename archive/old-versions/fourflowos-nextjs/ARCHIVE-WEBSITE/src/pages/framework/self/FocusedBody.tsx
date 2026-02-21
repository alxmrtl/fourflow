import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Zap, 
  ArrowLeft, 
  Waves, 
  Heart, 
  Eye, 
  Ear, 
  Wind,
  TrendingUp,
  Brain,
  CheckCircle,
  Target,
  Compass,
  Activity,
  Sparkles,
  Focus,
  Mountain,
  BookOpen,
  Lightbulb
} from 'lucide-react';
import SidebarLayout from '@/components/SidebarLayout';

const FocusedBody = () => {
  const coreElements = [
    {
      title: "Sensory Engagement",
      description: "Full activation of all five senses for present-moment awareness",
      icon: Eye,
      progress: 82
    },
    {
      title: "Task-Positive Network",
      description: "Neural activation for direct task engagement",
      icon: Brain,
      progress: 75
    },
    {
      title: "Embodied Presence",
      description: "Deep physical grounding and awareness",
      icon: Activity,
      progress: 79
    }
  ];

  const sensoryPractices = [
    {
      sense: "Touch/Feel",
      description: "Breath sensations and physical grounding",
      practice: "Feel breath moving in and out, notice body connection with ground",
      icon: Heart,
      color: "bg-red-500"
    },
    {
      sense: "Sound",
      description: "Ambient awareness without judgment",
      practice: "Let sounds pass through awareness without analyzing",
      icon: Ear,
      color: "bg-blue-500"
    },
    {
      sense: "Smell/Taste",
      description: "Subtle air quality and flavor detection",
      practice: "Notice smell and taste of air, no matter how subtle",
      icon: Wind,
      color: "bg-green-500"
    },
    {
      sense: "Sight",
      description: "Visual focus with detailed absorption",
      practice: "Rest eyes on single point, absorb tiny details",
      icon: Eye,
      color: "bg-purple-500"
    }
  ];

  const gritTraining = [
    {
      title: "Physical Grit",
      description: "Building perseverance through body-based challenges",
      techniques: ["Push aerobic limits by small increments", "Add one rep to strength training", "Extend endurance sessions gradually"],
      icon: Mountain
    },
    {
      title: "Mental Grit",
      description: "Extending concentration through deliberate practice",
      techniques: ["Stretch attention span by 5-10 minutes daily", "Complete concentration sessions fully", "Practice under exhaustion"],
      icon: Focus
    },
    {
      title: "Emotional Grit",
      description: "Sitting with discomfort without escape",
      techniques: ["Label sensations, don't judge them", "Welcome uncomfortable feelings", "Witness without trying to change"],
      icon: Sparkles
    }
  ];

  const networkComparison = [
    {
      network: "Default Mode Network (DMN)",
      state: "Mental Chatter",
      characteristics: ["Self-referential thoughts", "Daydreaming and analysis", "Future/past focus", "Internal static and noise"],
      color: "bg-red-50 border-red-200 text-red-700"
    },
    {
      network: "Task-Positive Network (TPN)",
      state: "Embodied Flow",
      characteristics: ["Direct external engagement", "Vivid sensory input", "Present-moment focus", "Effortless attention"],
      color: "bg-green-50 border-green-200 text-green-700"
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
            Flow Trigger
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
                  src="/LOGOS/FOCUSED BODY.png" 
                  alt="Focused Body" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-self-coral/80 mb-2">SELF</p>
                <h1 className="text-5xl font-bold text-self-coral">Focused Body</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Engaging the power of deep embodiment through full sensory awareness, 
              physical presence, and Task-Positive Network activation
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

          {/* Learn/Apply Tabs */}
          <Tabs defaultValue="learn" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14">
              <TabsTrigger value="learn" className="text-lg font-semibold gap-2">
                <BookOpen className="w-5 h-5" />
                LEARN
              </TabsTrigger>
              <TabsTrigger value="apply" className="text-lg font-semibold gap-2">
                <Lightbulb className="w-5 h-5" />
                APPLY
              </TabsTrigger>
            </TabsList>

            {/* LEARN Content */}
            <TabsContent value="learn" className="mt-8">
              <div className="space-y-8">
                {/* Opening Hook */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Waves className="w-6 h-6" />
                      From Fragmented to Embodied
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Have you ever felt your focus slipping even when doing something you care deeply about? 
                      You're present in body but absent in spirit—your attention fragmented across worries, 
                      distractions, and internal noise. This disjointed state makes peak performance nearly impossible.
                    </p>
                    
                    <div className="bg-gradient-flow rounded-lg p-6 text-white mb-6">
                      <h4 className="font-bold mb-3">The Solution: Shift Your Focal Point</h4>
                      <p className="text-white/90 text-sm">
                        Instead of forcing your mind back into focus, shift the focal point of your attention 
                        from the mental realm into your physical senses—moving from fragmented thoughts to 
                        an embodied experience.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                        <h4 className="font-semibold text-red-700 mb-3">Fragmented State</h4>
                        <ul className="text-sm text-red-600 space-y-2">
                          <li>• Thinking about thinking</li>
                          <li>• Mental chatter and distraction</li>
                          <li>• Abstract thought patterns</li>
                          <li>• Hovering outside the moment</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-3">Embodied State</h4>
                        <ul className="text-sm text-green-600 space-y-2">
                          <li>• Direct sensory engagement</li>
                          <li>• Mind-body alignment</li>
                          <li>• Visceral present-moment awareness</li>
                          <li>• Crystal-clear attention</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Neural Network Science */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Brain className="w-6 h-6" />
                      Neural Network Activation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      The power of Focused Body lies in its ability to quiet the Default Mode Network (DMN) 
                      and activate the Task-Positive Network (TPN). This creates a profound shift in brain function.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {networkComparison.map((network, index) => (
                        <div key={index} className={`p-6 rounded-lg border ${network.color}`}>
                          <h4 className="font-bold mb-3">{network.network}</h4>
                          <p className="font-medium mb-3 text-sm">{network.state}</p>
                          <ul className="space-y-2">
                            {network.characteristics.map((char, charIndex) => (
                              <li key={charIndex} className="text-sm flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-current" />
                                {char}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-harmony text-white">
                      <h4 className="font-bold mb-2">Neurochemical Cascade</h4>
                      <p className="text-sm text-white/90">
                        When the TPN is active, dopamine enhances motivation while norepinephrine increases 
                        sensory sensitivity. Together, they create <em>"effortless attention"</em> where actions 
                        feel smooth and deeply attuned to the task.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Life Force & Embodiment */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Sparkles className="w-6 h-6" />
                      Life Force & Embodied Awareness
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      The degree of embodiment is directly proportional to your life force. Self-referential 
                      thinking creates distance between mind and body, felt as tension and fear.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                        <h4 className="font-semibold text-red-700 mb-3">Disembodied State</h4>
                        <ul className="text-sm text-red-600 space-y-2">
                          <li>• Mind projected far from eyes and feet</li>
                          <li>• Constant self-referential thoughts</li>
                          <li>• Gap between body and mind felt as tension</li>
                          <li>• Loss of vital energy and presence</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-3">Embodied State</h4>
                        <ul className="text-sm text-green-600 space-y-2">
                          <li>• Mind as mirror-bright clarity</li>
                          <li>• Felt feelings and beingness</li>
                          <li>• Spacious, vast, boundless awareness</li>
                          <li>• Bliss pouring from the heart</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-gradient-flow text-white">
                      <p className="text-sm text-white/90">
                        <strong>Flow State Insight:</strong> In deep embodiment, there are little to no 
                        self-referential thoughts—only "Holy shit, this is great!" The barrier between 
                        subject and object blurs, and the sense of self can drop away briefly.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* APPLY Content */}
            <TabsContent value="apply" className="mt-8">
              <div className="space-y-8">
                {/* Open Senses Meditation */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Eye className="w-6 h-6" />
                      Open Senses Meditation Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      This foundational practice pulls your mind away from internal distractions toward 
                      the external present, synchronizing your senses and creating embodied focus.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {sensoryPractices.map((practice, index) => {
                        const IconComponent = practice.icon;
                        return (
                          <div key={index} className="p-4 rounded-lg border-2 border-white/50 bg-white/30">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-10 h-10 ${practice.color} rounded-lg flex items-center justify-center`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{practice.sense}</h4>
                                <p className="text-xs text-muted-foreground">{practice.description}</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{practice.practice}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-self-coral/10 border border-self-coral/20">
                      <h4 className="font-semibold text-self-coral mb-2">Complete Sequence (5-10 minutes)</h4>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Ground yourself with breath and physical sensations</li>
                        <li>Notice sounds around you without judgment</li>
                        <li>Turn attention to smell and taste of air</li>
                        <li>Rest eyes on single point, absorbing details</li>
                        <li>Notice mind and thoughts without engagement</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>

                {/* The Six Kinds of Grit */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Mountain className="w-6 h-6" />
                      The Six Kinds of Grit Training
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Grit is what you need when motivation runs out. Building different types of grit 
                      creates resilience and the "Habit of Ferocity"—automatically leaning into challenges.
                    </p>

                    <div className="space-y-6">
                      {gritTraining.map((type, index) => {
                        const IconComponent = type.icon;
                        return (
                          <div key={index} className="p-6 rounded-lg border-2 border-self-coral/20 bg-gradient-to-br from-self-coral/5 to-self-coral/10">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 bg-self-coral rounded-lg flex items-center justify-center">
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-self-coral">{type.title}</h4>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-3">
                              {type.techniques.map((technique, techIndex) => (
                                <div key={techIndex} className="p-3 rounded bg-white/50">
                                  <p className="text-sm text-foreground">{technique}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-gradient-harmony text-white">
                      <h4 className="font-bold mb-2">Flow Redeems Grit</h4>
                      <p className="text-sm text-white/90">
                        The struggle phase is difficult, but once you taste the reward of flow states, 
                        layering grit becomes easier. You build compound interest in your capacity for challenge.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 4% Edge Drills */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <Target className="w-6 h-6" />
                      4% Edge Drills for Physical Alignment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Choose a physical task and increase difficulty by exactly 4%—just enough to push 
                      your limits without overwhelming you. This forces deep engagement and TPN activation.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <h4 className="font-semibold text-blue-700 mb-2">Movement Arts</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          <li>• Yoga pose held 4% longer</li>
                          <li>• Dance sequence 4% faster</li>
                          <li>• Balance challenge +4% difficulty</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-2">Athletic Skills</h4>
                        <ul className="text-sm text-green-600 space-y-1">
                          <li>• Run 4% faster pace</li>
                          <li>• Lift 4% more weight</li>
                          <li>• Add 4% more reps</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <h4 className="font-semibold text-purple-700 mb-2">Coordination</h4>
                        <ul className="text-sm text-purple-600 space-y-1">
                          <li>• Juggling +4% complexity</li>
                          <li>• Musical timing 4% tighter</li>
                          <li>• Hand-eye coordination +4%</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                      <h4 className="font-medium text-yellow-800 mb-2">Focus Points During Practice:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Notice how muscles feel throughout movement</li>
                        <li>• Feel balance shifts and weight distribution</li>
                        <li>• Observe breathing changes and patterns</li>
                        <li>• Sense energy flow through the body</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Steps */}
                <Card className="card-self border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-self-coral">
                      <TrendingUp className="w-6 h-6" />
                      Your Embodiment Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Cultivating a Focused Body is about rewiring how you engage with the present moment. 
                      By training attention to inhabit your body fully, you create the foundation for sustained flow.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Begin Today</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">Practice 5-minute Open Senses Meditation daily</p>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">Choose one physical activity for 4% edge training</p>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">Create one focus work block without distractions</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Deepen Practice</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">Train one type of grit consistently</p>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">Practice sitting with discomfort for 10 minutes</p>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-5 h-5 text-self-coral" />
                            <p className="text-sm">Extend concentration sessions by 5-10 minutes weekly</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework/space">
                        <Button className="bg-space-sage hover:bg-space-sage/80">
                          Next Dimension: SPACE →
                        </Button>
                      </Link>
                      <Link to="/framework/self/open-mind">
                        <Button variant="outline" className="border-self-coral/30 text-self-coral hover:bg-self-coral hover:text-white">
                          ← Previous: Open Mind
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

export default FocusedBody;