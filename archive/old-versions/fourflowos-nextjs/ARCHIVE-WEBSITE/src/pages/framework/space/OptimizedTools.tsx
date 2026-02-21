import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  ArrowLeft, 
  Square, 
  Zap, 
  Layers, 
  Workflow, 
  Cpu,
  Smartphone,
  MonitorSpeaker,
  CheckCircle,
  Target,
  TrendingUp,
  Wrench,
  Gauge
} from 'lucide-react';
import { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

const OptimizedTools = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const coreElements = [
    {
      title: "Tool Mastery",
      description: "Deep competence with essential productivity tools",
      icon: Wrench,
      progress: 85
    },
    {
      title: "System Integration", 
      description: "Seamless workflow between tools and platforms",
      icon: Workflow,
      progress: 72
    },
    {
      title: "Automation Leverage",
      description: "Automated processes that eliminate repetitive tasks",
      icon: Zap,
      progress: 68
    }
  ];

  const toolCategories = [
    { 
      category: "Capture & Processing", 
      purpose: "Externalize thinking and reduce cognitive load", 
      examples: "Note-taking apps, voice recorders, mind mapping tools"
    },
    { 
      category: "Communication & Collaboration", 
      purpose: "Streamline interactions and reduce friction", 
      examples: "Unified messaging, project management, video conferencing"
    },
    { 
      category: "Creation & Production", 
      purpose: "Amplify creative output and accelerate delivery", 
      examples: "Content creation tools, automation software, AI assistants"
    },
    { 
      category: "Analysis & Optimization", 
      purpose: "Data-driven insights for continuous improvement", 
      examples: "Analytics platforms, performance trackers, decision support tools"
    }
  ];

  const leveragePrinciples = [
    {
      title: "10x Tool Rule",
      description: "Choose tools that multiply your output by at least 10x",
      example: "Template systems, automation scripts, AI-powered workflows",
      icon: TrendingUp
    },
    {
      title: "Minimal Tool Stack",
      description: "Use the fewest tools necessary for maximum impact",
      example: "One unified workspace instead of scattered applications",
      icon: Layers
    },
    {
      title: "Compound Leverage",
      description: "Tools that become more valuable as you use them more",
      example: "AI tools that learn your preferences, knowledge bases that grow",
      icon: Gauge
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
                <Settings className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-space-sage/80 mb-2">SPACE</p>
                <h1 className="text-5xl font-bold text-space-sage">Optimized Tools</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Systems and technology that amplify productivity through strategic tool selection and mastery
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
                      <p className="text-xs text-space-sage mt-2">{element.progress}% Mastery</p>
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
                      <Zap className="w-6 h-6" />
                      Tools as Cognitive Extensions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Optimized tools don't just help you work faster—they fundamentally extend 
                        your cognitive capabilities. The right tools become invisible extensions 
                        of your thinking, eliminating friction and amplifying your natural abilities.
                      </p>
                      
                      <div className="bg-gradient-flow rounded-lg p-4 text-white">
                        <h4 className="font-bold mb-2">The Leverage Principle</h4>
                        <p className="text-sm text-white/90">
                          True tool optimization means choosing systems that provide compound returns. 
                          Every hour spent mastering the right tool should return 10+ hours of saved time 
                          and increased capacity.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-space-sage mb-2">10x</div>
                        <p className="text-sm text-muted-foreground">Minimum leverage multiplier for tool selection</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <Cpu className="w-6 h-6" />
                      The Tool Stack Philosophy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Your tool stack should be minimal, integrated, and powerful. Every tool 
                        should serve multiple functions or integrate seamlessly with your core workflow.
                      </p>
                      
                      <div className="space-y-3">
                        {toolCategories.map((category, index) => (
                          <div key={index} className="p-3 rounded-lg bg-white/50">
                            <p className="font-semibold text-space-sage text-sm">{category.category}</p>
                            <p className="text-xs text-muted-foreground mb-1">{category.purpose}</p>
                            <p className="text-xs text-foreground font-medium">{category.examples}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Leverage Principles */}
              <Card className="card-space border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-space-sage">
                    <Square className="w-6 h-6" />
                    Strategic Tool Selection Principles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Not all tools are created equal. Strategic selection means choosing tools that provide 
                    exponential returns on the time invested in learning and using them.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {leveragePrinciples.map((principle, index) => {
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

                  <div className="mt-6 p-4 bg-gradient-harmony rounded-lg text-white">
                    <h4 className="font-medium text-white mb-2">Tool Selection Criteria:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div>
                        <p>• Does it eliminate recurring friction?</p>
                        <p>• Can it automate repetitive tasks?</p>
                        <p>• Does it integrate with existing tools?</p>
                      </div>
                      <div>
                        <p>• Will it scale with increasing demands?</p>
                        <p>• Does it improve with more usage?</p>
                        <p>• Can others easily collaborate with it?</p>
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
                    <Cpu className="w-6 h-6" />
                    Cognitive Science of Tool Use
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Research in cognitive science shows that tools become neural extensions when 
                    mastered, literally expanding our cognitive capabilities and changing how our brains process information.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Extended Mind Theory</h4>
                      <p className="text-sm text-blue-600">
                        Well-integrated tools become part of our cognitive system, extending our mental 
                        capabilities beyond the boundaries of our brains.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Skill Acquisition Research</h4>
                      <p className="text-sm text-green-600">
                        Tool mastery follows predictable stages: conscious incompetence → conscious 
                        competence → unconscious competence → creative mastery.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Neuroplasticity and Tool Integration</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <h5 className="font-semibold text-purple-700 mb-2">Motor Cortex Adaptation</h5>
                        <p className="text-sm text-purple-600">
                          Repeated tool use creates new neural pathways, making complex operations feel natural
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <h5 className="font-semibold text-orange-700 mb-2">Working Memory Enhancement</h5>
                        <p className="text-sm text-orange-600">
                          External tools offload cognitive processing, freeing working memory for creative tasks
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
                        <h5 className="font-semibold text-teal-700 mb-2">Pattern Recognition</h5>
                        <p className="text-sm text-teal-600">
                          Advanced tool use enhances our ability to recognize patterns and opportunities
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-harmony rounded-lg p-4 text-white">
                    <h4 className="font-medium text-white mb-2">Research Insight:</h4>
                    <p className="text-sm text-white/90">
                      Studies show that expert tool users demonstrate increased activity in the brain's 
                      default mode network, suggesting that mastery allows for more creative and 
                      innovative thinking during tool use.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Practice */}
            <TabsContent value="practice" className="mt-8">
              <div className="space-y-8">
                {/* Tool Audit Framework */}
                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <CheckCircle className="w-6 h-6" />
                      Tool Stack Audit & Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Systematically evaluate your current tools and identify opportunities for optimization, 
                      consolidation, and strategic upgrades.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Current Tool Inventory:</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-foreground">List All Tools</p>
                              <p className="text-sm text-muted-foreground">Apps, software, platforms, physical tools</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-foreground">Time Investment Analysis</p>
                              <p className="text-sm text-muted-foreground">Hours per week spent in each tool</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-foreground">Value Assessment</p>
                              <p className="text-sm text-muted-foreground">Rate each tool's impact on productivity</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-space-sage rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-foreground">Integration Mapping</p>
                              <p className="text-sm text-muted-foreground">How tools connect and share data</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Optimization Matrix:</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                            <p className="font-medium text-green-700 text-sm">High Impact, High Use</p>
                            <p className="text-xs text-green-600">Invest in mastery and optimization</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                            <p className="font-medium text-blue-700 text-sm">High Impact, Low Use</p>
                            <p className="text-xs text-blue-600">Increase usage or find alternatives</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                            <p className="font-medium text-yellow-700 text-sm">Low Impact, High Use</p>
                            <p className="text-xs text-yellow-600">Optimize workflow or reduce dependency</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                            <p className="font-medium text-red-700 text-sm">Low Impact, Low Use</p>
                            <p className="text-xs text-red-600">Consider elimination</p>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-flow rounded-lg text-white">
                          <p className="text-sm text-white/90 font-medium mb-2">Optimization Priority:</p>
                          <p className="text-xs text-white/80">
                            Focus first on high-impact, high-use tools. Small improvements here 
                            yield the largest productivity gains.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mastery Development */}
                <Card className="card-space border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-space-sage">
                      <TrendingUp className="w-6 h-6" />
                      Tool Mastery Development Framework
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      True tool optimization comes from deep mastery, not surface-level knowledge. 
                      Develop systematic approaches to learning and leveraging your essential tools.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Phase 1: Foundation</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Learn core features and shortcuts</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Establish basic workflow patterns</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Document best practices</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Phase 2: Integration</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Connect tools and data flows</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Automate repetitive processes</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Create templates and systems</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Phase 3: Mastery</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Develop advanced techniques</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Create custom solutions</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-space-sage" />
                            <p className="text-sm text-foreground">Share knowledge with others</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gradient-harmony rounded-lg text-white">
                      <h4 className="font-medium text-white mb-2">Mastery Metrics:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                        <div>
                          <p>• Can you use the tool without looking?</p>
                          <p>• Do you know multiple ways to accomplish tasks?</p>
                        </div>
                        <div>
                          <p>• Can you teach others effectively?</p>
                          <p>• Do you create novel solutions with the tool?</p>
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
                      Optimized tools multiply the effectiveness of every other flow dimension by eliminating 
                      friction, accelerating feedback loops, and extending cognitive capabilities.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-space-sage rounded-full" />
                          With Other SPACE Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Tools that integrate with intentionally designed physical spaces</li>
                          <li>• Automated feedback systems enhance continuous improvement</li>
                          <li>• Digital tools that complement and extend physical environment</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-self-coral rounded-full" />
                          With SELF Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Tools that support emotional regulation and awareness</li>
                          <li>• Systems that amplify cognitive flexibility and learning</li>
                          <li>• Technology that enhances embodied presence and focus</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-story-steel rounded-full" />
                          With STORY Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Tools that help craft and share compelling narratives</li>
                          <li>• Systems that track progress toward worthy missions</li>
                          <li>• Platforms that enable and amplify your empowered role</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-spirit-amethyst rounded-full" />
                          With SPIRIT Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Tools that reflect and reinforce core values</li>
                          <li>• Systems that support visualization and planning</li>
                          <li>• Platforms that fuel curiosity and exploration</li>
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
                      Tool optimization is an ongoing journey of mastery and refinement. Focus on 
                      depth over breadth, and prioritize tools that provide compound returns on 
                      your investment.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-space-sage" />
                        <p className="text-sm text-foreground">Complete a comprehensive tool stack audit</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-space-sage" />
                        <p className="text-sm text-foreground">Identify one high-impact tool for deep mastery</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-space-sage" />
                        <p className="text-sm text-foreground">Eliminate or consolidate low-value tools</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework/space/feedback-systems">
                        <Button className="bg-space-sage hover:bg-space-sage/80">
                          Next: Feedback Systems →
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

export default OptimizedTools;