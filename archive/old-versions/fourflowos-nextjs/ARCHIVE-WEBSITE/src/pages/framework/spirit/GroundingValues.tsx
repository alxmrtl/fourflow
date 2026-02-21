import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Anchor, 
  ArrowLeft, 
  Circle, 
  Compass, 
  Shield, 
  Mountain, 
  Star,
  Heart,
  CheckCircle,
  Eye,
  Scale,
  TreePine,
  Target
} from 'lucide-react';
import { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

const GroundingValues = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const coreElements = [
    {
      title: "Values Identification",
      description: "Clear understanding of what matters most deeply",
      icon: Compass,
      progress: 85
    },
    {
      title: "Principle Integration", 
      description: "Living values through daily decisions and actions",
      icon: Shield,
      progress: 72
    },
    {
      title: "Integrity Alignment",
      description: "Consistency between values and behavior",
      icon: Scale,
      progress: 78
    }
  ];

  const coreValueCategories = [
    { 
      category: "Achievement Values", 
      description: "What you strive to accomplish and create", 
      examples: "Excellence, innovation, mastery, impact, legacy",
      purpose: "Drive performance and growth"
    },
    { 
      category: "Character Values", 
      description: "Who you choose to be regardless of circumstances", 
      examples: "Integrity, courage, compassion, honesty, wisdom",
      purpose: "Guide behavior and decisions"
    },
    { 
      category: "Connection Values", 
      description: "How you relate to others and community", 
      examples: "Love, service, collaboration, mentorship, belonging",
      purpose: "Shape relationships and contribution"
    },
    { 
      category: "Experience Values", 
      description: "What you want to feel and experience in life", 
      examples: "Joy, adventure, peace, growth, freedom",
      purpose: "Inform lifestyle and choices"
    }
  ];

  const valuesApplications = [
    {
      title: "Decision Filter",
      description: "Use values as criteria for major choices",
      example: "Does this opportunity align with my core values?",
      icon: Scale
    },
    {
      title: "Behavior Guide",
      description: "Let values inform daily actions and responses",
      example: "How would someone with my values handle this situation?",
      icon: Compass
    },
    {
      title: "Priority Setting",
      description: "Align time and energy with values-based priorities",
      example: "What activities best express and develop my values?",
      icon: Target
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
                <Anchor className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-spirit-amethyst/80 mb-2">SPIRIT</p>
                <h1 className="text-5xl font-bold text-spirit-amethyst">Grounding Values</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Core principles that guide decisions and provide unwavering stability through all circumstances
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
                      <p className="text-xs text-spirit-amethyst mt-2">{element.progress}% Embodied</p>
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
                      <Mountain className="w-6 h-6" />
                      The Stability of Principled Living
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Grounding values provide the unchanging foundation that allows you to 
                        navigate complexity with clarity. When you know what truly matters, 
                        decisions become simpler and stress decreases because you have a reliable compass.
                      </p>
                      
                      <div className="bg-gradient-flow rounded-lg p-4 text-white">
                        <h4 className="font-bold mb-2">Values as Operating System</h4>
                        <p className="text-sm text-white/90">
                          Just as a computer's operating system provides the fundamental rules 
                          that govern all other programs, your core values provide the fundamental 
                          principles that should govern all your decisions and actions.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-spirit-amethyst mb-2">73%</div>
                        <p className="text-sm text-muted-foreground">Reduction in decision-making stress with clear values</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <Heart className="w-6 h-6" />
                      The Hierarchy of Values
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Values exist in different categories and serve different purposes in your life. 
                        Understanding these categories helps you identify and organize your complete value system.
                      </p>
                      
                      <div className="space-y-3">
                        {coreValueCategories.map((category, index) => (
                          <div key={index} className="p-3 rounded-lg bg-white/50">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-semibold text-spirit-amethyst text-sm">{category.category}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{category.description}</p>
                            <p className="text-xs text-foreground font-medium mb-1">{category.examples}</p>
                            <p className="text-xs text-spirit-amethyst italic">{category.purpose}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Values Integration Framework */}
              <Card className="card-spirit border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                    <TreePine className="w-6 h-6" />
                    Living Values Through Action
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Values only become grounding when they move from abstract concepts to lived principles. 
                    The goal is seamless integration where your values naturally guide behavior.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {valuesApplications.map((application, index) => {
                      const IconComponent = application.icon;
                      return (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center gap-3 text-spirit-amethyst font-semibold">
                            <IconComponent className="w-5 h-5" />
                            {application.title}
                          </div>
                          <p className="text-sm text-muted-foreground">{application.description}</p>
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-foreground">Application:</p>
                            <p className="text-xs text-muted-foreground italic">"{application.example}"</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-harmony rounded-lg text-white">
                    <h4 className="font-medium text-white mb-2">Values Integration Questions:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div>
                        <p>• Does this decision honor my core values?</p>
                        <p>• How can I express my values through this action?</p>
                        <p>• What would someone with my values do here?</p>
                      </div>
                      <div>
                        <p>• Am I being true to what matters most to me?</p>
                        <p>• How does this align with my deepest principles?</p>
                        <p>• What values is this decision strengthening or weakening?</p>
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
                    <Eye className="w-6 h-6" />
                    Psychology of Values & Well-being
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Research in positive psychology and moral psychology reveals that people 
                    who live according to their core values experience greater well-being, 
                    resilience, and life satisfaction.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Self-Determination Theory</h4>
                      <p className="text-sm text-blue-600">
                        Values alignment satisfies the basic psychological need for autonomy, 
                        leading to increased intrinsic motivation and psychological well-being.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Values Affirmation Research</h4>
                      <p className="text-sm text-green-600">
                        Studies show that reflecting on core values reduces stress, improves 
                        problem-solving, and increases resilience to challenges and setbacks.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Neuroscience of Value-Based Decision Making</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <h5 className="font-semibold text-purple-700 mb-2">Prefrontal Cortex Activation</h5>
                        <p className="text-sm text-purple-600">
                          Values-based thinking engages executive function areas, improving decision quality
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <h5 className="font-semibold text-orange-700 mb-2">Stress Response Reduction</h5>
                        <p className="text-sm text-orange-600">
                          Values clarity reduces amygdala activation and cortisol release during challenges
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
                        <h5 className="font-semibold text-teal-700 mb-2">Reward System Alignment</h5>
                        <p className="text-sm text-teal-600">
                          Values-congruent behavior activates intrinsic reward pathways in the brain
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Moral Psychology Findings</h4>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gradient-flow text-white">
                        <h5 className="font-semibold mb-2">Moral Foundations Theory</h5>
                        <p className="text-sm text-white/90">
                          Research by Jonathan Haidt shows that people have innate moral foundations 
                          (care, fairness, loyalty, authority, sanctity) that, when honored, provide 
                          deep satisfaction and sense of rightness.
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gradient-harmony text-white">
                        <h5 className="font-semibold mb-2">Character Strengths Research</h5>
                        <p className="text-sm text-white/90">
                          Studies show that people who identify and use their signature character strengths 
                          (values in action) experience greater happiness, engagement, and meaning in life.
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
                {/* Values Discovery Process */}
                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <CheckCircle className="w-6 h-6" />
                      Values Discovery & Clarification Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Discover and refine your core values through systematic exploration of 
                      what matters most deeply to you across different life contexts.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Discovery Process:</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-foreground">Peak Experience Analysis</p>
                              <p className="text-sm text-muted-foreground">Identify values present in your most fulfilling moments</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-foreground">Values Sorting Exercise</p>
                              <p className="text-sm text-muted-foreground">Rank values by importance across life domains</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-foreground">Integrity Gap Assessment</p>
                              <p className="text-sm text-muted-foreground">Identify misalignments between values and actions</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-spirit-amethyst rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-foreground">Core Values Refinement</p>
                              <p className="text-sm text-muted-foreground">Distill to 3-5 most essential principles</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Values Definition Framework:</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Value Name</p>
                            <p className="text-xs text-muted-foreground">Single word or brief phrase</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Personal Definition</p>
                            <p className="text-xs text-muted-foreground">What this value means to you specifically</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Behavioral Examples</p>
                            <p className="text-xs text-muted-foreground">How this value looks in action</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Why It Matters</p>
                            <p className="text-xs text-muted-foreground">The deeper significance of this value</p>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-flow rounded-lg text-white">
                          <p className="text-sm text-white/90 font-medium mb-2">Values Test:</p>
                          <p className="text-xs text-white/80">
                            If you had to choose between this value and financial gain, 
                            which would you choose? True values win over external rewards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Daily Values Integration */}
                <Card className="card-spirit border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-spirit-amethyst">
                      <Anchor className="w-6 h-6" />
                      Daily Values Integration Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Transform values from concepts into lived principles through consistent 
                      daily practices that strengthen the connection between beliefs and actions.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Morning Values Activation</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Review your core values</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Set values-based intentions for the day</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Identify opportunities to express values</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Decision-Point Practice</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Pause before major decisions</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Ask: "Which option honors my values?"</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Choose the values-aligned path</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Evening Values Review</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Reflect on values expression today</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Notice integrity gaps and wins</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-spirit-amethyst" />
                            <p className="text-sm text-foreground">Plan tomorrow's values opportunities</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gradient-harmony rounded-lg text-white">
                      <h4 className="font-medium text-white mb-2">Values Living Assessment:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                        <div>
                          <p>• Do your daily actions reflect your stated values?</p>
                          <p>• Are you proud of most decisions when viewed through your values?</p>
                        </div>
                        <div>
                          <p>• Do others see your values in your behavior?</p>
                          <p>• Are you growing stronger in your values over time?</p>
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
                      Grounding values provide the moral compass that guides the expression and 
                      application of every other flow dimension, ensuring authenticity and integrity.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-spirit-amethyst rounded-full" />
                          With Other SPIRIT Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Values inform and guide the creation of compelling visions</li>
                          <li>• Principles shape what sparks genuine curiosity</li>
                          <li>• All spirit elements align around core values foundation</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-self-coral rounded-full" />
                          With SELF Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Values provide context for emotional regulation and response</li>
                          <li>• Principles guide the application of cognitive flexibility</li>
                          <li>• Values shape how embodied presence is expressed</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-space-sage rounded-full" />
                          With SPACE Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Values determine what constitutes an intentional space</li>
                          <li>• Principles guide tool selection and usage priorities</li>
                          <li>• Values provide context for interpreting feedback</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-story-steel rounded-full" />
                          With STORY Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Values shape the narrative frameworks we choose</li>
                          <li>• Principles determine which missions feel truly worthy</li>
                          <li>• Values define authentic expression of empowered role</li>
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
                      Grounding values are not fixed forever—they can evolve as you grow. 
                      The key is having clarity about what they are now and living consistently 
                      with them while remaining open to refinement.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-spirit-amethyst" />
                        <p className="text-sm text-foreground">Complete the values discovery process to identify your core 3-5</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-spirit-amethyst" />
                        <p className="text-sm text-foreground">Begin using values as decision-making criteria daily</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-spirit-amethyst" />
                        <p className="text-sm text-foreground">Track alignment between values and actions weekly</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework/spirit/visualized-vision">
                        <Button className="bg-spirit-amethyst hover:bg-spirit-amethyst/80">
                          Next: Visualized Vision →
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

export default GroundingValues;