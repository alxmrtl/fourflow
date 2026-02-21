import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, User } from 'lucide-react';

const BlogPreview = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Flow States: The Science Behind Peak Performance',
      excerpt: 'Dive deep into the neuroscience of flow states and discover how the FourFlow framework aligns with research on optimal human performance.',
      category: 'Flow States',
      categoryColor: 'spirit-amethyst',
      readTime: '8 min read',
      author: 'FourFlow Team',
      date: 'Jan 15, 2024',
      featured: true
    },
    {
      id: 2,
      title: 'Creating Intentional Spaces for Productivity',
      excerpt: 'Learn how to design environments that naturally support flow states and amplify your creative and productive capabilities.',
      category: 'Productivity',
      categoryColor: 'space-sage',
      readTime: '6 min read',
      author: 'Space Design Team',
      date: 'Jan 12, 2024',
      featured: false
    },
    {
      id: 3,
      title: 'The Art of Embodied Leadership',
      excerpt: 'Explore how conscious leadership practices can transform not just your work, but your entire approach to life and impact.',
      category: 'Leadership',
      categoryColor: 'story-steel',
      readTime: '10 min read',
      author: 'Leadership Collective',
      date: 'Jan 10, 2024',
      featured: false
    },
    {
      id: 4,
      title: 'From Overwhelm to Flow: A Personal Transformation Journey',
      excerpt: 'A real-world case study of how one professional used the FourFlow framework to escape burnout and find meaningful success.',
      category: 'Personal Development',
      categoryColor: 'self-coral',
      readTime: '12 min read',
      author: 'Sarah Chen',
      date: 'Jan 8, 2024',
      featured: false
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gradient-elevation">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30">
            Flow Insights
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest from the
            <span className="text-harmony block">Flow Blog</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover insights, tools, and applications of the FourFlow framework. 
            Join our community of flow practitioners on the journey to optimal performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-primary/20 rounded-2xl shadow-elevation hover:shadow-flow transition-all duration-500 overflow-hidden group">
              <div className="bg-gradient-flow p-1 rounded-2xl">
                <div className="bg-card rounded-xl p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={`bg-${blogPosts[0].categoryColor} text-white`}>
                      {blogPosts[0].category}
                    </Badge>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      Featured
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {blogPosts[0].title}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {blogPosts[0].author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blogPosts[0].readTime}
                      </div>
                      <span>{blogPosts[0].date}</span>
                    </div>
                    
                    <Button variant="outline" className="group/btn">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Regular Posts */}
          {blogPosts.slice(1).map((post, index) => (
            <Card 
              key={post.id}
              className="border-2 rounded-2xl shadow-elevation hover:shadow-flow transition-all duration-500 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <Badge className={`bg-${post.categoryColor} text-white w-fit`}>
                  {post.category}
                </Badge>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                    <span>{post.date}</span>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="group/btn">
                    Read
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="btn-subtle">
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;