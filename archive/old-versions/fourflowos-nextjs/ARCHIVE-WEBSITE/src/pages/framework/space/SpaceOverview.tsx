import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import SidebarLayout from '@/components/SidebarLayout';

const SpaceOverview = () => {
  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-elevation">
        {/* Navigation */}
        <div className="container mx-auto px-6 pt-8">
          <Link to="/framework" className="inline-flex items-center gap-2 text-muted-foreground hover:text-space-sage transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Framework
          </Link>
        </div>

        {/* Header */}
        <div className="container mx-auto px-6 pt-12 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Dimension Summary - Moved to Top */}
            <div className="bg-gradient-to-r from-space-sage/15 to-space-sage/5 rounded-2xl p-8 border border-space-sage/20 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">The SPACE Dimension</h2>
              <p className="text-muted-foreground leading-relaxed">
                External environments and systems that amplify your capabilities. This dimension focuses on 
                creating intentional spaces, leveraging powerful tools, and implementing feedback systems 
                that support sustained productivity and creative flow.
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 bg-space-sage rounded-xl flex items-center justify-center">
                <img 
                  src="/LOGOS/SPACE - Section Logo.png" 
                  alt="SPACE"
                  className="w-full h-full object-contain filter brightness-0 invert p-2"
                />
              </div>
              <div className="text-left">
                <Badge variant="outline" className="mb-2 px-3 py-1 text-space-sage border-space-sage/30">
                  Major Key
                </Badge>
                <div className="w-32 h-12 flex items-center justify-start">
                  <img 
                    src="/LOGOS/SPACE - Section Logo.png" 
                    alt="SPACE"
                    className="w-auto h-full object-contain"
                  />
                </div>
              </div>
            </div>
            
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Design environments and systems that amplify your natural capabilities and creative potential.
            </p>
          </div>
        </div>

        {/* Focus on Dimension Content */}
        <div className="container mx-auto px-6 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-space-sage/5 to-transparent rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-space-sage mb-4">
                Environmental Optimization
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The SPACE dimension transforms your external environment into a force multiplier for peak performance. 
                Through intentional design, optimized tools, and feedback systems, you create conditions that 
                naturally support flow states and amplify your creative and productive capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default SpaceOverview;