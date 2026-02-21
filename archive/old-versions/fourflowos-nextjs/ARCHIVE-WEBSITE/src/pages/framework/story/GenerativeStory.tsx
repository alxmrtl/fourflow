import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  ArrowLeft, 
  Plus, 
  RefreshCw, 
  TrendingUp, 
  Lightbulb, 
  Target,
  Compass,
  Zap,
  CheckCircle,
  Eye,
  Brain,
  ArrowUp
} from 'lucide-react';
import { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

const GenerativeStory = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const coreElements = [
    {
      title: "Reframing Mastery",
      description: "Transform obstacles into opportunities",
      icon: RefreshCw,
      progress: 76
    },
    {
      title: "Narrative Construction", 
      description: "Craft compelling personal stories",
      icon: BookOpen,
      progress: 68
    },
    {
      title: "Future Authoring",
      description: "Write empowering future scenarios",
      icon: Target,
      progress: 82
    }
  ];

  const storyTypes = [
    { 
      type: "Origin Story", 
      description: "How you became who you are today", 
      examples: "Formative experiences, key turning points, character development",
      purpose: "Establishes identity and core values"
    },
    { 
      type: "Challenge Story", 
      description: "How you overcome difficulties and setbacks", 
      examples: "Resilience narratives, problem-solving approaches, growth through adversity",
      purpose: "Builds confidence and resourcefulness"
    },
    { 
      type: "Vision Story", 
      description: "The future you're working to create", 
      examples: "Aspirational scenarios, impact narratives, legacy descriptions",
      purpose: "Motivates sustained action and effort"
    },
    { 
      type: "Connection Story", 
      description: "How your work serves others and creates value", 
      examples: "Impact stories, transformation narratives, contribution descriptions",
      purpose: "Provides meaning beyond personal achievement"
    }
  ];

  const framingTechniques = [
    {
      title: "The Hero's Journey Framework",
      description: "Cast yourself as the protagonist overcoming challenges",
      example: "Every setback is preparation for the next level of contribution",
      icon: Compass
    },
    {
      title: "Growth Story Reframe",
      description: "Transform failures into learning and development opportunities",
      example: "This challenge is developing skills I'll need for future success",
      icon: TrendingUp
    },
    {
      title: "Service Story Amplification",
      description: "Connect personal struggles to how you can help others",
      example: "My difficulties give me unique insight to guide others through similar challenges",
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
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-story-steel/80 mb-2">STORY</p>
                <h1 className="text-5xl font-bold text-story-steel">Generative Story</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Compelling narratives that drive action by transforming challenges into growth opportunities
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
                      <p className="text-xs text-story-steel mt-2">{element.progress}% Developed</p>
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
                      <Brain className="w-6 h-6" />
                      The Power of Narrative
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Stories are not just entertainment—they're the fundamental way humans 
                        make meaning from experience. A generative story transforms raw events 
                        into purposeful action by providing context, meaning, and direction.
                      </p>
                      
                      <div className="bg-gradient-flow rounded-lg p-4 text-white">
                        <h4 className="font-bold mb-2">The Narrative Advantage</h4>
                        <p className="text-sm text-white/90">
                          Research shows that people who construct meaningful narratives about 
                          their lives demonstrate greater resilience, motivation, and life satisfaction. 
                          Your story becomes a self-fulfilling prophecy.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-story-steel mb-2">40%</div>
                        <p className="text-sm text-muted-foreground">Increase in goal achievement with narrative intervention</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <Lightbulb className="w-6 h-6" />
                      Story Frameworks for Flow
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Different narrative frameworks serve different purposes in maintaining 
                        motivation and flow. The most effective personal stories combine multiple 
                        frameworks to create comprehensive meaning-making systems.
                      </p>
                      
                      <div className="space-y-3">
                        {storyTypes.map((story, index) => (
                          <div key={index} className="p-3 rounded-lg bg-white/50">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-semibold text-story-steel text-sm">{story.type}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{story.description}</p>
                            <p className="text-xs text-foreground font-medium mb-1">{story.examples}</p>
                            <p className="text-xs text-story-steel italic">{story.purpose}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reframing Mastery */}
              <Card className="card-story border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-story-steel">
                    <RefreshCw className="w-6 h-6" />
                    The Art of Generative Reframing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Generative reframing goes beyond positive thinking—it's about finding the 
                    specific ways that challenges serve your larger story and contribute to your growth.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {framingTechniques.map((technique, index) => {
                      const IconComponent = technique.icon;
                      return (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center gap-3 text-story-steel font-semibold">
                            <IconComponent className="w-5 h-5" />
                            {technique.title}
                          </div>
                          <p className="text-sm text-muted-foreground">{technique.description}</p>
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-foreground">Reframe:</p>
                            <p className="text-xs text-muted-foreground italic">"{technique.example}"</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-harmony rounded-lg text-white">
                    <h4 className="font-medium text-white mb-2">Generative Questions for Reframing:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div>
                        <p>• How is this challenge preparing me for my next level?</p>
                        <p>• What unique insights am I gaining from this experience?</p>
                        <p>• How will overcoming this help others in similar situations?</p>
                      </div>
                      <div>
                        <p>• What character strengths is this developing in me?</p>
                        <p>• How does this obstacle align with my larger mission?</p>
                        <p>• What story will I tell about this experience in 5 years?</p>
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
                    <Brain className="w-6 h-6" />
                    Narrative Psychology & Flow
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Narrative psychology research reveals that the stories we tell about ourselves 
                    directly influence motivation, resilience, and performance outcomes.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Identity-Based Motivation</h4>
                      <p className="text-sm text-blue-600">
                        Stories shape identity, and identity drives behavior. When your narrative 
                        supports your desired identity, sustainable motivation becomes automatic.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Meaning-Making Theory</h4>
                      <p className="text-sm text-green-600">
                        Viktor Frankl's research shows that meaning-making (not pleasure-seeking) 
                        is the primary human drive and source of sustained motivation.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Neuroscience of Narrative Processing</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <h5 className="font-semibold text-purple-700 mb-2">Default Mode Network</h5>
                        <p className="text-sm text-purple-600">
                          The brain's storytelling network is active during rest, constantly constructing narratives
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <h5 className="font-semibold text-orange-700 mb-2">Mirror Neuron System</h5>
                        <p className="text-sm text-orange-600">
                          Stories activate empathy networks, making them powerful tools for connection and motivation
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
                        <h5 className="font-semibold text-teal-700 mb-2">Prefrontal Integration</h5>
                        <p className="text-sm text-teal-600">
                          Coherent narratives improve executive function and decision-making capacity
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-harmony rounded-lg p-4 text-white">
                    <h4 className="font-medium text-white mb-2">Research Finding:</h4>
                    <p className="text-sm text-white/90">
                      Studies by psychologist Dan McAdams show that people who construct "redemptive narratives" 
                      (stories where negative events lead to positive outcomes) demonstrate higher levels of 
                      well-being, generativity, and life satisfaction.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Practice */}
            <TabsContent value="practice" className="mt-8">
              <div className="space-y-8">
                {/* Story Construction Exercise */}
                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <CheckCircle className="w-6 h-6" />
                      Personal Narrative Construction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Build a comprehensive personal narrative that supports sustained motivation 
                      and resilience through systematic story development.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Story Development Process:</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-foreground">Identify Pivotal Moments</p>
                              <p className="text-sm text-muted-foreground">Key experiences that shaped who you are</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-foreground">Extract Core Themes</p>
                              <p className="text-sm text-muted-foreground">Recurring patterns and values across experiences</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-foreground">Connect to Future Vision</p>
                              <p className="text-sm text-muted-foreground">How your past prepares you for your mission</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-foreground">Craft Empowering Interpretations</p>
                              <p className="text-sm text-muted-foreground">Reframe challenges as character development</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Story Types to Develop:</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">2-Minute Origin Story</p>
                            <p className="text-xs text-muted-foreground">Who you are and how you got here</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Challenge Overcome Narrative</p>
                            <p className="text-xs text-muted-foreground">How you transform obstacles into opportunities</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Future Impact Vision</p>
                            <p className="text-xs text-muted-foreground">The change you're working to create</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Service Connection Story</p>
                            <p className="text-xs text-muted-foreground">How your work benefits others</p>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-flow rounded-lg text-white">
                          <p className="text-sm text-white/90 font-medium mb-2">Story Testing:</p>
                          <p className="text-xs text-white/80">
                            A powerful story should energize you when you tell it and inspire 
                            action in others who hear it. Practice your stories and refine based on impact.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Reframing Practice */}
                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <Zap className="w-6 h-6" />
                      Daily Reframing Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Develop the skill of generative reframing through systematic daily practice 
                      that transforms challenges into growth opportunities in real-time.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Morning Story Setting</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Review your primary narratives</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Connect daily goals to larger story</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Anticipate challenges as plot points</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Real-Time Reframing</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Ask: "How does this serve my story?"</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Find the growth opportunity</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Connect to helping others</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Evening Integration</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Review the day's narrative</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Identify character development</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Plan tomorrow's story arc</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gradient-harmony rounded-lg text-white">
                      <h4 className="font-medium text-white mb-2">Reframing Formula:</h4>
                      <p className="text-sm text-white/90">
                        Challenge → Character Development → Capability → Contribution. 
                        Every obstacle becomes preparation for greater service to others.
                      </p>
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
                      Generative stories amplify every other flow trigger by providing meaning, 
                      context, and motivation that sustain effort through challenges and setbacks.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-story-steel rounded-full" />
                          With Other STORY Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Stories that support and amplify worthy missions</li>
                          <li>• Narratives that reinforce empowered role identity</li>
                          <li>• Framework for connecting all story elements coherently</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-self-coral rounded-full" />
                          With SELF Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Stories that reframe emotional challenges as growth</li>
                          <li>• Narratives that support cognitive flexibility and learning</li>
                          <li>• Framework for integrating mind-body wisdom</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-space-sage rounded-full" />
                          With SPACE Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Stories about how environment shapes growth</li>
                          <li>• Narratives that give meaning to tool mastery</li>
                          <li>• Framework for interpreting feedback as story development</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-spirit-amethyst rounded-full" />
                          With SPIRIT Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Stories that embody and express core values</li>
                          <li>• Narratives that bring vision to life through action</li>
                          <li>• Framework for curiosity-driven exploration and learning</li>
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
                      Your generative story is a living document that evolves as you grow. 
                      The key is consistent practice in finding empowering interpretations 
                      that connect your experiences to your larger purpose.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-story-steel" />
                        <p className="text-sm text-foreground">Craft your 2-minute origin story this week</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-story-steel" />
                        <p className="text-sm text-foreground">Practice daily reframing with current challenges</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-story-steel" />
                        <p className="text-sm text-foreground">Connect your story to how you serve others</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework/story/worthy-mission">
                        <Button className="bg-story-steel hover:bg-story-steel/80">
                          Next: Worthy Mission →
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

export default GenerativeStory;