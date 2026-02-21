import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const navigation = {
    framework: [
      { name: 'Self - Frequencies', href: '#self' },
      { name: 'Space - Square', href: '#space' },
      { name: 'Story - Cross', href: '#story' },
      { name: 'Spirit - Circle', href: '#spirit' }
    ],
    resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Flow Assessment', href: '#assessment' },
      { name: 'Community', href: '#community' },
      { name: 'Research', href: '#research' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Mission', href: '#mission' },
      { name: 'Coaching', href: '#coaching' },
      { name: 'Contact', href: '#contact' }
    ]
  };

  return (
    <footer className="bg-gradient-elevation border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/LOGOS/FOURFLOW - MAIN LOGO.png" 
                alt="FourFlow" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Awakening millions through flow, guiding individuals to find their unique role 
              in life's greater synchronicity.
            </p>
            <Badge variant="outline" className="border-primary/30 text-primary">
              Transforming Work & Life
            </Badge>
          </div>

          {/* Framework Links */}
          <div>
            <h3 className="font-semibold mb-4 text-spirit-amethyst">Framework</h3>
            <ul className="space-y-2">
              {navigation.framework.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4 text-story-steel">Resources</h3>
            <ul className="space-y-2">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-self-coral">Company</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>© 2024 FourFlow Framework. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="#privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
            "When individuals operate in their optimal flow states across Self, Space, Story, and Spirit, 
            they naturally align with meaningful work and create positive impact in the world."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;