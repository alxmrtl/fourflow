import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  UserCheck, 
  ArrowLeft, 
  Plus, 
  Crown, 
  Zap, 
  Shield, 
  Compass,
  Star,
  CheckCircle,
  Eye,
  Users,
  Award,
  Target
} from 'lucide-react';
import { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';

const EmpoweredRole = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const coreElements = [
    {
      title: "Identity Clarity",
      description: "Clear understanding of who you are and what you bring",
      icon: Crown,
      progress: 85
    },
    {
      title: "Strength Activation", 
      description: "Operating from your zone of natural excellence",
      icon: Zap,
      progress: 78
    },
    {
      title: "Authority Expression",
      description: "Confident contribution based on unique expertise",
      icon: Shield,
      progress: 72
    }
  ];

  const roleTypes = [
    { 
      role: "The Creator", 
      description: "You bring new ideas, products, or solutions into existence", 
      strengths: "Innovation, vision, originality, problem-solving",
      contribution: "New possibilities and breakthrough solutions"
    },
    { 
      role: "The Connector", 
      description: "You build bridges between people, ideas, or opportunities", 
      strengths: "Relationship building, synthesis, communication, network effects",
      contribution: "Collaboration and synergistic outcomes"
    },
    { 
      role: "The Optimizer", 
      description: "You improve systems, processes, and performance", 
      strengths: "Analysis, efficiency, continuous improvement, attention to detail",
      contribution: "Enhanced effectiveness and reduced waste"
    },
    { 
      role: "The Guide", 
      description: "You help others develop skills, insights, and capabilities", 
      strengths: "Teaching, mentoring, empathy, experience-based wisdom",
      contribution: "Accelerated learning and development"
    },
    { 
      role: "The Protector", 
      description: "You ensure safety, quality, and sustainability", 
      strengths: "Risk assessment, standards maintenance, long-term thinking",
      contribution: "Security and sustainable practices"
    },
    { 
      role: "The Catalyst", 
      description: "You initiate change and inspire action in others", 
      strengths: "Leadership, motivation, change management, influence",
      contribution: "Movement and transformation"
    }
  ];

  const empowermentPrinciples = [
    {
      title: "Play to Strengths",
      description: "Focus energy where you naturally excel",
      example: "Spend 80% of time in your zone of genius",
      icon: Star
    },
    {
      title: "Own Your Expertise",
      description: "Claim authority in areas where you have unique knowledge",
      example: "Speak with confidence about your specialized experience",
      icon: Award
    },
    {
      title: "Create Clear Value",
      description: "Make your contributions visible and measurable",
      example: "Articulate the specific problems you solve for others",
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
                <UserCheck className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-story-steel/80 mb-2">STORY</p>
                <h1 className="text-5xl font-bold text-story-steel">Empowered Role</h1>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Clear identity and meaningful contribution through authentic expression of your unique strengths
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
                      <p className="text-xs text-story-steel mt-2">{element.progress}% Activated</p>
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
                      <Crown className="w-6 h-6" />
                      The Authority of Authentic Contribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        An empowered role emerges when your unique strengths meet meaningful 
                        contribution. It's not about power over others, but power through others—
                        the authority that comes from creating genuine value.
                      </p>
                      
                      <div className="bg-gradient-flow rounded-lg p-4 text-white">
                        <h4 className="font-bold mb-2">Natural Authority</h4>
                        <p className="text-sm text-white/90">
                          When you operate from your zone of genius in service of others, 
                          authority becomes natural and effortless. People naturally turn to 
                          those who consistently deliver value from their unique strengths.
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-story-steel mb-2">3x</div>
                        <p className="text-sm text-muted-foreground">Performance increase when operating from strengths</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <Users className="w-6 h-6" />
                      Archetypal Role Patterns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        While each person is unique, empowered roles often follow archetypal patterns 
                        that reflect fundamental ways humans create value for each other.
                      </p>
                      
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {roleTypes.map((role, index) => (
                          <div key={index} className="p-3 rounded-lg bg-white/50">
                            <p className="font-semibold text-story-steel text-sm mb-1">{role.role}</p>
                            <p className="text-xs text-muted-foreground mb-1">{role.description}</p>
                            <p className="text-xs text-foreground font-medium mb-1">Strengths: {role.strengths}</p>
                            <p className="text-xs text-story-steel italic">Value: {role.contribution}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Role Empowerment Framework */}
              <Card className="card-story border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-story-steel">
                    <Shield className="w-6 h-6" />
                    Role Empowerment Principles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    True empowerment comes from the intersection of authentic identity, developed capabilities, 
                    and meaningful contribution. It's earned through consistent value creation.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {empowermentPrinciples.map((principle, index) => {
                      const IconComponent = principle.icon;
                      return (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center gap-3 text-story-steel font-semibold">
                            <IconComponent className="w-5 h-5" />
                            {principle.title}
                          </div>
                          <p className="text-sm text-muted-foreground">{principle.description}</p>
                          <div className="bg-white/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-foreground">Implementation:</p>
                            <p className="text-xs text-muted-foreground">{principle.example}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-harmony rounded-lg text-white">
                    <h4 className="font-medium text-white mb-2">Empowerment Indicators:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div>
                        <p>• Others seek your input in your expertise area</p>
                        <p>• You feel energized by your core responsibilities</p>
                        <p>• Your contributions create visible value</p>
                      </div>
                      <div>
                        <p>• You naturally take initiative in your domain</p>
                        <p>• Challenges become opportunities to demonstrate value</p>
                        <p>• Others describe you by your unique strengths</p>
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
                    <Eye className="w-6 h-6" />
                    Psychology of Role Identity & Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Role identity research reveals that when people have clarity about their 
                    unique contribution and operate from their strengths, performance and satisfaction increase dramatically.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Strengths-Based Psychology</h4>
                      <p className="text-sm text-blue-600">
                        Research by Gallup and others shows people who use their top strengths 
                        daily are 6x more engaged and 3x more likely to report excellent quality of life.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-700 mb-2">Identity-Performance Theory</h4>
                      <p className="text-sm text-green-600">
                        When role identity aligns with personal identity, people experience less 
                        stress, greater authenticity, and sustained high performance.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Neuroscience of Strength Activation</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                        <h5 className="font-semibold text-purple-700 mb-2">Neural Efficiency</h5>
                        <p className="text-sm text-purple-600">
                          Using natural strengths requires less prefrontal cortex activation, preserving mental energy
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                        <h5 className="font-semibold text-orange-700 mb-2">Dopamine Pathways</h5>
                        <p className="text-sm text-orange-600">
                          Success in strength areas triggers more dopamine release than general achievements
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
                        <h5 className="font-semibold text-teal-700 mb-2">Flow State Access</h5>
                        <p className="text-sm text-teal-600">
                          Operating from strengths dramatically increases likelihood of entering flow states
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Social Psychology of Authority</h4>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gradient-flow text-white">
                        <h5 className="font-semibold mb-2">Competence-Based Trust</h5>
                        <p className="text-sm text-white/90">
                          People naturally grant authority to those who consistently demonstrate 
                          competence in valuable domains. Authority emerges from proven value creation.
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gradient-harmony text-white">
                        <h5 className="font-semibold mb-2">Authentic Leadership Research</h5>
                        <p className="text-sm text-white/90">
                          Studies show that leaders who operate from authentic strengths and clear values 
                          inspire greater trust, engagement, and performance in others.
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
                {/* Role Identification Process */}
                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <CheckCircle className="w-6 h-6" />
                      Empowered Role Discovery Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Identify and step into your empowered role through systematic exploration 
                      of your strengths, values, and unique contribution opportunities.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Discovery Framework:</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                            <div>
                              <p className="font-medium text-foreground">Strength Inventory</p>
                              <p className="text-sm text-muted-foreground">What do you do exceptionally well?</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                            <div>
                              <p className="font-medium text-foreground">Energy Assessment</p>
                              <p className="text-sm text-muted-foreground">What activities energize vs. drain you?</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                            <div>
                              <p className="font-medium text-foreground">Value Creation Analysis</p>
                              <p className="text-sm text-muted-foreground">Where do you create the most value for others?</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-story-steel rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                            <div>
                              <p className="font-medium text-foreground">Authority Mapping</p>
                              <p className="text-sm text-muted-foreground">Where do others naturally seek your guidance?</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Role Clarity Questions:</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Core Identity</p>
                            <p className="text-xs text-muted-foreground">"I am someone who..."</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Primary Contribution</p>
                            <p className="text-xs text-muted-foreground">"I help others by..."</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Unique Value</p>
                            <p className="text-xs text-muted-foreground">"What makes me different is..."</p>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-white/50">
                            <p className="font-medium text-foreground text-sm">Natural Authority</p>
                            <p className="text-xs text-muted-foreground">"People come to me for..."</p>
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-flow rounded-lg text-white">
                          <p className="text-sm text-white/90 font-medium mb-2">Role Statement Template:</p>
                          <p className="text-xs text-white/80">
                            "I am [IDENTITY] who [UNIQUE VALUE] to help [WHO] achieve [OUTCOME] 
                            through my expertise in [AUTHORITY DOMAIN]."
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Role Activation Practice */}
                <Card className="card-story border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-story-steel">
                      <Zap className="w-6 h-6" />
                      Daily Role Activation Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Transform role clarity into daily empowered action through consistent 
                      practices that reinforce your identity and amplify your contribution.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Morning Identity Activation</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Review your role statement</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Identify strength-based tasks for today</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Set intention to create specific value</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Authority Expression</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Speak up in your expertise areas</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Offer help in your strength zones</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Take initiative on relevant challenges</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Value Documentation</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Track daily contributions</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Note feedback on your value</p>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="w-4 h-4 text-story-steel" />
                            <p className="text-sm text-foreground">Celebrate role-aligned wins</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gradient-harmony rounded-lg text-white">
                      <h4 className="font-medium text-white mb-2">Empowerment Growth Metrics:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
                        <div>
                          <p>• Frequency of others seeking your expertise</p>
                          <p>• Energy levels during strength-based work</p>
                        </div>
                        <div>
                          <p>• Visibility and recognition of your contributions</p>
                          <p>• Opportunities that align with your role</p>
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
                      An empowered role provides the identity and authority that makes all other flow 
                      triggers more accessible and sustainable through authentic strength-based contribution.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-story-steel rounded-full" />
                          With Other STORY Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Empowered role embodies your generative story in action</li>
                          <li>• Clear role identity supports worthy mission execution</li>
                          <li>• All story elements reinforce authentic role expression</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-self-coral rounded-full" />
                          With SELF Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Role clarity supports emotional regulation and confidence</li>
                          <li>• Strength-based thinking enhances cognitive flexibility</li>
                          <li>• Empowered role connects to embodied presence and authority</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-space-sage rounded-full" />
                          With SPACE Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Role requirements guide environmental design decisions</li>
                          <li>• Empowered roles determine tool mastery priorities</li>
                          <li>• Authority enables effective use of feedback systems</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-spirit-amethyst rounded-full" />
                          With SPIRIT Elements
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Empowered role expresses and activates core values</li>
                          <li>• Role clarity connects to visualized future vision</li>
                          <li>• Authority position enables curiosity-driven exploration</li>
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
                      Your empowered role is not a fixed identity but an evolving expression of 
                      your unique value in the world. As you grow and develop, your role expands 
                      to encompass greater authority and contribution.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-story-steel" />
                        <p className="text-sm text-foreground">Complete the role discovery process and craft your statement</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-story-steel" />
                        <p className="text-sm text-foreground">Begin daily role activation practices in your strength areas</p>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                        <CheckCircle className="w-5 h-5 text-story-steel" />
                        <p className="text-sm text-foreground">Seek opportunities to express your unique authority</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Link to="/framework/spirit">
                        <Button className="bg-story-steel hover:bg-story-steel/80">
                          Next: SPIRIT Dimension →
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

export default EmpoweredRole;