import SidebarLayout from '@/components/SidebarLayout';
import FrameworkNavigation from '@/components/FrameworkNavigation';
import FlowTriggerExplorer from '@/components/FlowTriggerExplorer';
import DimensionalRadar from '@/components/DimensionalRadar';

const FrameworkOverview = () => {
  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-elevation">
        <div className="container mx-auto px-6 py-20 space-y-16">
          <FrameworkNavigation />
          
          {/* New Mobile-First Navigation Components */}
          <div className="space-y-12">
            <section>
              <FlowTriggerExplorer className="max-w-4xl mx-auto" />
            </section>
            
            <section>
              <div className="max-w-2xl mx-auto">
                <DimensionalRadar size="lg" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default FrameworkOverview;