import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import SidebarLayout from '@/components/SidebarLayout';

const SelfOverview = () => {
  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-elevation">
        {/* Navigation */}
        <div className="container mx-auto px-6 pt-8">
          <Link to="/framework" className="inline-flex items-center gap-2 text-muted-foreground hover:text-self-coral transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Framework
          </Link>
        </div>

        {/* Header */}
        <div className="container mx-auto px-6 pt-12 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Dimension Summary - Moved to Top */}
            <div className="bg-gradient-to-r from-self-coral/15 to-self-coral/5 rounded-2xl p-8 border border-self-coral/20 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">The SELF Dimension</h2>
              <p className="text-muted-foreground leading-relaxed">
                When your internal world is aligned—emotions as compass, mind as explorer, body as vessel—
                you create the optimal conditions for flow. This dimension focuses on developing deep 
                self-awareness and internal mastery that serves as the foundation for all other dimensions.
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 bg-self-coral rounded-xl flex items-center justify-center">
                <img 
                  src="/LOGOS/SELF - Section Logo.png" 
                  alt="SELF"
                  className="w-full h-full object-contain filter brightness-0 invert p-2"
                />
              </div>
              <div className="text-left">
                <Badge variant="outline" className="mb-2 px-3 py-1 text-self-coral border-self-coral/30">
                  Major Key
                </Badge>
                <div className="w-32 h-12 flex items-center justify-start">
                  <img 
                    src="/LOGOS/SELF - Section Logo.png" 
                    alt="SELF"
                    className="w-auto h-full object-contain"
                  />
                </div>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Master your internal landscape through emotional intelligence, cognitive flexibility, and embodied presence.
            </p>
          </div>
        </div>

        {/* Focus on Dimension Content */}
        <div className="container mx-auto px-6 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-self-coral/5 to-transparent rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-self-coral mb-4">
                Foundation of Peak Performance
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The SELF dimension provides the internal foundation for all flow experiences. 
                Through emotional mastery, mental flexibility, and physical presence, you create 
                the optimal conditions for sustained peak performance across all areas of life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default SelfOverview;