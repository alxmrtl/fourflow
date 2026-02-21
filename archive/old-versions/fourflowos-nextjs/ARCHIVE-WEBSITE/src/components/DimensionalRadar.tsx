import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Radar, Target, Zap, RotateCcw } from 'lucide-react';

interface DimensionScore {
  id: string;
  title: string;
  color: string;
  score: number;
  triggers: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

interface DimensionalRadarProps {
  className?: string;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const DimensionalRadar = ({ className, interactive = true, size = 'md' }: DimensionalRadarProps) => {
  // Sample data - in a real app this would come from user progress
  const [dimensions, setDimensions] = useState<DimensionScore[]>([
    {
      id: 'self',
      title: 'SELF',
      color: 'self-coral',
      score: 75,
      triggers: [
        { id: 'focused-body', title: 'Focused Body', completed: true },
        { id: 'open-mind', title: 'Open Mind', completed: true },
        { id: 'tuned-emotions', title: 'Tuned Emotions', completed: false }
      ]
    },
    {
      id: 'space',
      title: 'SPACE', 
      color: 'space-sage',
      score: 55,
      triggers: [
        { id: 'intentional-space', title: 'Intentional Space', completed: true },
        { id: 'optimized-tools', title: 'Optimized Tools', completed: false },
        { id: 'feedback-systems', title: 'Feedback Systems', completed: false }
      ]
    },
    {
      id: 'story',
      title: 'STORY',
      color: 'story-steel', 
      score: 40,
      triggers: [
        { id: 'generative-story', title: 'Generative Story', completed: false },
        { id: 'worthy-mission', title: 'Worthy Mission', completed: true },
        { id: 'empowered-role', title: 'Empowered Role', completed: false }
      ]
    },
    {
      id: 'spirit',
      title: 'SPIRIT',
      color: 'spirit-amethyst',
      score: 85,
      triggers: [
        { id: 'grounding-values', title: 'Grounding Values', completed: true },
        { id: 'visualized-vision', title: 'Visualized Vision', completed: true },
        { id: 'ignited-curiosity', title: 'Ignited Curiosity', completed: true }
      ]
    }
  ]);

  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);

  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-64 h-64', 
    lg: 'w-80 h-80'
  };

  const generateRadarPath = () => {
    const center = size === 'sm' ? 96 : size === 'md' ? 128 : 160;
    const maxRadius = size === 'sm' ? 80 : size === 'md' ? 100 : 120;
    
    const points = dimensions.map((dimension, index) => {
      const angle = (index * 90 - 90) * (Math.PI / 180); // Start from top, go clockwise
      const radius = (dimension.score / 100) * maxRadius;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      return `${x},${y}`;
    });
    
    return `M${points.join('L')}Z`;
  };

  const generateGuideCircles = () => {
    const center = size === 'sm' ? 96 : size === 'md' ? 128 : 160;
    const maxRadius = size === 'sm' ? 80 : size === 'md' ? 100 : 120;
    const circles = [];
    
    for (let i = 25; i <= 100; i += 25) {
      const radius = (i / 100) * maxRadius;
      circles.push(
        <circle
          key={i}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          opacity="0.3"
        />
      );
    }
    
    return circles;
  };

  const generateDimensionPoints = () => {
    const center = size === 'sm' ? 96 : size === 'md' ? 128 : 160;
    const maxRadius = size === 'sm' ? 80 : size === 'md' ? 100 : 120;
    
    return dimensions.map((dimension, index) => {
      const angle = (index * 90 - 90) * (Math.PI / 180);
      const labelRadius = maxRadius + 20;
      const pointRadius = (dimension.score / 100) * maxRadius;
      
      const labelX = center + Math.cos(angle) * labelRadius;
      const labelY = center + Math.sin(angle) * labelRadius;
      const pointX = center + Math.cos(angle) * pointRadius;
      const pointY = center + Math.sin(angle) * pointRadius;
      
      return (
        <g key={dimension.id}>
          {/* Axis line */}
          <line
            x1={center}
            y1={center}
            x2={center + Math.cos(angle) * maxRadius}
            y2={center + Math.sin(angle) * maxRadius}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.5"
          />
          
          {/* Dimension point */}
          <circle
            cx={pointX}
            cy={pointY}
            r="6"
            fill={`hsl(var(--${dimension.color}))`}
            stroke="white"
            strokeWidth="2"
            className="cursor-pointer transition-all duration-300 hover:r-8"
            onClick={() => interactive && setSelectedDimension(
              selectedDimension === dimension.id ? null : dimension.id
            )}
          />
          
          {/* Label */}
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className={cn(
              "text-xs font-bold fill-current transition-colors duration-300",
              `text-${dimension.color}`,
              selectedDimension === dimension.id && "text-lg"
            )}
          >
            {dimension.title}
          </text>
          
          {/* Score */}
          <text
            x={labelX}
            y={labelY + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs fill-current text-muted-foreground"
          >
            {dimension.score}%
          </text>
        </g>
      );
    });
  };

  const calculateOverallBalance = () => {
    const average = dimensions.reduce((sum, dim) => sum + dim.score, 0) / dimensions.length;
    const variance = dimensions.reduce((sum, dim) => sum + Math.pow(dim.score - average, 2), 0) / dimensions.length;
    const balance = Math.max(0, 100 - Math.sqrt(variance));
    return Math.round(balance);
  };

  const getBalanceMessage = (balance: number) => {
    if (balance >= 90) return "🎯 Exceptional Balance";
    if (balance >= 75) return "⚖️ Well Balanced"; 
    if (balance >= 60) return "📈 Growing Balance";
    if (balance >= 45) return "🎪 Some Imbalance";
    return "🚀 Focus Needed";
  };

  const resetScores = () => {
    setDimensions(dims => dims.map(dim => ({ ...dim, score: 50 })));
    setSelectedDimension(null);
  };

  const overallBalance = calculateOverallBalance();
  const svgSize = size === 'sm' ? 192 : size === 'md' ? 256 : 320;

  return (
    <Card className={cn("dimensional-radar border-2", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-flow">
            <Radar className="w-6 h-6" />
            Dimensional Radar
          </CardTitle>
          {interactive && (
            <Button
              variant="outline" 
              size="sm"
              onClick={resetScores}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="gap-2">
            <Target className="w-3 h-3" />
            Balance: {overallBalance}%
          </Badge>
          <p className="text-sm text-muted-foreground">
            {getBalanceMessage(overallBalance)}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center gap-6">
          {/* Radar Chart */}
          <div className={cn("relative", sizeClasses[size])}>
            <svg 
              width={svgSize} 
              height={svgSize}
              className="absolute inset-0"
            >
              {/* Guide circles */}
              {generateGuideCircles()}
              
              {/* Radar area */}
              <path
                d={generateRadarPath()}
                fill="hsl(var(--primary))"
                fillOpacity="0.1"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="animate-pulse-glow"
              />
              
              {/* Dimension points and labels */}
              {generateDimensionPoints()}
            </svg>
          </div>

          {/* Dimension Details */}
          {selectedDimension && (
            <Card className="w-full border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-4">
                {(() => {
                  const dimension = dimensions.find(d => d.id === selectedDimension)!;
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={cn("font-bold", `text-${dimension.color}`)}>
                          {dimension.title}
                        </h4>
                        <Badge className={cn(`bg-${dimension.color}`)}>
                          {dimension.score}%
                        </Badge>
                      </div>
                      <div className="grid gap-2">
                        {dimension.triggers.map(trigger => (
                          <div 
                            key={trigger.id}
                            className="flex items-center justify-between p-2 rounded bg-background/50"
                          >
                            <span className="text-sm">{trigger.title}</span>
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              trigger.completed 
                                ? `bg-${dimension.color}` 
                                : "bg-muted-foreground/30"
                            )} />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Interactive Sliders (if interactive) */}
          {interactive && !selectedDimension && (
            <div className="w-full space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                Click dimension points to adjust scores
              </p>
              {dimensions.map(dimension => {
                const completedCount = dimension.triggers.filter(t => t.completed).length;
                const calculatedScore = Math.round((completedCount / dimension.triggers.length) * 100);
                
                return (
                  <div key={dimension.id} className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full flex-shrink-0", `bg-${dimension.color}`)} />
                    <span className="text-sm font-medium min-w-[60px]">{dimension.title}</span>
                    <div className="flex-1 bg-muted rounded-full h-2 relative overflow-hidden">
                      <div 
                        className={cn("h-full transition-all duration-500", `bg-${dimension.color}`)}
                        style={{ width: `${dimension.score}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground min-w-[40px] text-right">
                      {dimension.score}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Balance Insights */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-flow" />
              <span className="font-medium text-flow">Flow Potential</span>
            </div>
            <div className="text-2xl font-bold mb-1">
              {Math.round((dimensions.reduce((sum, dim) => sum + dim.score, 0) / 4))}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average across all dimensions
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensionalRadar;