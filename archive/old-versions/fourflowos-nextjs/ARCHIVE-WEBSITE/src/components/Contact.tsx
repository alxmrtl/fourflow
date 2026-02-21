import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageCircle, Users, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'General Inquiries',
      description: 'Questions about the FourFlow framework',
      contact: 'hello@fourflow.com',
      color: 'spirit-amethyst'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Collaboration and partnership opportunities',
      contact: 'partners@fourflow.com',
      color: 'story-steel'
    },
    {
      icon: Sparkles,
      title: 'Coaching',
      description: 'Personal and organizational flow coaching',
      contact: 'coaching@fourflow.com',
      color: 'self-coral'
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-spirit-amethyst/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-self-coral/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30">
            Connect & Flow
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find
            <span className="text-flow block">Your Flow?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our community of flow practitioners. Whether you're seeking personal transformation 
            or organizational change, we're here to support your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Methods */}
          <div className="space-y-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card 
                  key={index}
                  className="border-2 rounded-2xl shadow-elevation hover:shadow-flow transition-all duration-500 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-${method.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                        <a 
                          href={`mailto:${method.contact}`}
                          className={`text-sm text-${method.color} hover:underline font-medium`}
                        >
                          {method.contact}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 rounded-2xl shadow-elevation">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Mail className="w-6 h-6 text-primary" />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What can we help you with?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="btn-flow w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="border-2 border-primary/20 rounded-2xl shadow-flow bg-gradient-flow">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Join the Flow Community
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Get weekly insights, tools, and inspiration to deepen your flow practice 
                and connect with like-minded individuals on the journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;