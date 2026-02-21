import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart3, 
  ArrowLeft, 
  Square, 
  Zap, 
  RefreshCw, 
  TrendingUp, 
  Timer,
  Target,
  CheckCircle,
  Gauge,
  Activity,
  Eye,
  RotateCcw
} from 'lucide-react';
import { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

const FeedbackSystems = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const coreElements = [
    {
      title: "Real-Time Feedback",
      description: "Immediate performance indicators and adjustments",
      icon: Activity,
      progress: 75
    },
    {
      title: "Learning Loops", 
      description: "Systems that accelerate skill development",
      icon: RefreshCw,
      progress: 68
    },
    {
      title: "Performance Analytics",
      description: "Data-driven insights for optimization",
      icon: TrendingUp,
      progress: 82
    }
  ];

  const feedbackTypes = [
    { 
      type: "Intrinsic Feedback", 
      description: "Information naturally available from the task itself", 
      examples: "Visual progress, immediate results, natural consequences",
      timeframe: "Instant"
    },
    { 
      type: "Knowledge of Performance", 
      description: "Information about technique and process quality", 
      examples: "Form analysis, methodology assessment, skill execution",
      timeframe: "Immediate"
    },
    { 
      type: "Knowledge of Results", 
      description: "Information about outcomes and goal achievement", 
      examples: "Metrics, scores, completion rates, success indicators",
      timeframe: "Short-term"
    },
    { 
      type: "Adaptive Feedback", 
      description: "Information that adjusts difficulty and challenge", 
      examples: "Dynamic difficulty, personalized recommendations, AI guidance",
      timeframe: "Real-time"
    }
  ];

  const loopTypes = [
    {
      title: "Micro-Loops (Seconds-Minutes)",
      description: "Immediate adjustments based on real-time performance",
      example: "Keystroke efficiency tracking, posture monitoring, focus indicators",
      icon: Timer
    },
    {
      title: "Task-Loops (Minutes-Hours)",
      description: "Optimization within single work sessions or tasks",
      example: "Pomodoro effectiveness, energy level tracking, flow state indicators",
      icon: Target
    },
    {
      title: "Macro-Loops (Days-Weeks)",
      description: "Pattern recognition and strategic adjustments over time",
      example: "Productivity trends, habit formation, goal progression analysis",
      icon: RotateCcw
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
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-space-sage/80 mb-2">SPACE</p>
                <h1 className="text-5xl font-bold text-space-sage">Feedback Systems</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Loops that enable continuous improvement through rapid information cycles and adaptive learning
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
                      <p className="text-xs text-space-sage mt-2">{element.progress}% Implemented</p>
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
                      <RefreshCw className="w-6 h-6" />
                      The Feedback Loop Advantage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Flow states thrive on immediate, clear feedback that allows for rapid 
                        course correction. Optimized feedback systems compress the time between 
                        action and insight, accelerating both learning and performance.
                      </p>
                      
                      <div className="bg-gradient-flow rounded-lg p-4 text-white">
                        <h4 className="font-bold mb-2">The Information Advantage</h4>
                        <p className="text-sm text-white/90">
                          In complex environments, those who get feedback fastest adapt quickest. 
                          Feedback systems create sustainable competitive advantages by accelerating 
                          the rate of learning and optimization.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-space-sage mb-2">2.5x</div>
                        <p className="text-sm text-muted-foreground">Faster skill acquisition with optimized feedback</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <Activity className="w-6 h-6" />
                      Types of Performance Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Different types of feedback serve different purposes in flow optimization. 
                        The best systems combine multiple feedback types for comprehensive insight.
                      </p>
                      
                      <div className="space-y-3">
                        {feedbackTypes.map((feedback, index) => (
                          <div key={index} className="p-3 rounded-lg bg-white/50">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-semibold text-space-sage text-sm">{feedback.type}</p>
                              <span className="text-xs text-space-sage font-medium">{feedback.timeframe}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{feedback.description}</p>
                            <p className="text-xs text-foreground font-medium">{feedback.examples}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Feedback Loop Architecture */}
              <Card className="card-space border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-space-sage">
                    <Square className="w-6 h-6" />
                    Multi-Scale Feedback Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Effective feedback systems operate at multiple time scales, providing different 
                    types of information for different levels of optimization and adjustment.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {loopTypes.map((loop, index) => {
                      const IconComponent = loop.icon;
                      return (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center gap-3 text-space-sage font-semibold">
                            <IconComponent className="w-5 h-5" />
                            {loop.title}
                          </div>
                          <p className="text-sm text-muted-foreground">{loop.description}</p>
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-foreground">Examples:</p>
                            <p className="text-xs text-muted-foreground">{loop.example}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-harmony rounded-lg text-white">
                    <h4 className="font-medium text-white mb-2">Optimal Feedback Design Principles:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div>
                        <p>• Immediate and actionable</p>
                        <p>• Specific and objective</p>
                        <p>• Connected to goals</p>
                      </div>
                      <div>
                        <p>• Non-judgmental and factual</p>
                        <p>• Continuous rather than episodic</p>
                        <p>• Adaptive to performance level</p>
                      </div>
                    </div>
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
                    Learning Science & Feedback Loops
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Decades of learning research reveal that feedback timing, specificity, and 
                    frequency dramatically impact skill acquisition and flow state accessibility.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Motor Learning Theory</h4>
                      <p className="text-sm text-blue-600">
                        Immediate feedback during skill acquisition creates stronger neural pathways 
                        and faster automatization of complex behaviors.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Flow Research</h4>
                      <p className="text-sm text-green-600">
                        Mihaly Csikszentmihalyi identified immediate feedback as one of the core 
                        conditions necessary for entering and maintaining flow states.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Neuroscience of Feedback Processing</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <h5 className="font-semibold text-purple-700 mb-2">Dopamine Pathways</h5>
                        <p className="text-sm text-purple-600">
                          Prediction errors from feedback drive dopamine release, enhancing learning and motivation
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <h5 className="font-semibold text-orange-700 mb-2">Error Detection Networks</h5>
                        <p className="text-sm text-orange-600">
                          Anterior cingulate cortex processes performance feedback for rapid behavioral adjustment
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
                        <h5 className="font-semibold text-teal-700 mb-2">Working Memory Integration</h5>
                        <p className="text-sm text-teal-600">
                          Prefrontal cortex integrates feedback with goals for strategic adaptation
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Temporal Dynamics of Feedback</h4>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gradient-flow text-white">
                        <h5 className="font-semibold mb-2">The 100ms Rule</h5>
                        <p className="text-sm text-white/90">
                          Feedback within 100ms feels immediate and natural. Delays beyond 200ms begin 
                          to break the sense of direct control essential for flow states.
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gradient-harmony text-white">
                        <h5 className="font-semibold mb-2">Learning Curve Optimization</h5>
                        <p className="text-sm text-white/90">
                          Research shows that variable feedback schedules (sometimes immediate, sometimes delayed) 
                          create more robust learning than consistent timing.
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
                {/* Feedback System Design */}
                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <CheckCircle className="w-6 h-6" />
                      Personal Feedback System Design
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Design comprehensive feedback systems that operate at multiple time scales 
                      to optimize performance, learning, and flow state accessibility.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">System Design Process:</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-foreground">Identify Key Metrics</p>
                              <p className="text-sm text-muted-foreground">What indicates progress toward your goals?</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-foreground">Choose Measurement Tools</p>
                              <p className="text-sm text-muted-foreground">Apps, devices, or systems to capture data</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-foreground">Set Feedback Frequency</p>
                              <p className="text-sm text-muted-foreground">How often will you review and act on data?</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-foreground">Define Action Triggers</p>
                              <p className="text-sm text-muted-foreground">What feedback signals require immediate action?</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Common Feedback Categories:</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Energy & Focus</p>
                            <p className="text-xs text-muted-foreground">Attention levels, fatigue, motivation</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Productivity & Output</p>
                            <p className="text-xs text-muted-foreground">Task completion, quality metrics, efficiency</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Learning & Growth</p>
                            <p className="text-xs text-muted-foreground">Skill development, knowledge acquisition</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Habits & Consistency</p>
                            <p className="text-xs text-muted-foreground">Routine adherence, streak tracking</p>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-flow rounded-lg text-white">
                          <p className="text-sm text-white/90 font-medium mb-2">Design Principle:</p>
                          <p className="text-xs text-white/80">
                            Start with one simple feedback loop. Perfect it, then add complexity. 
                            Over-engineered systems often fail due to maintenance overhead.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Implementation Guide */}
                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <Gauge className="w-6 h-6" />
                      Rapid Feedback Implementation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Build feedback systems progressively, starting with the most impactful and 
                      easiest to implement loops.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Week 1: Foundation</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Choose one key metric to track</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Set up simple measurement system</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Establish daily review habit</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Week 2-3: Integration</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Add real-time feedback element</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Connect to action triggers</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Test and refine system</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Week 4+: Expansion</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Add secondary feedback loops</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Implement automation where possible</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Share insights with accountability partners</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gradient-harmony rounded-lg text-white">
                      <h4 className="font-medium text-white mb-2">Success Metrics for Feedback Systems:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                        <div>
                          <p>• Are you making faster adjustments?</p>
                          <p>• Do you notice patterns you missed before?</p>
                        </div>
                        <div>
                          <p>• Are you spending less time in unproductive states?</p>
                          <p>• Has your consistency improved?</p>
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
                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <Square className="w-6 h-6" />
                      Integration with Other Flow Triggers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Feedback systems serve as the nervous system of your flow practice, connecting 
                      and optimizing every other dimension through continuous information flow.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-space-sage rounded-full" />
                          With Other SPACE Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Monitor environmental impact on performance</li>
                          <li>• Track tool effectiveness and optimization opportunities</li>
                          <li>• Measure space-performance correlations</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-self-coral rounded-full" />
                          With SELF Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Track emotional states and patterns</li>
                          <li>• Monitor cognitive load and mental clarity</li>
                          <li>• Measure embodied presence and energy levels</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-story-steel rounded-full" />
                          With STORY Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Track progress toward meaningful missions</li>
                          <li>• Monitor story effectiveness and engagement</li>
                          <li>• Measure role alignment and fulfillment</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-spirit-amethyst rounded-full" />
                          With SPIRIT Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Track values alignment in daily actions</li>
                          <li>• Monitor vision progress and clarity</li>
                          <li>• Measure curiosity engagement and learning</li>
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
                      Feedback systems are most powerful when they become invisible infrastructure 
                      that automatically guides optimization. Start simple, then build complexity 
                      as systems prove their value.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-space-sage" />
                        <p className="text-sm text-foreground">Design one comprehensive feedback loop this week</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-space-sage" />
                        <p className="text-sm text-foreground">Implement real-time feedback for a key activity</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-space-sage" />
                        <p className="text-sm text-foreground">Connect feedback to specific optimization actions</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework/story">
                        <Button className="bg-space-sage hover:bg-space-sage/80">
                          Next: STORY Dimension →
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

export default FeedbackSystems;