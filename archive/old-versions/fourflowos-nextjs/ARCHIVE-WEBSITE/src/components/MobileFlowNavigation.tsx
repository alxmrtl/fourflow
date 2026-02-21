import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  Home, 
  Compass, 
  Zap, 
  Target,
  BookOpen,
  Lightbulb,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import FlowTriggerExplorer from './FlowTriggerExplorer';
import DimensionalRadar from './DimensionalRadar';

const MobileFlowNavigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'explore' | 'radar' | 'quick'>('explore');

  const quickActions = [
    {
      title: 'Framework Overview',
      description: 'Understanding the four dimensions',
      icon: Compass,
      href: '/framework',
      color: 'primary'
    },
    {
      title: 'Start Learning',
      description: 'Begin with core concepts',
      icon: BookOpen, 
      href: '/framework/self/focused-body?tab=learn',
      color: 'self-coral'
    },
    {
      title: 'Practice Now',
      description: 'Jump into application',
      icon: Lightbulb,
      href: '/framework/self/focused-body?tab=apply', 
      color: 'space-sage'
    },
    {
      title: 'Build Flow Stack',
      description: 'Create your unique combination',
      icon: Target,
      href: '/flow-stack-builder',
      color: 'story-steel'
    }
  ];

  const dimensions = [
    { id: 'self', title: 'SELF', color: 'self-coral', count: 3 },
    { id: 'space', title: 'SPACE', color: 'space-sage', count: 3 },
    { id: 'story', title: 'STORY', color: 'story-steel', count: 3 },
    { id: 'spirit', title: 'SPIRIT', color: 'spirit-amethyst', count: 3 }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-flow bg-gradient-flow hover:shadow-glow transition-all duration-300 animate-pulse-glow"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>

        <SheetContent 
          side="bottom" 
          className="h-[90vh] rounded-t-3xl border-0 bg-gradient-elevation"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3 text-flow">
              <Sparkles className="w-6 h-6" />
              Flow Navigator
            </SheetTitle>
          </SheetHeader>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-muted/50 rounded-lg">
            {[
              { id: 'explore', label: 'Explore', icon: Compass },
              { id: 'radar', label: 'Radar', icon: Target },
              { id: 'quick', label: 'Quick', icon: Zap }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id as any)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300",
                    activeView === tab.id
                      ? "bg-background text-flow shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content Views */}
          <div className="flex-1 overflow-y-auto">
            {activeView === 'explore' && (
              <div className="space-y-6">
                <FlowTriggerExplorer />
                
                {/* Dimension Quick Links */}
                <div className="grid grid-cols-2 gap-3">
                  {dimensions.map(dimension => (
                    <Link
                      key={dimension.id}
                      to={`/framework/${dimension.id}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Card className={cn(
                        "border-2 transition-all duration-300 hover:shadow-md",
                        `border-${dimension.color}/30 bg-gradient-to-br from-${dimension.color}/5 to-${dimension.color}/10 hover:border-${dimension.color}/50`
                      )}>
                        <CardContent className="p-4 text-center">
                          <div className={cn("w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center p-2", `bg-${dimension.color}`)}>
                            <img 
                              src={`/LOGOS/${dimension.title} - Section Logo.png`}
                              alt={dimension.title}
                              className="w-full h-full object-contain filter brightness-0 invert"
                            />
                          </div>
                          <h3 className={cn("font-bold text-sm mb-1", `text-${dimension.color}`)}>
                            {dimension.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {dimension.count} flow triggers
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'radar' && (
              <div className="space-y-6">
                <DimensionalRadar interactive size="lg" />
                
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-flow mb-4">Balance Insights</h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        🎯 <strong>Focus Areas:</strong> Identify dimensions that need attention
                      </p>
                      <p>
                        ⚖️ <strong>Balance Score:</strong> Higher balance leads to sustained flow
                      </p>
                      <p>
                        🚀 <strong>Flow Potential:</strong> Your average readiness across all dimensions
                      </p>
                      <p>
                        💡 <strong>Tip:</strong> Click dimension points to see detailed progress
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeView === 'quick' && (
              <div className="space-y-4">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <Link
                      key={action.title}
                      to={action.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Card className={cn(
                        "border-2 transition-all duration-300 hover:shadow-md hover:scale-[1.02]",
                        `border-${action.color}/30 bg-gradient-to-br from-${action.color}/5 to-${action.color}/10 hover:border-${action.color}/50`
                      )}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", `bg-${action.color}`)}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className={cn("font-bold mb-1", `text-${action.color}`)}>
                                {action.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {action.description}
                              </p>
                            </div>
                            <ArrowUpRight className={cn("w-5 h-5 flex-shrink-0", `text-${action.color}`)} />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
                
                {/* Current Page Context */}
                <Card className="border-dashed border-2 border-primary/30">
                  <CardContent className="p-4 text-center">
                    <Home className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Currently viewing: <span className="font-medium text-foreground">{location.pathname}</span>
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileFlowNavigation;