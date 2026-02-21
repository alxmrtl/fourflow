import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-elevation" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-spirit-amethyst/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-self-coral/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Logo */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <img 
                src="/LOGOS/FOURFLOW - MAIN LOGO.png" 
                alt="FourFlow Framework" 
                className="h-32 w-auto animate-float"
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="animate-flow-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Awaken Millions
              <br />
              <span className="text-flow">Through Flow</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform from overwhelm and disconnection to clarity, engagement, and meaningful success through the 
              <span className="text-harmony font-semibold"> FourFlow Framework</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="btn-flow text-lg px-8 py-4">
                Discover Your Flow
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="btn-subtle text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                Watch Introduction
              </Button>
            </div>

            {/* Framework Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-card border border-self-coral/30 rounded-xl p-4 card-self">
                <img 
                  src="/LOGOS/SELF - Section Logo.png" 
                  alt="SELF" 
                  className="w-8 h-8 mb-2 mx-auto object-contain"
                />
                <p className="text-sm font-medium text-self-coral">SELF</p>
                <p className="text-xs text-muted-foreground">Frequencies</p>
              </div>
              
              <div className="bg-card border border-space-sage/30 rounded-xl p-4 card-space">
                <img 
                  src="/LOGOS/SPACE - Section Logo.png" 
                  alt="SPACE" 
                  className="w-8 h-8 mb-2 mx-auto object-contain"
                />
                <p className="text-sm font-medium text-space-sage">SPACE</p>
                <p className="text-xs text-muted-foreground">Square</p>
              </div>
              
              <div className="bg-card border border-story-steel/30 rounded-xl p-4 card-story">
                <img 
                  src="/LOGOS/STORY - Section Logo.png" 
                  alt="STORY" 
                  className="w-8 h-8 mb-2 mx-auto object-contain"
                />
                <p className="text-sm font-medium text-story-steel">STORY</p>
                <p className="text-xs text-muted-foreground">Cross</p>
              </div>
              
              <div className="bg-card border border-spirit-amethyst/30 rounded-xl p-4 card-spirit">
                <img 
                  src="/LOGOS/SPIRIT - Section Logo.png" 
                  alt="SPIRIT" 
                  className="w-8 h-8 mb-2 mx-auto object-contain"
                />
                <p className="text-sm font-medium text-spirit-amethyst">SPIRIT</p>
                <p className="text-xs text-muted-foreground">Circle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;